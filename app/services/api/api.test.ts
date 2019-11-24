import { Api } from "./api"
import getEnv from "@environment"
import { ApiConfig } from "./api-config"

test("check search movies", async (): Promise<void> => {
  const env = getEnv()
  const config: ApiConfig = {
    url: env.API_URL,
    auth: { username: env.USERNAME, password: env.PASSWORD },
    timeout: 60000,
  }
  const api = new Api(config)
  api.setup()
  const m = await api.searchMovie("neighbors")
  expect(m).toBeTruthy()
}, 60000)
