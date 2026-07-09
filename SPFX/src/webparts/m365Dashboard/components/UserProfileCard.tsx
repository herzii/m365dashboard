import * as React from "react";
import { useEffect } from "react";
import { Persona, PersonaSize, MessageBar, MessageBarType, Spinner } from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";

import { RequestStatus } from "../../../enums/RequestStatus";
import { AppDispatch, RootState } from "../../../redux/Store";
import { setUserError, setUserLoading, setUserProfile } from "../../../redux/UserSlice";
import { GraphService } from "../../../services/GraphService";
import styles from "./M365Dashboard.module.scss";

/**
 * DESCRIPTION
 *   Loads the current user's Microsoft Graph profile independently and
 *   dispatches the result into the "user" Redux slice. Rendering is based
 *   exclusively on the Redux store (useSelector).
 **/
export const UserProfileCard: React.FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((state: RootState) => state.user);

    useEffect(() => {
        loadUserProfile().catch(() => {
            // Errors are already handled and stored inside loadUserProfile.
        });
    }, []);

    async function loadUserProfile(): Promise<void> {
        dispatch(setUserLoading());

        try {
            const profile = await GraphService.getUserProfile();
            dispatch(setUserProfile(profile));
        } catch (error) {
            dispatch(setUserError(`Benutzerprofil konnte nicht geladen werden: ${(error as Error).message}`));
        }
    }

    if (userState.Status === RequestStatus.NOT_STARTED || userState.Status === RequestStatus.LOADING) {
        return (
            <div className={styles.card}>
                <Spinner label="Profil wird geladen..." />
            </div>
        );
    }

    if (userState.Status === RequestStatus.FAILED) {
        return (
            <div className={styles.card}>
                <MessageBar messageBarType={MessageBarType.error}>{userState.ErrorMessage}</MessageBar>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>Profil</div>
            <Persona
                text={userState.Profile?.DisplayName}
                secondaryText={userState.Profile?.JobTitle}
                tertiaryText={userState.Profile?.Department}
                size={PersonaSize.size48}
            />
            <div className={styles.cardDetailRow}>{userState.Profile?.Mail}</div>
        </div>
    );
};
