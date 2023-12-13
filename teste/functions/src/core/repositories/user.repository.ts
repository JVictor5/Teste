import { FirestoreCollecionName } from '@config/FirestoreCollectionName.js';
import { singleton } from 'tsyringe';
import { FirebaseAbstract } from '@burand/functions/firestore';
import { User } from '@models/user.js';

@singleton()
export class UserRepository extends FirebaseAbstract<User> {
  constructor() {
    super(FirestoreCollecionName.USERS);
  }
}
