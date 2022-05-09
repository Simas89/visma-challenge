import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ViewMode {
  DATA,
  FORM,
}

interface AppState {
  viewMode: ViewMode;
  editItemId: string | null;
}

const initialState: AppState = {
  viewMode: ViewMode.DATA,
  editItemId: null,
};

export const slice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setEditItemId: (state, action: PayloadAction<string | null>) => {
      state.editItemId = action.payload;
    },
  },
});

export default slice.reducer;
