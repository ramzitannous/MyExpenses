import { API_URL, PASSWORD, USERNAME } from "react-native-dotenv"

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IEnvironment {
  API_URL: string
  USERNAME: string
  PASSWORD: string
}

export default function getEnv(): IEnvironment {
  return { PASSWORD, API_URL, USERNAME }
}
