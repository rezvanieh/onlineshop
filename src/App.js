import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ShoppingCartProvider } from "./store/ShoppingCartContext.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ShoppingCartPage from "./pages/ShoppingCartPage.jsx";
import UserDetails from "./pages/UserDetailsPage.jsx";
import RootLayout from "./pages/Root.js";
import Error from "./pages/Error.jsx";

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
