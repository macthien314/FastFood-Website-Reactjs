
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
    addProduct: (state, action) => ({
      // ...state,
      // productList: [...state.productList, ...action.payload]

    }),
    setQuery: (state, action) => ({
      ...state,
      productList: action.payload
    })
  },
});

export const { getProduct, setProduct, setQuery, addProduct } = productSlice.actions;
export default productSlice.reducer;
