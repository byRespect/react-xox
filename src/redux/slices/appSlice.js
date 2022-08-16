import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    socket: io(import.meta.env.VITE_SOCKET_URL),
    winner: "",
    team: "",
    seq: 0,
    gameBoard: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  },
  reducers: {
    SetSocket: (state, action) => {
      state.socket = action.payload;
    },
    SetGameBoard: (state, action) => {
      state.gameBoard = action.payload;
    },
    ClearGameBoard: (state) => {
      state.gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
    },
    SetTeam: (state, action) => {
      state.team = action.payload;
    },
    SetSeq: (state, action) => {
      state.seq = action.payload;
    },
    SetWinner: (state, action) => {
      state.winner = action.payload;
    },
  },
});

export const {
  SetSocket,
  SetGameBoard,
  ClearGameBoard,
  SetTeam,
  SetSeq,
  SetWinner,
} = appSlice.actions;

export default appSlice.reducer;
