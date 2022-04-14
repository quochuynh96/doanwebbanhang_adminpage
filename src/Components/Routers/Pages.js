import ProductManagement from "./../Pages/ProductManagement/ProductManagement";

import Dashboard from "./../Pages/Dashboard/Dashboard";
import CategoryManagement from "../Pages/CategoriesManagement/CategoryManagement";
import BrandsManagement from "./../Pages/BrandsManagement/BrandsManagement";
import OrdersManagement from "./../Pages/OrdersManagement/OrdersManagement";
import UsersManagement from "../Pages/UsersManagement/UsersManagement";
import EventsManagement from "../Pages/EventsManagement/EventsManagement";
import RateStatisticals from "./../Pages/StatisticalsManagement/RateStatisticals";
import ProductStatisticals from "../Pages/StatisticalsManagement/ProductStatisticals";
import CustomerStatisticals from "./../Pages/StatisticalsManagement/CustomerStatisticals";
import TurnoverStatisticals from "./../Pages/StatisticalsManagement/TurnoverStatisticals";
import Profile from "./../Pages/Profile/Profile";
import { Navigate } from "react-router-dom";
import SupplierManagement from "../Pages/SupplierManagement/SupplierManagement";
import ReceiptManagement from "../Pages/ReceiptsManagement/ReceiptsManagement";

const pages = [
  {
    path: "/",
    element: <Navigate to="/dashboard"></Navigate>,
    exact: false,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    exact: false,
  },
  {
    path: "/product-management",
    element: <ProductManagement />,
    exact: false,
  },

  {
    path: "/category-management",
    element: <CategoryManagement />,
    exact: false,
  },
  {
    path: "/supplier-management",
    element: <SupplierManagement />,
    exact: false,
  },
  {
    path: "/brand-management",
    element: <BrandsManagement />,
    exact: false,
  },
  {
    path: "/order-management",
    element: <OrdersManagement />,
    exact: false,
  },
  {
    path: "/receipt-management",
    element: <ReceiptManagement />,
    exact: false,
  },
  {
    path: "/user-management",
    element: <UsersManagement />,
    exact: false,
  },
  {
    path: "/event-management",
    element: <EventsManagement />,
    exact: false,
  },
  {
    path: "/statistical-management/rate",
    element: <RateStatisticals />,
    exact: false,
  },
  {
    path: "/statistical-management/product",
    element: <ProductStatisticals />,
    exact: false,
  },
  {
    path: "/statistical-management/turnover",
    element: <TurnoverStatisticals />,
    exact: false,
  },
  {
    path: "/statistical-management/customer",
    element: <CustomerStatisticals />,
    exact: false,
  },
  {
    path: "/profile",
    element: <Profile />,
    exact: false,
  },
];

export default pages;
