import {Route, Routes} from "react-router-dom";
import React from "react";
import Header from "./components/header/Header";
import Main from "./pages/main/Main";
import ProductsPage from "./pages/products/ProductsPage";
import {useAppSelector} from "./store/store";
import Login from "./pages/login/Login";
import {CircularProgress} from "@mui/material";

function App() {
   const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)


   return (
      <div className="App">
         {isLoggedIn
            ? <>
               <Header/>
               <Routes>
                  <Route path="/" element={<Main/>}/>
                  <Route path="products/*" element={<ProductsPage/>}/>
               </Routes>
            </>
            : <Login/>
         }
      </div>
   )
}

export default App;
