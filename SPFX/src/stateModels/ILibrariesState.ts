import { RequestStatus } from "../enums/RequestStatus";
import { ISpList } from "../interfaces/ISpList";

/**
 * DESCRIPTION
 *   Redux state shape for the "libraries" slice (document libraries).
 **/
export interface ILibrariesState {
    Items: ISpList[];
    Status: RequestStatus;
    ErrorMessage: string | null;
}
