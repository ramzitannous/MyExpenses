// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app

import React, { useEffect, useState } from "react"
import { AppRegistry, YellowBox } from "react-native"
import { IRootStore, RootStore, RootStoreProvider } from "@stores/root-store"
import NetInfo from "@react-native-community/netinfo"
import Snackbar from "react-native-snackbar"
import { color } from "@theme"
import { decode, encode } from "base-64"
import { Splash } from "@components/splash"
import AppContainer from './navigation';

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
])

// Teach TypeScript about the bad things we want to do.
declare global {
  class GLOBAL {
    /**
     * */
    static originalXMLHttpRequest: any

    static XMLHttpRequest: any
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    class Global {
      btoa: any

      atob: any
    }
  }
}

if (__DEV__) {
  // To see all the requests in the chrome Dev tools in the network tab.
  XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest
}

// fix axios issue
if (!global.btoa) {
  global.btoa = encode
}

if (!global.atob) {
  global.atob = decode
}

const ReactNative = require("react-native")
Object.defineProperty(ReactNative, "AsyncStorage", {
  get(): any {
    return require("@react-native-community/async-storage").default
  },
})

const SPLASH_DELAY = 2000

/**
 * This is the root component of our app.
 */
export const App: React.FunctionComponent<{}> = () => {
  const [rootStore] = useState<IRootStore | undefined>(RootStore)
  const [isSettingsLoaded, setLoaded] = useState(false)

  useEffect(() => {
    rootStore.appStore.loadAppSettings().then(() => {
      const id = setTimeout(() => {
        clearTimeout(id)
        setLoaded(true)
      }, SPLASH_DELAY)
    })
  }, [])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Snackbar.show({
          title: `You Are Offline !`,
          color: color.text,
          backgroundColor: color.error,
        })
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  if (!isSettingsLoaded) {
    return <Splash />
  }

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <AppContainer></AppContainer>
    </RootStoreProvider>
  )
}


/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "MyExpenses"

AppRegistry.registerComponent(APP_NAME, () => App)
