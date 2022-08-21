import {Route, Routes} from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Main from "./pages/main/Main";
import Products from "./pages/products/Products";



function App() {
    return (
        <div className="App">
            <Header/>

                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="products/*" element={<Products/>}/>
                    </Routes>

        </div>
    );
}

export default App;
