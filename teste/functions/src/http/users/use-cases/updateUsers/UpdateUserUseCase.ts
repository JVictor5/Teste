import { UserRepository } from '@repositories/user.repository.js';
import { singleton } from 'tsyringe';
import { AuthenticationRepository } from '@repositories/authentication.repository.js';
import { UpdateParams } from './UpdateUserValidation.js';

@singleton()
export class UpdateUserUseCase {
  constructor(private _user: UserRepository, private _auth: AuthenticationRepository) {}

  async execute(id: string, { email, password }: UpdateParams): Promise<void> {
    if (email) {
      await this._auth.update({ id, email });

      await this._user.update({ id, email });
    }

    if (password) {
      await this._auth.update({ id, password });
    }
  }
}
