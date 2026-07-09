import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RequestStatus } from "../enums/RequestStatus";
import { ISiteInfo } from "../interfaces/ISiteInfo";
import { ISiteState } from "../stateModels/ISiteState";

const initialState: ISiteState = {
    Info: null,
    Status: RequestStatus.NOT_STARTED,
    ErrorMessage: null
};

const siteSlice = createSlice({
    name: "site",
    initialState,
    reducers: {
        setSiteLoading(state) {
            state.Status = RequestStatus.LOADING;
            state.ErrorMessage = null;
        },
        setSiteInfo(state, action: PayloadAction<ISiteInfo>) {
            state.Info = action.payload;
            state.Status = RequestStatus.SUCCEEDED;
        },
        setSiteError(state, action: PayloadAction<string>) {
            state.ErrorMessage = action.payload;
            state.Status = RequestStatus.FAILED;
        }
    }
});

export const { setSiteLoading, setSiteInfo, setSiteError } = siteSlice.actions;
export default siteSlice.reducer;
