import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Header from "./components/header/Header";
import Main from "./pages/main/Main";
import ProductsPage from "./pages/products/ProductsPage";
import {AppDispatchType, useAppSelector} from "./store/store";
import {useDispatch} from "react-redux";
import {baseDataLoading} from "./store/productsReducer";
import {CircularProgress} from "@mui/material";
import {login} from "./store/appReducer";

function App() {
    const status = useAppSelector(state => state.app.appStatus)
    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(baseDataLoading())
    }, [])

    console.log(isLoggedIn)
    return (
        <div className="App">
            {
                !isLoggedIn ? <div onClick={() => dispatch(login(true))}>login</div>
                    :
                    status !== 'loading' ?
                        <>
                            <Header/>
                            <Routes>
                                <Route path="main" element={<Main/>}/>
                                <Route path="products/*" element={<ProductsPage/>}/>
                            </Routes>
                        </> :
                        <div className='preloader'>
                            <CircularProgress/>
                        </div>
            }
        </div>
    )
}

export default App;
