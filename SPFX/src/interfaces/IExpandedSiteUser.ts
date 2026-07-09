import { ISiteUserInfo } from "@pnp/sp/site-users";

/**
 * DESCRIPTION
 *   Extends the standard PnP-JS ISiteUserInfo type with the "Groups"
 *   property, which is only present when the query is expanded via
 *   .expand("Groups") and is therefore not part of the default typing.
 **/
export interface IExpandedSiteUser extends ISiteUserInfo {
    Groups: { Id: number; Title: string }[];
}