import {createSlice } from "@reduxjs/toolkit";

const initialState ={
    TicketAbi : null,
    TicketContractAddress : ""
}


const tokenReducer = createSlice({
    name : "tokenState",
    initialState,
    reducers : {
        updateAbi : (state,action) =>{
            console.log(action.payload)
            state.TicketAbi = action.payload.TicketAbi;
            state.TicketContractAddress = action.payload.TicketContractAddress
        }
    }

});

export const {updateAbi} = tokenReducer.actions;
export default tokenReducer.reducer;