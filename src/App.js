import "./App.scss";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import ERouter from "./Components/Routers/Routes";
import Login from "./Components/Layout/Login/Login";
import { getAllProducts } from "./Components/Modules/actions/products.actions";
import { useDispatch } from "react-redux";
import { getAllEvents } from "./Components/Modules/actions/events.actions";
import { getAllCategories } from "./Components/Modules/actions/categories.actions";
import { getAllUsers } from "./Components/Modules/actions/users.actions";
import { getAllBrands } from "./Components/Modules/actions/brands.actions";
import { getAllSuppliers } from "./Components/Modules/actions/suppliers.actions";

export const url = "https://tech-store-44eac-default-rtdb.firebaseio.com";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const loginHandle = () => {
    setIsLogin(true);
  };
  const logoutHandle = () => {
    localStorage.removeItem("useradmin");
    setIsLogin(false);
    window.location.reload();
  };

  const user = JSON.parse(localStorage.getItem("useradmin"));

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getAllProducts());
    // dispatch(getAllEvents());
    dispatch(getAllBrands());
    dispatch(getAllCategories());
    dispatch(getAllUsers());
    // dispatch(getAllSuppliers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLogin ? (
        <ERouter logoutHandle={logoutHandle} />
      ) : (
        <Login loginHandle={loginHandle} />
      )}
    </>
  );
}

export default App;
