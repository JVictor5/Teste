import { ApiError } from '@burand/functions/exceptions';
import { PasswordProvider } from '@providers/password.provider.js';
import { AuthenticationRepository } from '@repositories/authentication.repository.js';
import { UserRepository } from '@repositories/user.repository.js';
import { singleton } from 'tsyringe';
import { SetDocument } from '@burand/functions/typings';
import { User } from '@models/user.js';
import { UserType } from '@enums/user-type.js';
import { UserParams } from './CreateUserValidation.js';

@singleton()
export class CreateUserUseCase {
  constructor(
    private _user: UserRepository,
    private _auth: AuthenticationRepository,
    private _password: PasswordProvider
  ) {}

  async execute({ email, name }: UserParams): Promise<SetDocument<User>> {
    let ret;
    let id = null;
    const password = this._password.defaultPassword;

    try {
      id = await this._auth.create({ email, password, displayName: name });

      const userData: SetDocument<User> = {
        email,
        name,
        id,
        role: UserType.USER,
        avatar: null,
        lastAccess: null
      };

      await this._user.set(userData);

      await this._auth.setCustomClaims(id, {
        loginType: UserType.USER
      });

      ret = userData;
    } catch (err: any) {
      if (id) {
        await this._auth.delete(id);
      }

      ret = null;

      throw new ApiError(`User create failed: ${err.message}`, 'application/create-user', 500);
    }

    return ret;
  }
}
