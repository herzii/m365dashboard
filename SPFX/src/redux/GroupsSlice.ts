import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RequestStatus } from "../enums/RequestStatus";
import { IUserGroup } from "../interfaces/IUserGroup";
import { IGroupsState } from "../stateModels/IGroupsState";

const initialState: IGroupsState = {
    Items: [],
    Status: RequestStatus.NOT_STARTED,
    ErrorMessage: null
};

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroupsLoading(state) {
            state.Status = RequestStatus.LOADING;
            state.ErrorMessage = null;
        },
        setGroups(state, action: PayloadAction<IUserGroup[]>) {
            state.Items = action.payload;
            state.Status = RequestStatus.SUCCEEDED;
        },
        setGroupsError(state, action: PayloadAction<string>) {
            state.ErrorMessage = action.payload;
            state.Status = RequestStatus.FAILED;
        }
    }
});

export const { setGroupsLoading, setGroups, setGroupsError } = groupsSlice.actions;
export default groupsSlice.reducer;
