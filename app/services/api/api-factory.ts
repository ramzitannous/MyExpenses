import getEnv from "@environment"
import { ApiConfig } from "./api-config"
import { Api } from "./api"

export class ApiFactory {
  private static _api: Api

  static getInstance(): Api {
    if (this._api) {
      return this._api
    }
    const env = getEnv()
    const config: ApiConfig = {
      url: env.API_URL,
      auth: env.API_KEY,
      timeout: 60 * 1000,
    }
    const api = new Api(config)
    api.setup()
    return api
  }
}
