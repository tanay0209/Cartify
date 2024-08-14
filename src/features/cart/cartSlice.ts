import { Product } from '@/app/components/ProductCard';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface CartProduct extends Product {
    quantity: number;
}


const loadState = (): CartProduct[] => {
    try {
        const cart = localStorage.getItem('cart');
        if (cart === null) {
            return [];
        }
        return JSON.parse(cart);
    } catch (err) {
        return [];
    }
};

const saveState = (state: CartProduct[]) => {
    try {
        const cart = JSON.stringify(state);
        localStorage.setItem('cart', cart);
    } catch (err) {
        console.log(err);
    }
};

const initialState: CartProduct[] = loadState();

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartProduct>) => {
            const existingProduct = state.find(product => product.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            } else {
                state.push(action.payload);
            }
            saveState(state);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const newState = state.filter(product => product.id !== action.payload);
            saveState(newState);
            return newState;
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const product = state.find(product => product.id === action.payload.id);
            if (product) {
                product.quantity = action.payload.quantity;
                if (product.quantity === 0) {
                    return state.filter(product => product.id !== action.payload.id);
                }
            }
            saveState(state);
        },
        clearCart: () => {
            saveState([]);
            return [];
        }
    }
});


export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
