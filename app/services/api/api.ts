import { ApisauceInstance, create } from "apisauce"
import { ApiConfig } from "./api-config"
import { getGeneralApiProblem } from "@services/api/api-problem"
import { showError, showSnackbar } from "@utils/helpers"
import { CurrencyRateResponse } from "@models/fixer"

/**
 * Manages all requests to the API.
 */
export class Api {
  bypassSnackbarUrl: RegExp[] = []

  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })

    if (__DEV__) {
      this.apisauce.addRequestTransform(request => {
        console.log(`requesting url: ${request.url} with data ${JSON.stringify(request.data)}`)
      })
    }

    this.apisauce.addResponseTransform(response => {
      if (response.ok && __DEV__) {
        console.log(
          `call success to ${response.config.url} with data: ${JSON.stringify(
            response.config.data,
          )} \n Response: ${JSON.stringify(response.data)}`,
        )
      }
      if (
        response.ok &&
        response.config.params &&
        response.config.params !== {} &&
        !("page" in response.config.params) &&
        !this.bypassSnackbarUrl.some(value => value.test(response.config.url))
      ) {
        showSnackbar("Operation Success")
      } else if (!response.ok) {
        console.error(
          `Error While calling ${response.config.url} \n status code: ${
            response.status
          } \n with body: ${JSON.stringify(response.config.data)} `,
        )
        const problem = getGeneralApiProblem(response)
        showError(problem ? problem.kind : "General Error Occurred")
      }
    })
  }

  public async getCurrencyRates(baseCurrency: string) {
    const res = await this.apisauce.get<CurrencyRateResponse>("/", {
      // eslint-disable-next-line @typescript-eslint/camelcase
      base: baseCurrency,
    })
    return res.data
  }
}
