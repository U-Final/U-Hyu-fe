import { benefitHandlers } from './benefit';
import { homeHandlers } from './home';
import { mapHandlers } from './map';

export const handlers = [...mapHandlers, ...homeHandlers, ...benefitHandlers];