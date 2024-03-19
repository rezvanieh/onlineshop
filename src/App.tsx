import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ShoppingCartProvider } from "./store/ShoppingCartContext";
import ProductsPage from "./pages/ProductsPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import UserDetails from "./pages/UserDetailsPage";
import RootLayout from "./pages/Root.js";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <ProductsPage /> },
      { path: "/cart", element: <ShoppingCartPage /> },
      { path: "/users/1", element: <UserDetails /> },
    ],
  },
]);

const App = () => {
  return (
    <ShoppingCartProvider>
      <RouterProvider router={router} />
    </ShoppingCartProvider>
  );
};
export default App;
