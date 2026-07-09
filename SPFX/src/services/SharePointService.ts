import { getSp } from "./PnpConfig";
import { SP_LIST_TEMPLATE_DOCUMENT_LIBRARY } from "../constants/SpListInfos";
import { ISiteInfo } from "../interfaces/ISiteInfo";
import { ISpList } from "../interfaces/ISpList";
import { IUserGroup } from "../interfaces/IUserGroup";
import { IExpandedSiteUser } from "../interfaces/IExpandedSiteUser";

/**
 * DESCRIPTION
 *   Encapsulates all read access to the SharePoint REST API via PnP-JS
 *   (site information, group memberships, lists and document libraries).
 **/
export class SharePointService {

    /**
     * DESCRIPTION
     *   Loads title and URL of the current SharePoint site.
     *
     * OUTPUT
     *   ISiteInfo containing Title and Url.
     **/
    public static async getSiteInfo(): Promise<ISiteInfo> {
        const sp = getSp();
        const web = await sp.web();

        return {
            Title: web.Title,
            Url: web.Url
        };
    }

    /**
     * DESCRIPTION
     *   Loads the SharePoint groups the current user is a member of.
     *
     * OUTPUT
     *   Array of IUserGroup.
     **/
    public static async getUserGroups(): Promise<IUserGroup[]> {
        const sp = getSp();
        const currentUser = await sp.web.currentUser.expand("Groups")() as IExpandedSiteUser;
        const groups = currentUser.Groups;

        if (groups === undefined || groups === null || groups.length === 0) {
            return [];
        }

        return groups.map((group) => {
            return {
                Id: group.Id.toString(),
                DisplayName: group.Title
            };
        });
    }
    
    /**
     * DESCRIPTION
     *   Loads all regular (non-library) lists of the current site.
     *
     * OUTPUT
     *   Array of ISpList with IsDocumentLibrary = false.
     **/
    public static async getLists(): Promise<ISpList[]> {
        return SharePointService._getListsByTemplate(false);
    }

    /**
     * DESCRIPTION
     *   Loads all document libraries of the current site.
     *
     * OUTPUT
     *   Array of ISpList with IsDocumentLibrary = true.
     **/
    public static async getLibraries(): Promise<ISpList[]> {
        return SharePointService._getListsByTemplate(true);
    }

    /**
     * DESCRIPTION
     *   Loads either lists or document libraries of the current site,
     *   depending on the requested template type.
     *
     * PARAMETERS
     *   @param isDocumentLibrary true to load document libraries, false to load regular lists
     *
     * OUTPUT
     *   Array of ISpList matching the requested type.
     **/
    private static async _getListsByTemplate(isDocumentLibrary: boolean): Promise<ISpList[]> {
        const sp = getSp();

        const allLists = await sp.web.lists
            .select("Id", "Title", "ItemCount", "BaseTemplate")
            .filter("Hidden eq false")();

        return allLists
            .filter((list) => {
                const isLibrary = list.BaseTemplate === SP_LIST_TEMPLATE_DOCUMENT_LIBRARY;
                return isDocumentLibrary ? isLibrary : !isLibrary;
            })
            .map((list) => {
                return {
                    Id: list.Id,
                    Title: list.Title,
                    ItemCount: list.ItemCount,
                    IsDocumentLibrary: isDocumentLibrary
                };
            });
    }
}
