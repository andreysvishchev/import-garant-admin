import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import ProductsPage from "./pages/products/ProductsPage";
import {useAppSelector} from "./store/store";
import Login from "./pages/login/Login";

function App() {
   const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
   const navigate = useNavigate()
   const location = useLocation()

   useEffect(() => {
      if (isLoggedIn) {
         if (location.pathname !== '/' || '') {
            navigate(location.pathname)
         } else {
            navigate('/admin')
         }
      }
   }, [isLoggedIn])

   return (
      <div className="App">
         {isLoggedIn
            ? <>
               {/*<Header/>*/}
               <Routes>
                  {/*<Route path="/" element={<Main/>}/>*/}
                  <Route path="admin/*" element={<ProductsPage/>}/>
               </Routes>
            </>
            : <Login/>
         }
      </div>
   )
}

export default App;
