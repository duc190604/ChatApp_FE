import { createSlice } from "@reduxjs/toolkit";
export interface AuthState {
    user: {
      id: string;
    username: string;
    email: string;
    avatar: string;
    description?: string;
    userBlocked?: string[];
    chatBlocked?: string[];
    lastSeen?: string;
    }
    accessToken: string;
    refreshToken: string;
}
const initialState: AuthState = {
    user: {
        id: "",
        username: "",
        email: "",
        avatar: "",
        description: "",
    },
    accessToken: "",
    refreshToken: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        setSession: (state, action) => {
            state.user = { id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                avatar: action.payload.avatar,
                description: action.payload.description,
                userBlocked: action.payload.userBlocked,
                chatBlocked: action.payload.chatBlocked,
                lastSeen: action.payload.lastSeen
            };
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
            state = initialState;
        },
    },
});
export const { setUser, setAccessToken, setRefreshToken, setSession, logout } = authSlice.actions;
export default authSlice.reducer;

