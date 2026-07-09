import * as React from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from "@fluentui/react";

import { IDataTableColumn } from "../interfaces/IDataTableColumn";

export interface IDataTableProps {
    Columns: IDataTableColumn[];
    Items: object[];
}

/**
 * DESCRIPTION
 *   Generic, reusable presentational table component based on Fluent UI
 *   DetailsList. Used by several web part components (e.g. lists,
 *   libraries, groups) - therefore placed in the shared "components" folder.
 **/
export const DataTable: React.FunctionComponent<IDataTableProps> = (props: IDataTableProps) => {
    const columns: IColumn[] = props.Columns.map((column) => {
        return {
            key: column.Key,
            name: column.Name,
            fieldName: column.FieldName,
            minWidth: column.MinWidth,
            maxWidth: column.MaxWidth,
            isResizable: true
        };
    });

    return (
        <DetailsList
            items={props.Items}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
            compact={true}
        />
    );
};
