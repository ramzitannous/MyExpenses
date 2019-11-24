import { ApiResponse } from "apisauce"

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "Timeout"; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "Cannot Connect"; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server" }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized" }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden" }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "Not Found" }
  /**
   * All other 4xx series errors.
   */
  | { kind: "Rejected" }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "Bad Data" }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { kind: "Cannot Connect", temporary: true }
    case "NETWORK_ERROR":
      return { kind: "Cannot Connect", temporary: true }
    case "TIMEOUT_ERROR":
      return { kind: "Timeout", temporary: true }
    case "SERVER_ERROR":
      return { kind: "server" }
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true }
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return { kind: "unauthorized" }
        case 403:
          return { kind: "forbidden" }
        case 404:
          return { kind: "Not Found" }
        default:
          return { kind: "Rejected" }
      }
    case "CANCEL_ERROR":
      return null
  }

  return null
}
