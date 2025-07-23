import { benefitHandlers } from './benefit';
import { homeHandlers } from './home';
import { mapHandlers } from './map';
import { mymapHandlers } from './mymap';
import { userHandlers } from './user';
import { mypageHandlers } from './mypage';

export const handlers = [
  ...userHandlers,
  ...mapHandlers,
  ...homeHandlers,
  ...benefitHandlers,
  ...mypageHandlers
  ...mymapHandlers,
];
