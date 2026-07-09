import { RequestStatus } from "../enums/RequestStatus";
import { IUserProfile } from "../interfaces/IUserProfile";

/**
 * DESCRIPTION
 *   Redux state shape for the "user" slice.
 **/
export interface IUserState {
    Profile: IUserProfile | null;
    Status: RequestStatus;
    ErrorMessage: string | null;
}
