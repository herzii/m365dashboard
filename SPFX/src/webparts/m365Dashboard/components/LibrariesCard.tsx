import * as React from "react";
import { useEffect } from "react";
import { MessageBar, MessageBarType, Spinner } from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "../../../components/DataTable";
import { RequestStatus } from "../../../enums/RequestStatus";
import { IDataTableColumn } from "../../../interfaces/IDataTableColumn";
import { AppDispatch, RootState } from "../../../redux/Store";
import { setLibraries, setLibrariesError, setLibrariesLoading } from "../../../redux/LibrariesSlice";
import { SharePointService } from "../../../services/SharePointService";
import styles from "./M365Dashboard.module.scss";

const libraryColumns: IDataTableColumn[] = [
    { Key: "title", Name: "Titel", FieldName: "Title", MinWidth: 200 },
    { Key: "itemCount", Name: "Anzahl Elemente", FieldName: "ItemCount", MinWidth: 100 }
];

/**
 * DESCRIPTION
 *   Loads all document libraries of the current site independently and
 *   dispatches the result into the "libraries" Redux slice.
 **/
export const LibrariesCard: React.FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const librariesState = useSelector((state: RootState) => state.libraries);

    useEffect(() => {
        loadLibraries().catch(() => {
            // Errors are already handled and stored inside loadLibraries.
        });
    }, []);

    async function loadLibraries(): Promise<void> {
        dispatch(setLibrariesLoading());

        try {
            const libraries = await SharePointService.getLibraries();
            dispatch(setLibraries(libraries));
        } catch (error) {
            dispatch(setLibrariesError(`Bibliotheken konnten nicht geladen werden: ${(error as Error).message}`));
        }
    }

    if (librariesState.Status === RequestStatus.NOT_STARTED || librariesState.Status === RequestStatus.LOADING) {
        return (
            <div className={styles.card}>
                <Spinner label="Bibliotheken werden geladen..." />
            </div>
        );
    }

    if (librariesState.Status === RequestStatus.FAILED) {
        return (
            <div className={styles.card}>
                <MessageBar messageBarType={MessageBarType.error}>{librariesState.ErrorMessage}</MessageBar>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>Bibliotheken</div>
            <DataTable Columns={libraryColumns} Items={librariesState.Items} />
        </div>
    );
};
