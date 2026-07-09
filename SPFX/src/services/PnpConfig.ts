import "@pnp/graph/groups";
import "@pnp/graph/users";
import "@pnp/sp/lists";
import "@pnp/sp/security/web";
import "@pnp/sp/site-users/web";
import "@pnp/sp/webs";
import { GraphFI, graphfi, SPFx as graphSPFx } from "@pnp/graph";
import { SPFI, spfi, SPFx as spSPFx } from "@pnp/sp";
import { WebPartContext } from "@microsoft/sp-webpart-base";

/**
 * DESCRIPTION
 *   Central, one-time technical setup of the PnP-JS SharePoint (sp) and
 *   Microsoft Graph (graph) clients. This is pure technical wiring and is
 *   called once from the web part's onInit() - it does not load any
 *   business data and is therefore not considered a "central bootstrap".
 *
 * PARAMETERS
 *   @param context the SPFx web part context
 *
 * NOTE
 *   Version: 1.0
 *   Author: Christian
 *   Modified Date: 2026-07-09
 *   Change Log: Initial version
 **/

let spInstance: SPFI;
let graphInstance: GraphFI;

export function setPnpContext(context: WebPartContext): void {
    spInstance = spfi().using(spSPFx(context));
    graphInstance = graphfi().using(graphSPFx(context));
}

export function getSp(): SPFI {
    return spInstance;
}

export function getGraph(): GraphFI {
    return graphInstance;
}
