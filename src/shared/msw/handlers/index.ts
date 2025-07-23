import { benefitHandlers } from './benefit';
import { homeHandlers } from './home';
import { mapHandlers } from './map';
import { visitStoreHandler } from './visitstore';

export const handlers = [
  ...mapHandlers,
  ...homeHandlers,
  ...benefitHandlers,
  ...visitStoreHandler,
];
