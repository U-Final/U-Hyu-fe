import { benefitHandlers } from './benefit';
import { homeHandlers } from './home';
import { mapHandlers } from './map';
import { userHandlers } from './user';

export const handlers = [
  ...userHandlers,
  ...mapHandlers,
  ...homeHandlers,
  ...benefitHandlers,
];
