import { Model } from '@burand/functions/firestore';
import { UserType } from '@enums/user-type.js';

export interface User extends Model {
  name: string;
  email: string;
  lastAccess?: Date | null;
  avatar?: string | null;
  role?: UserType;
}
