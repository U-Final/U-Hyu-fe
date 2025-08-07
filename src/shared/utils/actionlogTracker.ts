import { userStore } from '@user/store/userStore';

import { client } from '@/shared/client';
import type {
  CounterData,
  UserAction,
} from '@/shared/types/actionlogTracker.types';
import { getCategoryIdFromFilterValue } from '@/shared/utils/categoryMapper';

const MARKER_CLICK_THRESHOLD = 3;
const FILTER_CLICK_THRESHOLD = 5;
const STORAGE_KEY = 'Action_log';
const ENDPOINTS_ACTION_LOG = '/user/action-logs';

class ActionLogCounter {
  private markerClicks: Map<number, number> = new Map();
  private filterClicks: Map<string, number> = new Map();

  constructor() {
    this.loadFromStorage();
    this.setupPageUnloadHandler();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: CounterData = JSON.parse(stored);

        this.markerClicks = new Map(
          Object.entries(data.markerClicks).map(([k, v]) => [parseInt(k), v])
        );
        this.filterClicks = new Map(Object.entries(data.filterClicks || {}));
      }
    } catch {
      // 스토리지 로드 실패 시 무시
    }
  }

  private saveToStorage() {
    try {
      const data: CounterData = {
        markerClicks: Object.fromEntries(this.markerClicks),
        filterClicks: Object.fromEntries(this.filterClicks),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // 스토리지 저장 실패 시 무시
    }
  }

  addMarkerClick(storeId: number) {
    const currentCount = this.markerClicks.get(storeId) || 0;
    const newCount = currentCount + 1;
    this.markerClicks.set(storeId, newCount);

    if (newCount >= MARKER_CLICK_THRESHOLD) {
      this.sendMarkerClickData(storeId);
      this.markerClicks.delete(storeId);
    }

    this.saveToStorage();
  }

  addFilterClick(filterValue: string) {
    const currentCount = this.filterClicks.get(filterValue) || 0;
    const newCount = currentCount + 1;
    this.filterClicks.set(filterValue, newCount);

    if (newCount >= FILTER_CLICK_THRESHOLD) {
      this.sendFilterClickData(filterValue);
      this.filterClicks.delete(filterValue);
    }

    this.saveToStorage();
  }

  private async sendMarkerClickData(storeId: number) {
    const actionData: UserAction = {
      actionType: 'MARKER_CLICK',
      storeId,
      categoryId: null,
    };
    await this.sendSingleActionToServer(actionData);
  }

  private async sendFilterClickData(filterValue: string) {
    const categoryId = getCategoryIdFromFilterValue(filterValue);
    const actionData: UserAction = {
      actionType: 'FILTER_USED',
      storeId: null,
      categoryId,
    };

    await this.sendSingleActionToServer(actionData);
  }

  getCounters() {
    return {
      markerClicks: Object.fromEntries(this.markerClicks),
      filterClicks: Object.fromEntries(this.filterClicks),
    };
  }

  getMarkerClickCount(storeId: number): number {
    return this.markerClicks.get(storeId) || 0;
  }

  getFilterClickCount(filterValue: string): number {
    return this.filterClicks.get(filterValue) || 0;
  }

  private setupPageUnloadHandler() {
    if (typeof window === 'undefined') return;

    window.addEventListener('beforeunload', () => {
      this.saveToStorage();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.saveToStorage();
      }
    });
  }

  private async sendSingleActionToServer(action: UserAction) {
    try {
      await client.post(ENDPOINTS_ACTION_LOG, action);
      this.saveToStorage();
    } catch {
      // 액션 전송 실패 시 무시
    }
  }

  async forceFlush() {
    const promises: Promise<void>[] = [];

    for (const [storeId, count] of this.markerClicks.entries()) {
      if (count > 0) {
        const actionData: UserAction = {
          actionType: 'MARKER_CLICK',
          storeId,
          categoryId: null,
        };
        promises.push(this.sendSingleActionToServer(actionData));
      }
    }

    for (const [filterValue, count] of this.filterClicks.entries()) {
      if (count > 0) {
        const categoryId = getCategoryIdFromFilterValue(filterValue);
        const actionData: UserAction = {
          actionType: 'FILTER_USED',
          storeId: null,
          categoryId,
        };
        promises.push(this.sendSingleActionToServer(actionData));
      }
    }

    if (promises.length > 0) {
      try {
        await Promise.all(promises);
        this.markerClicks.clear();
        this.filterClicks.clear();
        this.saveToStorage();
      } catch {
        // 강제 플러시 실패 시 무시
      }
    }
  }

  reset() {
    this.markerClicks.clear();
    this.filterClicks.clear();
    localStorage.removeItem(STORAGE_KEY);
  }
}

let actionLogCounter: ActionLogCounter | null = null;

const getActionLogCounter = (): ActionLogCounter => {
  if (!actionLogCounter) {
    actionLogCounter = new ActionLogCounter();
  }
  return actionLogCounter;
};

export const trackMarkerClick = (storeId: number) => {
  const isLoggedIn = userStore.getState().user !== null;
  if (!isLoggedIn) return;

  getActionLogCounter().addMarkerClick(storeId);
};

export const trackFilterUsed = (filterValue: string) => {
  const isLoggedIn = userStore.getState().user !== null;
  if (!isLoggedIn) return;

  getActionLogCounter().addFilterClick(filterValue);
};

export const getCounters = () => {
  return getActionLogCounter().getCounters();
};

export const getMarkerClickCount = (storeId: number) => {
  return getActionLogCounter().getMarkerClickCount(storeId);
};

export const getFilterUsageCount = (categoryName: string) => {
  return getActionLogCounter().getFilterClickCount(categoryName);
};

export const forceFlushCounters = () => {
  return getActionLogCounter().forceFlush();
};

export const resetCounters = () => {
  getActionLogCounter().reset();
};
