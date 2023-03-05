
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: { 
    userList: [],
    query:'',
    isSuccess: false
  },

  reducers: {
    getUser() {},
    setUser:(state, action)=>({
        ...state,
        userList : action.payload
    }),
    setQuery:(state, action)=>({
      ...state,
      userList : action.payload
    }),
    addUser: (state, action) => {
    },
    updateUser: (state, action) => {
    },
    userDeleted(state, action) {
    },
    checkSuccess: (state, action) => {
      state.isSuccess = true;

    },

    checkFail: (state, action) => {
      state.isSuccess = false;

    },
    
  },
});

export const {getUser, setUser,setQuery,addUser,updateUser,userDeleted,checkSuccess,checkFail} = userSlice.actions;
export default userSlice.reducer;
