
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    query: ''
  },

  reducers: {
    getProduct() { },
    setProduct: (state, action) => ({
      ...state,
      productList: action.payload
    }),
    addProduct: (state, action) => (
  
      state.productList.push(action.payload)
      // ...state,
      // productList: [...state.productList, ...action.payload]
    

    ),
   
    updateProduct: (state, action) => {
      const { id, title } = action.payload;
      const existingCategory = state.productList.find((product) => product.id === id);
      if(existingCategory) {
        existingCategory.title = title;
      }
    },
    productDeleted(state, action) {
      // state = state.categoryList.filter(i => i.id !== action.payload)
      // return state
    
    },
  },
});

export const { getProduct, setProduct, setQuery, addProduct,updateProduct,productDeleted } = productSlice.actions;
export default productSlice.reducer;
