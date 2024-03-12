const initialState = {
  items: [],
  addedProducts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload;
      return {
        ...state,
        items: [...state.items, newItem],
        addedProducts: [...state.addedProducts, newItem.id], // Добавляем id товара в массив добавленных товаров
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        addedProducts: state.addedProducts.filter(id => id !== action.payload), // Удаляем id товара из массива добавленных товаров
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
