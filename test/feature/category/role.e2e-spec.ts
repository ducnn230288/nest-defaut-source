import { testCase } from './index';

import {
  P_CATEGORY_TYPE_LISTED,
  P_CATEGORY_TYPE_DETAIL,
  P_CATEGORY_TYPE_CREATE,
  P_CATEGORY_TYPE_UPDATE,
  P_CATEGORY_TYPE_DELETE,
} from '../../../src/modules/category/type/type.service';
import {
  P_CATEGORY_LISTED,
  P_CATEGORY_DETAIL,
  P_CATEGORY_CREATE,
  P_CATEGORY_UPDATE,
  P_CATEGORY_DELETE,
} from '../../../src/modules/category/category.service';

describe('Role - /api/category', () =>
  testCase('Role', [
    P_CATEGORY_TYPE_LISTED,
    P_CATEGORY_TYPE_DETAIL,
    P_CATEGORY_TYPE_CREATE,
    P_CATEGORY_TYPE_UPDATE,
    P_CATEGORY_TYPE_DELETE,
    P_CATEGORY_LISTED,
    P_CATEGORY_DETAIL,
    P_CATEGORY_CREATE,
    P_CATEGORY_UPDATE,
    P_CATEGORY_DELETE,
  ]));
