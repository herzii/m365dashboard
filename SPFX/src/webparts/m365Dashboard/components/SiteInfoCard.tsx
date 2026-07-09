import * as React from "react";
import { useEffect } from "react";
import { Link, MessageBar, MessageBarType, Spinner, Text } from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";

import { RequestStatus } from "../../../enums/RequestStatus";
import { AppDispatch, RootState } from "../../../redux/Store";
import { setSiteError, setSiteInfo, setSiteLoading } from "../../../redux/SiteSlice";
import { SharePointService } from "../../../services/SharePointService";
import styles from "./M365Dashboard.module.scss";

/**
 * DESCRIPTION
 *   Loads title and URL of the current SharePoint site independently and
 *   dispatches the result into the "site" Redux slice.
 **/
export const SiteInfoCard: React.FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const siteState = useSelector((state: RootState) => state.site);

    useEffect(() => {
        loadSiteInfo().catch(() => {
            // Errors are already handled and stored inside loadSiteInfo.
        });
    }, []);

    async function loadSiteInfo(): Promise<void> {
        dispatch(setSiteLoading());

        try {
            const info = await SharePointService.getSiteInfo();
            dispatch(setSiteInfo(info));
        } catch (error) {
            dispatch(setSiteError(`Site-Informationen konnten nicht geladen werden: ${(error as Error).message}`));
        }
    }

    if (siteState.Status === RequestStatus.NOT_STARTED || siteState.Status === RequestStatus.LOADING) {
        return (
            <div className={styles.card}>
                <Spinner label="Site-Informationen werden geladen..." />
            </div>
        );
    }

    if (siteState.Status === RequestStatus.FAILED) {
        return (
            <div className={styles.card}>
                <MessageBar messageBarType={MessageBarType.error}>{siteState.ErrorMessage}</MessageBar>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>Site</div>
            <Text variant="mediumPlus">{siteState.Info?.Title}</Text>
            <div className={styles.cardDetailRow}>
                <Link href={siteState.Info?.Url} target="_blank">
                    {siteState.Info?.Url}
                </Link>
            </div>
        </div>
    );
};
