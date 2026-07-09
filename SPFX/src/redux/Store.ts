import { configureStore } from "@reduxjs/toolkit";

import groupsReducer from "./GroupsSlice";
import librariesReducer from "./LibrariesSlice";
import listsReducer from "./ListsSlice";
import siteReducer from "./SiteSlice";
import userReducer from "./UserSlice";

/**
 * DESCRIPTION
 *   Central Redux store of the application. Each domain (user, site, groups,
 *   lists, libraries) is represented by its own, independent state slice.
 *   There is intentionally no central bootstrap action - every component is
 *   responsible for loading and dispatching its own data.
 **/
export const store = configureStore({
    reducer: {
        user: userReducer,
        site: siteReducer,
        groups: groupsReducer,
        lists: listsReducer,
        libraries: librariesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
