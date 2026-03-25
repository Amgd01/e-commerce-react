import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addToCart: (state, action) => {
            console.log("Adding to cart:", action.payload);
            const product = action.payload;
            const existingItem = state.cartItems.find(item => item.id === product.id);

            if(existingItem){
                existingItem.quantity += 1;
            } else{
                state.cartItems.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;