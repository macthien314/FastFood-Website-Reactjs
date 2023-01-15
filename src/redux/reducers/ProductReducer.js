
import * as ACTION from '../constants/constants';
// const stateDefault = {
//     productList: [],
//     // loading: true,
//     // searchContent: '',

// }
// // export const getProduct = ()=>({
// //     type:  ACTION.GET_PRODUCT
// // })
// const ProductReducer = (state = stateDefault, action) => {
//     switch (action.type) {
//         case ACTION.GET_PRODUCT: {
//             return { ...state, productList: [{...action.payLoad}] }}        
//         // case ACTION.ADD_POST: {
//         //     return {
//         //         ...state,
//         //         productList: [ ...state.productList, ...action.payload ]
//         //     }
//         // }
//         // case ACTION.SET_LOADING: {
//         //     return { ...state,  loading: action.payload }
//         // }
//         // case ACTION.SET_SEARCH_POST: {
//         //     return { ...state,  searchContent: action.payload }
//         // }

//         default:

//     }
//     return { ...state }





// }


// export default ProductReducer;


import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: { 
    productList: []
  },

  reducers: {
    getProduct() {},
    setProduct:(state, action)=>({
        ...state,
        productList : action.payload
    }),
    sortProduct:(state, action)=>({
      ...state,
      productList : action.payload
    })
  },
});

export const {getProduct, setProduct,sortProduct} = productSlice.actions;
export default productSlice.reducer;
