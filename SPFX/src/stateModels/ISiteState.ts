import { RequestStatus } from "../enums/RequestStatus";
import { ISiteInfo } from "../interfaces/ISiteInfo";

/**
 * DESCRIPTION
 *   Redux state shape for the "site" slice.
 **/
export interface ISiteState {
    Info: ISiteInfo | null;
    Status: RequestStatus;
    ErrorMessage: string | null;
}
