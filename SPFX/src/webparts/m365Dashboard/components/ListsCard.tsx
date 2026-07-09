import * as React from "react";
import { useEffect } from "react";
import { MessageBar, MessageBarType, Spinner } from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "../../../components/DataTable";
import { RequestStatus } from "../../../enums/RequestStatus";
import { IDataTableColumn } from "../../../interfaces/IDataTableColumn";
import { AppDispatch, RootState } from "../../../redux/Store";
import { setLists, setListsError, setListsLoading } from "../../../redux/ListsSlice";
import { SharePointService } from "../../../services/SharePointService";
import styles from "./M365Dashboard.module.scss";

const listColumns: IDataTableColumn[] = [
    { Key: "title", Name: "Titel", FieldName: "Title", MinWidth: 200 },
    { Key: "itemCount", Name: "Anzahl Elemente", FieldName: "ItemCount", MinWidth: 100 }
];

/**
 * DESCRIPTION
 *   Loads all regular SharePoint lists of the current site independently
 *   and dispatches the result into the "lists" Redux slice.
 **/
export const ListsCard: React.FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const listsState = useSelector((state: RootState) => state.lists);

    useEffect(() => {
        loadLists().catch(() => {
            // Errors are already handled and stored inside loadLists.
        });
    }, []);

    async function loadLists(): Promise<void> {
        dispatch(setListsLoading());

        try {
            const lists = await SharePointService.getLists();
            dispatch(setLists(lists));
        } catch (error) {
            dispatch(setListsError(`Listen konnten nicht geladen werden: ${(error as Error).message}`));
        }
    }

    if (listsState.Status === RequestStatus.NOT_STARTED || listsState.Status === RequestStatus.LOADING) {
        return (
            <div className={styles.card}>
                <Spinner label="Listen werden geladen..." />
            </div>
        );
    }

    if (listsState.Status === RequestStatus.FAILED) {
        return (
            <div className={styles.card}>
                <MessageBar messageBarType={MessageBarType.error}>{listsState.ErrorMessage}</MessageBar>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>Listen</div>
            <DataTable Columns={listColumns} Items={listsState.Items} />
        </div>
    );
};
