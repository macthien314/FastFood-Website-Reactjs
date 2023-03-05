
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
      // state.categoryList.push(action.payload)
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload;
      const existingCategory = state.categoryList.find((category) => category.id === id);
      if(existingCategory) {
        existingCategory.name = name;
      }
    },
    categoryDeleted(state, action) {
 
    
    },
  },
});

export const { getCategory, setCategory, addCategory, updateCategory,categoryDeleted } = categorySlice.actions;
export default categorySlice.reducer;