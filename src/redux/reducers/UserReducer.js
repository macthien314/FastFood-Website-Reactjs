
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: { 
    userList: [],
    query:''
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
      const { id, username, email,password, role } = action.payload;
      const existingUser = state.userList.find((user) => user.id === id);
      if(existingUser) {
        existingUser.username = username;
        existingUser.email = email;
        existingUser.password = password;
        existingUser.role = role;
      }
    },
    userDeleted(state, action) {
      // state = state.categoryList.filter(i => i.id !== action.payload)
      // return state
    
    },
    
  },
});

export const {getUser, setUser,setQuery,addUser,updateUser,userDeleted} = userSlice.actions;
export default userSlice.reducer;
