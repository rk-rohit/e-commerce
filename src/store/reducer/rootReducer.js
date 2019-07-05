const defaultState = {
    "product_list": [
        {
            "id": "shop01",
            "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/M63H24W7JF0-L302-ALTGHOST?wid=1500&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
            "name": "CHECK PRINT SHIRT",
            "price": 110
        },
        {
            "id": "shop02",
            "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/FLGLO4FAL12-BEIBR?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
            "name": "GLORIA HIGH LOGO SNEAKER",
            "price": 91
        },
        {
            "id": "shop03",
            "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/HWVG6216060-TAN?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
            "name": "CATE RIGID BAG",
            "price": 94.5
        },
        {
            "id": "shop04",
            "imgUrl": "http://guesseu.scene7.com/is/image/GuessEU/WC0001FMSWC-G5?wid=520&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
            "name": "GUESS CONNECT WATCH",
            "price": 438.9
        },
        {
            "id": "shop05",
            "imgUrl": "https://guesseu.scene7.com/is/image/GuessEU/AW6308VIS03-SAP?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
            "name": "'70s RETRO GLAM KEFIAH",
            "price": 20
        }
    ],
    'cart_item': []
}

const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let alreadyExist = state.cart_item.find(item => item.id === action.id)
            const cart_item = alreadyExist ? state.cart_item : [...state.cart_item, { 'id': action.id, 'qty': 1 }];
            localStorage.setItem('cart_item', JSON.stringify(cart_item));
            return {
                ...state,
                cart_item: cart_item
            };
        case 'REMOVE_ITEM_CART':
            const filterItem = state.cart_item.filter(item => item.id !== action.id);
            localStorage.setItem('cart_item', JSON.stringify(filterItem));
            return {
                ...state,
                cart_item: filterItem
            };
        case 'INCREASE_QTY_CART':
            const increaseQtyItem = state.cart_item.map(item => {
                return item.id === action.id ? { 'id': item.id, 'qty': item.qty + 1 } : item
            });
            localStorage.setItem('cart_item', JSON.stringify(increaseQtyItem));
            return {
                ...state,
                cart_item: increaseQtyItem
            };
        case 'DECREASE_QTY_CART':
            const decreaseQtyItem = state.cart_item.map(item => {
                return item.id === action.id && item.qty > 1 ? { 'id': item.id, 'qty': item.qty - 1 } : item
            });
            localStorage.setItem('cart_item', JSON.stringify(decreaseQtyItem));
            return {
                ...state,
                cart_item: decreaseQtyItem
            };
        case 'CLEAR_CART':
            localStorage.removeItem('cart_item');
            return {
                ...state,
                cart_item: []
            }
        case 'LOCAL_STORAGE_TO_CART':
            let local_cart_item = localStorage.getItem('cart_item') ? JSON.parse(localStorage.getItem('cart_item')) : [];
            return {
                ...state,
                cart_item: local_cart_item
            }
        default:
            return state;
    }
}

export default rootReducer;