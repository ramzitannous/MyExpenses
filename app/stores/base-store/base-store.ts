import { Api, ApiConfig } from "@api"
import getEnv from "@environment"

export class BaseApiStore {
  constructor() {
    const env = getEnv()
    const config: ApiConfig = {
      url: env.API_URL,
      auth: { username: env.USERNAME, password: env.PASSWORD },
      timeout: 60 * 1000,
    }
    this.api = new Api(config)
    this.api.setup()
  }

  protected api: Api
}
