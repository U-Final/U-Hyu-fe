import { benefitHandlers } from './benefit';
import { homeHandlers } from './home';
import { mapHandlers } from './map';
import { recommendHandlers } from './recommendation';

export const handlers = [
  ...mapHandlers,
  ...homeHandlers,
  ...benefitHandlers,
  ...recommendHandlers,
];
