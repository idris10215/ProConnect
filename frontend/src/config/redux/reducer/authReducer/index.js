import { registerUser, loginUser } from "../../action/authAction";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    LoggedIn : false,
    message : "",
    profilefetched : false,
    connectiions: [],
    connectionRequests: []
}

const authSlice = createSlice( {
    name: "auth",
    initialState,
    reducers : {
        reset: () => initialState,
        handleLoginUser: (state) => {
            state.message = "hello"
        }
    },

    extraReducers: (builder) => {

        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.message = "knocking the door";
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.LoggedIn = true;
            state.message = "Login successful";
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;

        }
        )
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Registering user...";
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.LoggedIn = true;
            state.message = "Registration successful";
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export default authSlice.reducer;

