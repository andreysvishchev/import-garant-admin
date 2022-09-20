import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Header from "./components/header/Header";
import Main from "./pages/main/Main";
import ProductsPage from "./pages/products/ProductsPage";
import {AppDispatchType, useAppSelector} from "./store/store";
import {useDispatch} from "react-redux";
import {baseDataLoading} from "./store/productsReducer";
import {CircularProgress} from "@mui/material";
import CategoryPage from "./pages/products/category-page/CategoryPage";


function App() {
    const status = useAppSelector(state => state.app.appStatus)
    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(baseDataLoading())
    }, [])

    return status !== 'loading' ? (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/main" element={<Main/>}/>
                <Route path="/*" element={<ProductsPage/>}/>
            </Routes>
        </div>
    ) : <div className='preloader'>
        <CircularProgress/>
    </div>;
}

export default App;
