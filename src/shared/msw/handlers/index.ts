import { homeHandlers } from './home';
import { mapHandlers } from './map';
import { mypageHandlers } from './mypage';

export const handlers = [...mapHandlers, ...homeHandlers, ...mypageHandlers];
