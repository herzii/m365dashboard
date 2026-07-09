import { getGraph } from "./PnpConfig";
import { IUserProfile } from "../interfaces/IUserProfile";

/**
 * DESCRIPTION
 *   Encapsulates all read access to the Microsoft Graph API via PnP-JS.
 **/
export class GraphService {

    /**
     * DESCRIPTION
     *   Loads the Microsoft Graph profile of the currently signed-in user.
     *
     * OUTPUT
     *   IUserProfile with display name, mail, job title and department.
     *
     * NOTE
     *   Version: 1.0
     *   Author: Christian
     *   Modified Date: 2026-07-09
     *   Change Log: Initial version
     **/
    public static async getUserProfile(): Promise<IUserProfile> {
        const graph = getGraph();
        const currentUser = await graph.me();

        return {
            DisplayName: currentUser.displayName ?? "",
            Mail: currentUser.mail ?? currentUser.userPrincipalName ?? "",
            JobTitle: currentUser.jobTitle ?? "",
            Department: currentUser.department ?? ""
        };
    }
}
