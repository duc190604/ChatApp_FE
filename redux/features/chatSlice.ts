import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        isEditMessage: false,
        messageId: "",
        content: "",

    },
    reducers: {
        setEditMessage: (state, action) => {
            console.log(action.payload)
            state.isEditMessage = action.payload.isEditMessage;
            state.messageId = action.payload.messageId;
            state.content = action.payload.content;
        },
        setMessageId: (state, action) => {
            state.messageId = action.payload;
        },
    },
});

export const { setEditMessage, setMessageId } = chatSlice.actions;
export default chatSlice.reducer;

