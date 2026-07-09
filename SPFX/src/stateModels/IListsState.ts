import { RequestStatus } from "../enums/RequestStatus";
import { ISpList } from "../interfaces/ISpList";

/**
 * DESCRIPTION
 *   Redux state shape for the "lists" slice (regular SharePoint lists).
 **/
export interface IListsState {
    Items: ISpList[];
    Status: RequestStatus;
    ErrorMessage: string | null;
}
