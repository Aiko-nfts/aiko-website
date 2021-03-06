import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UiState {
  connectingWallet: boolean;
  showingArchives: boolean;
  showingStory: boolean;
  showingInfo: boolean;
}

const initialState: UiState = {
  connectingWallet: false,
  showingArchives: false,
  showingStory: false,
  showingInfo: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    connectWallet: (state) => {
      state.connectingWallet = true;
    },
    walletConnected: (state) => {
      state.connectingWallet = false;
    },
    setShowingArchives: (state, action: PayloadAction<boolean>) => {
      state.showingArchives = action.payload;
    },
    setShowingStory: (state, action: PayloadAction<boolean>) => {
      state.showingStory = action.payload;
    },
    setShowingInfo: (state, action: PayloadAction<boolean>) => {
      state.showingInfo = action.payload;
    },
  },
});

export const {
  connectWallet,
  walletConnected,
  setShowingArchives,
  setShowingStory,
  setShowingInfo,
} = uiSlice.actions;

export const selectConnectingWallet = (state: RootState) =>
  state.ui.connectingWallet;

export const selectShowingArchives = (state: RootState) =>
  state.ui.showingArchives;

export const selectShowingStory = (state: RootState) => state.ui.showingStory;

export const selectShowingInfo = (state: RootState) => state.ui.showingInfo;

export default uiSlice.reducer;
