import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div className="text-center py-20">Global Error Boundary!</div>,
    children: [
      {
        index: true,
        element: <ProductsList />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "*",
        element: <div className="text-center py-20">404 - Not Found</div>,
      },
    ],
  },
]);

export default function App() {
  
  return <RouterProvider router={router} />;
}