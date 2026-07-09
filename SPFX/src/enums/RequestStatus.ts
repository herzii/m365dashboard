/**
 * DESCRIPTION
 *   Represents the loading status of an asynchronous Redux state slice.
 *
 * NOTE
 *   Version: 1.0
 *   Author: Christian
 *   Modified Date: 2026-07-09
 *   Change Log: Initial version
 **/
export enum RequestStatus {
    NOT_STARTED = "NOT_STARTED",
    LOADING = "LOADING",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED"
}
