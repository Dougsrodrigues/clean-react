import { AccountModel } from '@/domain/models/account-model';

export type AddAcountParams = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export interface AddAcount {
  add(params: AddAcountParams): Promise<AccountModel>;
}
