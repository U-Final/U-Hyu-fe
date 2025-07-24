import { benefitHandlers } from './benefit';
import { homeHandlers } from './home';
import { mapHandlers } from './map';
import { mymapHandlers } from './mymap';
import { mypageHandlers } from './mypage';
import { recommendHandlers } from './recommendation';
import { userHandlers } from './user';
import { visitStoreHandler } from './visitstore';

export const handlers = [
  ...userHandlers,
  ...mapHandlers,
  ...homeHandlers,
  ...benefitHandlers,
  ...mypageHandlers,
  ...mymapHandlers,
  ...recommendHandlers,
  ...visitStoreHandler,
];
