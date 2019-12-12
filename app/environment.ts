import { API_URL } from "react-native-dotenv"

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IEnvironment {
  API_URL: string
}

export default function getEnv(): IEnvironment {
  return { API_URL }
}
