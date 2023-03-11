
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    isLoggedIn: false,
    logging: false,
    currentUser:undefined
  },

  reducers: {
    getAuth() {},
    setAuth:(state, action)=>({
        ...state,
        currentUser : action.payload
    }),
   login: (state, action) =>{
   },
   loginSuccess: (state, action) =>{
    state.isLoggedIn = true;
    state.logging = false;
    state.currentUser = action.payload;

   },
   loginFail: (state, action) =>{
    state.logging = false;
    state.isLoggedIn = false;

   },

   logout: (state) =>{
    state.isLoggedIn = false;
    state.currentUser = undefined;
   },
   registerSuccess: (state, action) =>({
    ...state,
    ...action.payload,
   }),

   forgotPassword: (state, action) =>({
    
   }),

   resetPassword: (state, action) =>({
    
   }),
  
  },
});
//selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;

export const {login, loginSuccess, loginFail, logout,getAuth,setAuth,registerSuccess,forgotPassword,resetPassword} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;