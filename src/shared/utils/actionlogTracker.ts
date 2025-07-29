import { client } from '@/shared/client';
import type {
  CounterData,
  UserAction,
} from '@/shared/types/actionlogTracker.types';
import { getCategoryIdFromFilterValue } from '@/shared/utils/categoryMapper';

const CLICK_THRESHOLD = 15;
const STORAGE_KEY = 'Action_log';
const ENDPOINTS_ACTION_LOG = '/user/action-logs';

class ActionLogCounter {
  private markerClicks: Map<number, number> = new Map();
  private filterClicks: Map<string, number> = new Map();

  constructor() {
    //클래스가 처음 생성될 때 실행되는 초기화 함수
    this.loadFromStorage(); //로컬 스토리지에 저장된 데이터를 불러옴.
    this.setupPageUnloadHandler(); //페이지를 닫거나 새로고침할 때 데이터를 저장하는 이벤트 등록
  }

  private loadFromStorage() {
    // 로컬 스토리지에서 카운터 데이터 로드
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: CounterData = JSON.parse(stored);

        this.markerClicks = new Map(
          Object.entries(data.markerClicks).map(([k, v]) => [parseInt(k), v])
        );
        this.filterClicks = new Map(Object.entries(data.filterClicks || {}));
      }
    } catch (error) {
      console.error('스토리지 카운터 로드 실패', error);
    }
  }

  private saveToStorage() {
    // 로컬 스토리지에 카운터 데이터 저장
    try {
      const data: CounterData = {
        markerClicks: Object.fromEntries(this.markerClicks),
        filterClicks: Object.fromEntries(this.filterClicks),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('스토리지에 카운터 데이터 저장 실패', error);
    }
  }

  addMarkerClick(storeId: number) {
    //마커 클릭 추가
    const currentCount = this.markerClicks.get(storeId) || 0;
    const newCount = currentCount + 1;
    this.markerClicks.set(storeId, newCount);

    if (newCount >= CLICK_THRESHOLD) {
      // 임계점 도달시
      this.sendMarkerClickData(storeId);
      this.markerClicks.delete(storeId);
    }

    this.saveToStorage();
  }

  addFilterClick(filterValue: string) {
    const currentCount = this.filterClicks.get(filterValue) || 0;
    const newCount = currentCount + 1;
    this.filterClicks.set(filterValue, newCount);

    if (newCount >= CLICK_THRESHOLD) {
      this.sendFilterClickData(filterValue);
      this.filterClicks.delete(filterValue);
    }

    this.saveToStorage();
  }

  // 마커 클릭 데이터 전송
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
    } catch (error) {
      console.error('Failed to send action:', error);
    }
  }

  async forceFlush() {
    const promises: Promise<void>[] = [];

    // 마커 클릭들을 각각 개별 전송
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

    // 필터 클릭들을 각각 개별 전송
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
      } catch (error) {
        console.error('❌ Force flush failed:', error);
      }
    }
  }

  // 카운터 초기화
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
  getActionLogCounter().addMarkerClick(storeId);
};

export const trackFilterUsed = (filterValue: string) => {
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
