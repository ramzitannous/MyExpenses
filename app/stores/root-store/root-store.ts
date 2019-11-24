import { AppStore } from "../app-store"
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IRootStore {
  appStore: AppStore
}
/**
 * A RootStore that helds all other stores.
 */
export const RootStore: IRootStore = {
  appStore: new AppStore(),
}
