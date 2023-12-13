import { UserType } from '@enums/user-type.js';
import { getAuth, UserRecord } from 'firebase-admin/auth';
import { singleton } from 'tsyringe';

const fireAuth = getAuth();

interface IParamsCreate {
  email: string;
  password: string;
  displayName?: string;
  photoURL?: string;
}

interface IParamsUpdate {
  id: string;
  email?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
  password?: string;
  displayName?: string;
  photoURL?: string;
  disabled?: boolean;
}

interface IClaimsParams {
  level?: string;
  loginType: UserType;
}

@singleton()
export class AuthenticationRepository {
  async create(data: IParamsCreate): Promise<string> {
    const { uid } = await fireAuth.createUser(data);
    return uid;
  }

  async delete(id: string): Promise<void> {
    await fireAuth.deleteUser(id);
  }

  async update({ id, ...data }: IParamsUpdate): Promise<void> {
    await fireAuth.updateUser(id, data);
  }

  getUserByEmail(email: string): Promise<UserRecord> {
    return fireAuth.getUserByEmail(email);
  }

  async revokeRefreshTokens(id: string): Promise<void> {
    await fireAuth.revokeRefreshTokens(id);
  }

  generatePasswordResetLink(email: string): Promise<string> {
    return fireAuth.generatePasswordResetLink(email);
  }

  setCustomClaims(userId: string, customUserClaims: IClaimsParams): Promise<void> {
    return fireAuth.setCustomUserClaims(userId, customUserClaims);
  }
}
