import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RequestStatus } from "../enums/RequestStatus";
import { ISpList } from "../interfaces/ISpList";
import { ILibrariesState } from "../stateModels/ILibrariesState";

const initialState: ILibrariesState = {
    Items: [],
    Status: RequestStatus.NOT_STARTED,
    ErrorMessage: null
};

const librariesSlice = createSlice({
    name: "libraries",
    initialState,
    reducers: {
        setLibrariesLoading(state) {
            state.Status = RequestStatus.LOADING;
            state.ErrorMessage = null;
        },
        setLibraries(state, action: PayloadAction<ISpList[]>) {
            state.Items = action.payload;
            state.Status = RequestStatus.SUCCEEDED;
        },
        setLibrariesError(state, action: PayloadAction<string>) {
            state.ErrorMessage = action.payload;
            state.Status = RequestStatus.FAILED;
        }
    }
});

export const { setLibrariesLoading, setLibraries, setLibrariesError } = librariesSlice.actions;
export default librariesSlice.reducer;
