
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    count: 0
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

    countProduct: (state, action) => (

      {
        ...state,
        count: action.payload
      }
    ),


    updateProduct: (state, action) => {
      const { id } = action.payload;
      const existingProductIndex = state.productList.findIndex((product) => product.id === id);
      if (existingProductIndex !== -1) {
        const updatedProductList = [...state.productList];
        updatedProductList[existingProductIndex] = action.payload;
        return {
          ...state,
          productList: updatedProductList,
        };
      }
      return state;
    },
    productDeleted(state, action) {
      // state = state.categoryList.filter(i => i.id !== action.payload)
      // return state

    },
  },
});

export const { getProduct, setProduct, setQuery, addProduct, updateProduct, productDeleted,countProduct } = productSlice.actions;
export default productSlice.reducer;
