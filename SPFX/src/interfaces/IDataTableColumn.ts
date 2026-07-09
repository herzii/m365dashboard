/**
 * DESCRIPTION
 *   Describes one column of the generic, reusable DataTable component.
 **/
export interface IDataTableColumn {
    Key: string;
    Name: string;
    FieldName: string;
    MinWidth: number;
    MaxWidth?: number;
}
