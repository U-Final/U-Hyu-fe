// utils/gaTracker.ts
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (MEASUREMENT_ID) {
    ReactGA.initialize(MEASUREMENT_ID);
    console.log('[GA] Initialized with ID:', MEASUREMENT_ID);
  } else {
    console.warn('[GA] Measurement ID not found');
  }
};

export const trackPageView = (pageTitle: string, pagePath: string) => {
  if (MEASUREMENT_ID) {
    ReactGA.send({
      hitType: 'pageview',
      page: pagePath,
      title: pageTitle,
    });
    console.log('[GA] Page view tracked:', pagePath);
  }
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (import.meta.env.PROD && MEASUREMENT_ID) {
    ReactGA.event(action, {
      category,
      label,
      value,
    });
  }
};

export const trackCustomEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {}
) => {
  if (import.meta.env.PROD && MEASUREMENT_ID) {
    ReactGA.event(eventName, parameters);
  }
};
