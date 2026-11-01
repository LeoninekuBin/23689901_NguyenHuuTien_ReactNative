import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
}
const initialState: AuthState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // đăng nhập: lưu cả user và token vào store
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
    // đăng xuất: xoá hết về null -> isLoggedIn tự thành false
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;