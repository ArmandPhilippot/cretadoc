/**
 * List of HTTP status code.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export const HTTP_STATUS_CODE = {
  /**
   * The client should continue the request or ignore the response if the
   * request is already finished.
   */
  CONTINUE: 100,
  /**
   * An upgrade has been asked by the client and the server has agreed to do so.
   */
  SWITCHING_PROTOCOLS: 101,
  /**
   * The server has received and is processing the request, but no response is
   * available yet.
   */
  PROCESSING: 102,
  /**
   * Return some response headers while the server prepares a response.
   */
  EARLY_HINTS: 103,
  /**
   * The request succeeded.
   */
  OK: 200,
  /**
   * The request succeeded, and a new resource was created as a result.
   */
  CREATED: 201,
  /**
   * The request has been received but not yet acted upon.
   */
  ACCEPTED: 202,
  /**
   * The server is returning a modified version of the origin's response.
   */
  NON_AUTHORITATIVE_INFORMATION: 203,
  /**
   * There is no content to send for this request, but the headers may be
   * useful.
   */
  NO_CONTENT: 204,
  /**
   * Tells the user agent to reset the document which sent this request.
   */
  RESET_CONTENT: 205,
  /**
   * The server is delivering only part of the resource due to a range header
   * sent by the client.
   */
  PARTIAL_CONTENT: 206,
  /**
   * Conveys information about multiple resources.
   */
  MULTI_STATUS: 207,
  /**
   * The members have already been enumerated in a preceding part of the
   * response, and are not being included again.
   */
  ALREADY_REPORTED: 208,
  /**
   * The server has fulfilled a request, and the response is a representation
   * of the result of one or more instance-manipulations applied to the current
   * instance.
   */
  IM_USED: 226,
  /**
   * The request has more than one possible response.
   */
  MULTIPLE_CHOICES: 300,
  /**
   * The requested resource URL has been changed permanently.
   */
  MOVED_PERMANENTLY: 301,
  /**
   * The URI of requested resource has been changed temporarily. Further
   * changes in the URI might be made in the future.
   */
  FOUND: 302,
  /**
   * Tell the client to get the requested resource at another URI with a GET
   * request.
   */
  SEE_OTHER: 303,
  /**
   * Used for caching purposes: tells the client that the response has not been
   * modified.
   */
  NOT_MODIFIED: 304,
  /**
   * Deprecated.
   */
  USE_PROXY: 305,
  /**
   * Deprecated.
   */
  UNUSED: 306,
  /**
   * Direct the client to get the requested resource at another URI with the
   * same method that was used in the prior request.
   */
  TEMPORARY_REDIRECT: 307,
  /**
   * The resource is now permanently located at another URI.
   */
  PERMANENT_REDIRECT: 308,
  /**
   * The server cannot or will not process the request due to something that is
   * perceived to be a client error.
   */
  BAD_REQUEST: 400,
  /**
   * The client does not have valid authentication credentials for the target
   * resource. An authentication is required and has failed or has not yet been
   * provided.
   */
  UNAUTHORIZED: 401,
  /**
   * The requested content is not available until the client makes a payment.
   * Experimental/Non standard status code.
   */
  PAYMENT_REQUIRED: 402,
  /**
   * The client does not have access rights to the content.
   */
  FORBIDDEN: 403,
  /**
   * The server cannot find the requested resource.
   */
  NOT_FOUND: 404,
  /**
   * The request method is known by the server but is not supported by the
   * target resource.
   */
  METHOD_NOT_ALLOWED: 405,
  /**
   * The server doesn't find any content that conforms to the criteria given by
   * the user agent.
   */
  NOT_ACCEPTABLE: 406,
  /**
   * Authentication is needed to be done by a proxy.
   */
  PROXY_AUTHENTICATION_REQUIRED: 407,
  /**
   * The client did not produce a request within the time that the server was
   * prepared to wait. The server would like to shut down this unused
   * connection.
   */
  REQUEST_TIMEOUT: 408,
  /**
   * The request could not be processed because of conflict in the current
   * state of the resource.
   */
  CONFLICT: 409,
  /**
   * The requested content has been permanently deleted from server, with no
   * forwarding address.
   */
  GONE: 410,
  /**
   * The request did not specify the length of its content, which is required
   * by the requested resource.
   */
  LENGTH_REQUIRED: 411,
  /**
   * The server does not meet one of the preconditions indicated by the client
   * in its headers.
   */
  PRECONDITION_FAILED: 412,
  /**
   * The Request is larger than limits defined by server.
   */
  PAYLOAD_TOO_LARGE: 413,
  /**
   * The URI requested by the client is longer than the server is willing to
   * interpret.
   */
  URI_TOO_LONG: 414,
  /**
   * The request entity has a media type which the server or resource does not
   * support.
   */
  UNSUPPORTED_MEDIA_TYPE: 415,
  /**
   * The range specified in the request cannot be fulfilled.
   */
  RANGE_NOT_SATISFIABLE: 416,
  /**
   * The expectation indicated cannot be met by the server.
   */
  EXPECTATION_FAILED: 417,
  /**
   * The server refuses to brew coffee because it is a teapot. Reference to
   * Hyper Text Coffee Pot Control Protocol defined in 1998 as an April Fools'
   * jokes.
   */
  I_M_A_TEAPOT: 418,
  /**
   * The request was directed at a server that is not able to produce a
   * response.
   */
  MISDIRECTED_REQUEST: 421,
  /**
   * The request was well-formed but was unable to be followed due to semantic
   * errors.
   */
  UNPROCESSABLE_CONTENT: 422,
  /**
   * The resource that is being accessed is locked.
   */
  LOCKED: 423,
  /**
   * The request failed due to failure of a previous request.
   */
  FAILED_DEPENDENCY: 424,
  /**
   * The server is unwilling to risk processing a request that might be
   * replayed.
   */
  TOO_EARLY: 425,
  /**
   * The server refuses to perform the request using the current protocol but
   * might be willing to do so after the client upgrades to a different
   * protocol.
   */
  UPGRADE_REQUIRED: 426,
  /**
   * The origin server requires the request to be conditional.
   */
  PRECONDITION_REQUIRED: 428,
  /**
   * The user has sent too many requests in a given amount of time.
   */
  TOO_MANY_REQUESTS: 429,
  /**
   * The server is unwilling to process the request because its header fields
   * are too large.
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  /**
   * The user agent requested a resource that cannot legally be provided.
   */
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  /**
   * The server has encountered a situation it does not know how to handle.
   */
  INTERNAL_SERVER_ERROR: 500,
  /**
   * The request method is not supported by the server and cannot be handled.
   */
  NOT_IMPLEMENTED: 501,
  /**
   * The server is acting as a gateway or proxy and received an invalid
   * response.
   */
  BAD_GATEWAY: 502,
  /**
   * The server is not ready to handle the request (commonly because it is
   * overloaded or down for maintenance).
   */
  SERVICE_UNAVAILABLE: 503,
  /**
   * The server is acting as a gateway and cannot get a response in time.
   */
  GATEWAY_TIMEOUT: 504,
  /**
   * The HTTP version used in the request is not supported by the server.
   */
  HTTP_VERSION_NOT_SUPPORTED: 505,
  /**
   * The server has an internal configuration error.
   */
  VARIANT_ALSO_NEGOTIATES: 506,
  /**
   * The server is unable to store the representation needed to complete the
   * request.
   */
  INSUFFICIENT_STORAGE: 507,
  /**
   * The server detected an infinite loop while processing the request.
   */
  LOOP_DETECTED: 508,
  /**
   * Further extensions to the request are required for the server to fulfill
   * it.
   */
  NOT_EXTENDED: 510,
  /**
   * The client needs to authenticate to gain network access.
   */
  NETWORK_AUTHENTICATION_REQUIRED: 511,
} as const;

export type HttpStatusCode =
  (typeof HTTP_STATUS_CODE)[keyof typeof HTTP_STATUS_CODE];
