import { AppStore } from "../app-store"
import { SettingsStore } from "@stores/settings-store/settings-store"

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IRootStore {
  appStore: AppStore
  settingsStore: SettingsStore
}
/**
 * A RootStore that helds all other stores.
 */
export const RootStore: IRootStore = {
  appStore: new AppStore(),
  settingsStore: new SettingsStore(),
}
