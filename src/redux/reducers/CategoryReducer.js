
import * as ACTION from '../constants/constants';
// const stateDefault = {
//     categoryList: [],
//     // loading: true,
//     // searchContent: '',

// }
// // export const getCategory = ()=>({
// //     type:  ACTION.GET_CATEGORY
// // })
// const CategoryReducer = (state = stateDefault, action) => {
//     switch (action.type) {
//         case ACTION.GET_CATEGORY: {
//             return { ...state,  categoryList: [ {...action.payLoad} ] }
//         }
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


// export default CategoryReducer;



import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: { categoryList: []},

  reducers: {
    getCategory() {},
    setCategory:(state, action)=>({
        ...state,
        categoryList : action.payload
    })
  },
});

export const {getCategory, setCategory} = categorySlice.actions;
export default categorySlice.reducer;