import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  ReactNode,
  Dispatch,
} from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
}

interface ShoppingCartState {
  items: Product[];
}

type Action =
    | { type: "ADD_TO_CART"; payload: Product }
    | { type: "INCREASE_QUANTITY"; payload: number }
    | { type: "DECREASE_QUANTITY"; payload: number }
    | { type: "REMOVE_ITEM"; payload: number };

interface ShoppingCartContextType {
  state: ShoppingCartState;
  dispatch: Dispatch<Action>;
  increaseQuantity: (productId: number) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
    undefined
);

const initialState: ShoppingCartState = {
  items: [],
};

const shoppingCartReducer = (state: ShoppingCartState, action: Action) => {
  let existingItem = null ;
  switch (action.type) {
    case "ADD_TO_CART":
       existingItem = state.items.find(
          (item) => item.id === action.payload.id
      );

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
        const newItem: Product = {
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

interface ShoppingCartProviderProps {
  children: ReactNode;
}

const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
                                                                     children,
                                                                   }) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

  const increaseQuantity = useCallback(
      (productId: number) => {
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

const useShoppingCart = (): ShoppingCartContextType => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
        "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

export { ShoppingCartProvider, useShoppingCart, ShoppingCartContext };
