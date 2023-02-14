
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: { categoryList: [] },

  reducers: {
    getCategory() { },

    setCategory: (state, action) => ({
      ...state,
      categoryList: action.payload
    }),
    addCategory: (state, action) => {
      console.log('action.payload',action.payload)
      // state.categoryList.push(action.payload)
    },
    updateCategory: (state, action) => {
      console.log(' action.payload', action.payload)
      const { id, name } = action.payload;
      const existingCategory = state.categoryList.find((category) => category.id === id);
      if(existingCategory) {
        existingCategory.name = name;
      }
    },
    categoryDeleted(state, action) {
      // state = state.categoryList.filter(i => i.id !== action.payload)
      // return state
    
    },
  },
});

export const { getCategory, setCategory, addCategory, updateCategory,categoryDeleted } = categorySlice.actions;
export default categorySlice.reducer;