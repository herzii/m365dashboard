import { RequestStatus } from "../enums/RequestStatus";
import { IUserGroup } from "../interfaces/IUserGroup";

/**
 * DESCRIPTION
 *   Redux state shape for the "groups" slice.
 **/
export interface IGroupsState {
    Items: IUserGroup[];
    Status: RequestStatus;
    ErrorMessage: string | null;
}
