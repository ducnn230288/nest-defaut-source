import { testCase } from './index';

import {
  P_DATA_TYPE_LISTED,
  P_DATA_TYPE_CREATE,
  P_DATA_TYPE_UPDATE,
  P_DATA_TYPE_DELETE,
} from '@modules/data/type/type.service';
import { P_DATA_LISTED, P_DATA_CREATE, P_DATA_UPDATE, P_DATA_DELETE } from '@modules/data/data.service';

describe('Role - /api/data', () =>
  testCase('Role', [
    P_DATA_TYPE_LISTED,
    P_DATA_TYPE_CREATE,
    P_DATA_TYPE_UPDATE,
    P_DATA_TYPE_DELETE,
    P_DATA_LISTED,
    P_DATA_CREATE,
    P_DATA_UPDATE,
    P_DATA_DELETE,
  ]));
