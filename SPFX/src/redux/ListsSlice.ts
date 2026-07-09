import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RequestStatus } from "../enums/RequestStatus";
import { ISpList } from "../interfaces/ISpList";
import { IListsState } from "../stateModels/IListsState";

const initialState: IListsState = {
    Items: [],
    Status: RequestStatus.NOT_STARTED,
    ErrorMessage: null
};

const listsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        setListsLoading(state) {
            state.Status = RequestStatus.LOADING;
            state.ErrorMessage = null;
        },
        setLists(state, action: PayloadAction<ISpList[]>) {
            state.Items = action.payload;
            state.Status = RequestStatus.SUCCEEDED;
        },
        setListsError(state, action: PayloadAction<string>) {
            state.ErrorMessage = action.payload;
            state.Status = RequestStatus.FAILED;
        }
    }
});

export const { setListsLoading, setLists, setListsError } = listsSlice.actions;
export default listsSlice.reducer;
