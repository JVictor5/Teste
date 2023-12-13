import { ApiError } from '@burand/functions/exceptions';
import { PasswordProvider } from '@providers/password.provider.js';
import { AuthenticationRepository } from '@repositories/authentication.repository.js';
import { UserRepository } from '@repositories/user.repository.js';
import { singleton } from 'tsyringe';
import { SetDocument } from '@burand/functions/typings';
import { User } from '@models/user.js';
import { UserType } from '@enums/user-type.js';
import { AdminParams } from './CreateAdminValidation.js';

@singleton()
export class CreateAdminUseCase {
  constructor(
    private _user: UserRepository,
    private _auth: AuthenticationRepository,
    private _password: PasswordProvider
  ) {}

  async execute({ email, name }: AdminParams): Promise<string> {
    let id = null;
    const password = this._password.defaultPassword;

    try {
      id = await this._auth.create({ email, password, displayName: name });

      const userData: SetDocument<User> = {
        email,
        name,
        id,
        role: UserType.ADMIN,
        avatar: null,
        lastAccess: null
      };

      await this._user.set(userData);

      await this._auth.setCustomClaims(id, {
        loginType: UserType.ADMIN
      });
    } catch (err: any) {
      if (id) {
        await this._auth.delete(id);
      }

      throw new ApiError(`Admin create failed: ${err.message}`, 'application/create-admin', 500);
    }

    return id;
  }
}
