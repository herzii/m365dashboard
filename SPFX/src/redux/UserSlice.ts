import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RequestStatus } from "../enums/RequestStatus";
import { IUserProfile } from "../interfaces/IUserProfile";
import { IUserState } from "../stateModels/IUserState";

const initialState: IUserState = {
    Profile: null,
    Status: RequestStatus.NOT_STARTED,
    ErrorMessage: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLoading(state) {
            state.Status = RequestStatus.LOADING;
            state.ErrorMessage = null;
        },
        setUserProfile(state, action: PayloadAction<IUserProfile>) {
            state.Profile = action.payload;
            state.Status = RequestStatus.SUCCEEDED;
        },
        setUserError(state, action: PayloadAction<string>) {
            state.ErrorMessage = action.payload;
            state.Status = RequestStatus.FAILED;
        }
    }
});

export const { setUserLoading, setUserProfile, setUserError } = userSlice.actions;
export default userSlice.reducer;
