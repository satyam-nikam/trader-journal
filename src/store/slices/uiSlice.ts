import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  activeSidebarMenu: string | null;
}

const initialState: UIState = {
  activeSidebarMenu: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSidebarMenu: (state, action: PayloadAction<string | null>) => {
      state.activeSidebarMenu = action.payload;
    },
  },
});

export const { setActiveSidebarMenu } = uiSlice.actions;
export default uiSlice.reducer;