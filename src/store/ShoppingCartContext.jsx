import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";

const ShoppingCartContext = createContext();

const initialState = {
  items: [],
};

const shoppingCartReducer = (state, action) => {
  let existingItem = null;
  switch (action.type) {
    case "ADD_TO_CART":
      existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      } else {
        const newItem = {
          ...action.payload,
          quantity: action.payload.quantity || 1,
        };
        return {
          ...state,
          items: [...state.items, newItem],
        };
      }
    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

const ShoppingCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

  const increaseQuantity = useCallback(
    (productId) => {
      dispatch({
        type: "INCREASE_QUANTITY",
        payload: productId,
      });
    },
    [dispatch]
  );

  const value = useMemo(
    () => ({ state, dispatch, increaseQuantity }),
    [state, dispatch, increaseQuantity]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

export { ShoppingCartProvider, useShoppingCart };
