/**
 * general store hold all app settings
 * */
import { action, observable } from "mobx"
// import { changeLang, Languages } from "@i18n"
import { I18nManager } from "react-native"
import { loadString, saveString } from "@storage"
// import ReactNativeRestart from "react-native-restart"

export class AppStore {
  @observable
  language: string = Languages.ENGLISH

  private LANG_KEY = "app_language"

  @action
  async changeLanguage(lang: string, firstLoad = false) {
    // changeLang(lang)
    // if (!firstLoad) {
    //   saveString(this.LANG_KEY, lang)
    //   ReactNativeRestart.Restart()
    // }
    //
    // if (lang === Languages.ARABIC) {
    //   I18nManager.forceRTL(true)
    // } else {
    //   I18nManager.forceRTL(false)
    // }
    // this.language = lang
  }

  async loadAppSettings() {
    const currentLang = await loadString(this.LANG_KEY)
    this.changeLanguage(currentLang, true)
  }
}
