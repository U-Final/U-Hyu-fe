import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (MEASUREMENT_ID) {
    ReactGA.initialize(MEASUREMENT_ID);
  }
};

export const trackPageView = (pageTitle: string, pagePath: string) => {
  if (MEASUREMENT_ID) {
    ReactGA.send({
      hitType: 'pageview',
      page: pagePath,
      title: pageTitle,
    });
  }
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (MEASUREMENT_ID) {
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
  if (MEASUREMENT_ID) {
    ReactGA.event(eventName, parameters);
  }
};
