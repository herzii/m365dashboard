/**
 * DESCRIPTION
 *   Represents a SharePoint list or document library.
 **/
export interface ISpList {
    Id: string;
    Title: string;
    ItemCount: number;
    IsDocumentLibrary: boolean;
}
