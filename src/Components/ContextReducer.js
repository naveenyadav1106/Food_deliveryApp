import React, { createContext, useContext, useReducer } from 'react'

const CartStateCtx = createContext();
const CartDispatchCtx = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return (
                [...state,
                {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price,
                    img: action.img
                }]
            )
        case 'REMOVE':
            return state.filter(item => item.id !== action.id);
        case 'UPDATE':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        qty: parseInt(action.qty) + parseInt(item.qty),
                        price: parseInt(action.price) + parseInt(item.price),
                    };
                } else {
                    return item;
                }
            });
        case 'DROP':
            let emptyArr = []
            return emptyArr;
        default:
            console.log("Error in reducer")
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchCtx.Provider value={dispatch}>
            <CartStateCtx.Provider value={state}>
                {children}
            </CartStateCtx.Provider>
        </CartDispatchCtx.Provider>
    )
}

export const useCart = () => useContext(CartStateCtx);
export const useDispatchCart = () => useContext(CartDispatchCtx);


