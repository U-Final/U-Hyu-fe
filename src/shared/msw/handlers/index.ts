import { adminHandlers } from './admin';
import { barcodeHandlers } from './barcode';
import { benefitHandlers } from './benefit';
import { brandHandlers } from './brand';
import { homeHandlers } from './home';
import { mapHandlers } from './map';
import { mymapHandlers } from './mymap';
import { mypageHandlers } from './mypage';
import { recommendHandlers, recommendRankingHandlers } from './recommendation';
import { userHandlers } from './user';

export const handlers = [
  ...userHandlers,
  ...mapHandlers,
  ...homeHandlers,
  ...benefitHandlers,
  ...brandHandlers,
  ...mypageHandlers,
  ...adminHandlers,
  ...mymapHandlers,
  ...recommendHandlers,
  ...recommendRankingHandlers,
  ...barcodeHandlers,
];
