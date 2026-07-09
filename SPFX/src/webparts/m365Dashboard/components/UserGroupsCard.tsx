import * as React from "react";
import { useEffect } from "react";
import { MessageBar, MessageBarType, Spinner } from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "../../../components/DataTable";
import { RequestStatus } from "../../../enums/RequestStatus";
import { IDataTableColumn } from "../../../interfaces/IDataTableColumn";
import { AppDispatch, RootState } from "../../../redux/Store";
import { setGroups, setGroupsError, setGroupsLoading } from "../../../redux/GroupsSlice";
import { SharePointService } from "../../../services/SharePointService";
import styles from "./M365Dashboard.module.scss";

const groupColumns: IDataTableColumn[] = [
    { Key: "displayName", Name: "Gruppe", FieldName: "DisplayName", MinWidth: 150 }
];

/**
 * DESCRIPTION
 *   Loads the SharePoint group memberships of the current user independently
 *   and dispatches the result into the "groups" Redux slice.
 **/
export const UserGroupsCard: React.FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const groupsState = useSelector((state: RootState) => state.groups);

    useEffect(() => {
        loadUserGroups().catch(() => {
            // Errors are already handled and stored inside loadUserGroups.
        });
    }, []);

    async function loadUserGroups(): Promise<void> {
        dispatch(setGroupsLoading());

        try {
            const groups = await SharePointService.getUserGroups();
            dispatch(setGroups(groups));
        } catch (error) {
            dispatch(setGroupsError(`Gruppen konnten nicht geladen werden: ${(error as Error).message}`));
        }
    }

    if (groupsState.Status === RequestStatus.NOT_STARTED || groupsState.Status === RequestStatus.LOADING) {
        return (
            <div className={styles.card}>
                <Spinner label="Gruppen werden geladen..." />
            </div>
        );
    }

    if (groupsState.Status === RequestStatus.FAILED) {
        return (
            <div className={styles.card}>
                <MessageBar messageBarType={MessageBarType.error}>{groupsState.ErrorMessage}</MessageBar>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>Gruppenmitgliedschaften</div>
            <DataTable Columns={groupColumns} Items={groupsState.Items} />
        </div>
    );
};
