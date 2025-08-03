import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { useAuthState } from '@/shared/store/userStore';
import {
  initGA,
  trackCustomEvent,
  trackEvent,
  trackPageView,
} from '@/shared/utils/gaTracker';

export const useGA = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuthState();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    const pageTitle = document.title;
    const pagePath = location.pathname + location.search;
    trackPageView(pageTitle, pagePath);
  }, [location]);

  const trackMapInteraction = (
    action: string,
    storeId?: number,
    category?: string
  ) => {
    trackCustomEvent('map_interaction', {
      action,
      store_id: storeId,
      category,
      user_logged_in: isLoggedIn,
    });
  };

  const trackBenefitInteraction = (
    action: string,
    benefitId?: string,
    brandName?: string
  ) => {
    trackCustomEvent('benefit_interaction', {
      action,
      benefit_id: benefitId,
      brand_name: brandName,
      user_logged_in: isLoggedIn,
    });
  };

  const trackBarcodeInteraction = (action: string, storeId?: number) => {
    trackCustomEvent('barcode_interaction', {
      action,
      store_id: storeId,
      user_logged_in: isLoggedIn,
    });
  };

  const trackMyMapInteraction = (action: string, mapId?: string) => {
    trackCustomEvent('mymap_interaction', {
      action,
      map_id: mapId,
      user_logged_in: isLoggedIn,
    });
  };

  const trackSearchInteraction = (
    action: string,
    query?: string,
    category?: string
  ) => {
    trackCustomEvent('search_interaction', {
      action,
      query,
      category,
      user_logged_in: isLoggedIn,
    });
  };

  const trackAuthInteraction = (action: string) => {
    trackCustomEvent('auth_interaction', {
      action,
      user_logged_in: isLoggedIn,
    });
  };

  const trackNavigationInteraction = (
    action: string,
    from?: string,
    to?: string
  ) => {
    trackCustomEvent('navigation_interaction', {
      action,
      from,
      to,
      user_logged_in: isLoggedIn,
    });
  };

  const trackError = (
    errorType: string,
    errorMessage: string,
    context?: string
  ) => {
    trackCustomEvent('error', {
      error_type: errorType,
      error_message: errorMessage,
      context,
      user_logged_in: isLoggedIn,
    });
  };

  return {
    trackMapInteraction,
    trackBenefitInteraction,
    trackBarcodeInteraction,
    trackMyMapInteraction,
    trackSearchInteraction,
    trackAuthInteraction,
    trackNavigationInteraction,
    trackError,
    trackEvent,
    trackCustomEvent,
  };
};
