import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import { M365Dashboard } from "./components/M365Dashboard";
import { IM365DashboardWebPartProps } from "../../interfaces/IM365DashboardWebPartProps";
import { setPnpContext } from "../../services/PnpConfig";

/**
 * DESCRIPTION
 *   SPFx web part entry point. This is the only place in the application
 *   allowed to be a React class (rule 2.3.10.2) since BaseClientSideWebPart
 *   is a framework requirement.
 *
 * NOTE
 *   Version: 1.0
 *   Author: Christian
 *   Modified Date: 2026-07-09
 *   Change Log: Initial version
 **/
export default class M365DashboardWebPart extends BaseClientSideWebPart<IM365DashboardWebPartProps> {

    protected onInit(): Promise<void> {
        // Technical, one-time setup of the PnP-JS clients. This does not
        // load any business data (no central bootstrap logic).
        setPnpContext(this.context);
        return super.onInit();
    }

    public render(): void {
        const element: React.ReactElement = React.createElement(M365Dashboard, {});
        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse("1.0");
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: "M365 Dashboard Einstellungen"
                    },
                    groups: [
                        {
                            groupName: "Allgemein",
                            groupFields: [
                                PropertyPaneTextField("Description", {
                                    label: "Beschreibung"
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
