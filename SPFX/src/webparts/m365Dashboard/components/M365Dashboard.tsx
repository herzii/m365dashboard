import * as React from "react";
import { Stack, Text } from "@fluentui/react";
import { Provider } from "react-redux";

import { store } from "../../../redux/Store";
import { LibrariesCard } from "./LibrariesCard";
import styles from "./M365Dashboard.module.scss";
import { ListsCard } from "./ListsCard";
import { SiteInfoCard } from "./SiteInfoCard";
import { UserGroupsCard } from "./UserGroupsCard";
import { UserProfileCard } from "./UserProfileCard";

/**
 * DESCRIPTION
 *   Root component of the M365 Dashboard web part. Provides the central
 *   Redux store to all child components. Every card component loads and
 *   dispatches its own data - there is no central bootstrap loading here.
 **/
export const M365Dashboard: React.FunctionComponent = () => {
    return (
        <Provider store={store}>
            <Stack tokens={{ childrenGap: 16 }} className={styles.m365Dashboard}>
                <Text variant="xLarge">M365 Dashboard</Text>

                <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
                    <UserProfileCard />
                    <SiteInfoCard />
                    <UserGroupsCard />
                </Stack>

                <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
                    <ListsCard />
                    <LibrariesCard />
                </Stack>
            </Stack>
        </Provider>
    );
};
