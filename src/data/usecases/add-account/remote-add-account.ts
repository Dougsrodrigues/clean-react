import { HttpPostClient } from '@/data/protocols/http';
import { AccountModel } from '@/domain/models';
import { AddAccountParams, AddAcount } from '@/domain/usecases';

export class RemoteAddAccount implements AddAcount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccountParams,
      AccountModel
    >,
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    return null;
  }
}
