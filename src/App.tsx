import Header from "./components/Header";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Button, Container} from "@mui/material";
import Product from "./components/Product";
import {Link, Route, Routes, useNavigate} from "react-router-dom";


function App() {
    const data = [
        {
            id: '1',
            name: 'Мясная продукция',
            categories: [
                {
                    name: 'Вареные колбасные изделия',
                    list: [
                        {
                            name: '"Березинская по-Волковысски классик" (газ)',
                            term: '25/6 суток',
                            weight: '7,5-8',
                        },
                        {
                            name: '"Докторская" категории А ГОСТ, в/с',
                            term: '60 суток ',
                            weight: '10',
                        },
                        {
                            name: '"Докторская по-Волковысски", в/с',
                            term: '60 суток',
                            weight: '10',
                        },
                    ]
                },
                {
                    name: 'сосиски, сардельки (газ по 2,5 кг)',
                    list: [
                        {
                            name: '"Березинская по-Волковысски классик" (газ)',
                            term: '25/6 суток',
                            weight: '7,5-8',
                        },
                        {
                            name: '"Докторская" категории А ГОСТ, в/с',
                            term: '60 суток ',
                            weight: '10',
                        },
                        {
                            name: '"Докторская по-Волковысски", в/с',
                            term: '60 суток',
                            weight: '10',
                        },
                    ]
                }
            ]
        },
        {
            id: '2',
            name: 'Молочная продукция',
            categories: [
                {
                    name: 'Вареные колбасные изделия',
                    list: [
                        {
                            name: '"Березинская по-Волковысски классик" (газ)',
                            term: '25/6 суток',
                            weight: '7,5-8',
                        },
                        {
                            name: '"Докторская" категории А ГОСТ, в/с',
                            term: '60 суток ',
                            weight: '10',
                        },
                        {
                            name: '"Докторская по-Волковысски", в/с',
                            term: '60 суток',
                            weight: '10',
                        },
                    ]
                }
            ]
        },
        {
            id: '3',
            name: 'Детское Питание',
            categories: [
                {
                    name: 'Вареные колбасные изделия',
                    list: [
                        {
                            name: '"Березинская по-Волковысски классик" (газ)',
                            term: '25/6 суток',
                            weight: '7,5-8',
                        },
                        {
                            name: '"Докторская" категории А ГОСТ, в/с',
                            term: '60 суток ',
                            weight: '10',
                        },
                        {
                            name: '"Докторская по-Волковысски", в/с',
                            term: '60 суток',
                            weight: '10',
                        },
                    ]
                }
            ]
        },
        {
            id: '4',
            name: 'Продукция в замарозке',
            categories: [
                {
                    name: 'Вареные колбасные изделия',
                    list: [
                        {
                            name: '"Березинская по-Волковысски классик" (газ)',
                            term: '25/6 суток',
                            weight: '7,5-8',
                        },
                        {
                            name: '"Докторская" категории А ГОСТ, в/с',
                            term: '60 суток ',
                            weight: '10',
                        },
                        {
                            name: '"Докторская по-Волковысски", в/с',
                            term: '60 суток',
                            weight: '10',
                        },
                    ]
                }
            ]
        },
        {
            id: '5',
            name: 'Напитки',
            categories: [
                {
                    name: 'Вареные колбасные изделия',
                    list: [
                        {
                            name: '"Березинская по-Волковысски классик" (газ)',
                            term: '25/6 суток',
                            weight: '7,5-8',
                        },
                        {
                            name: '"Докторская" категории А ГОСТ, в/с',
                            term: '60 суток ',
                            weight: '10',
                        },
                        {
                            name: '"Докторская по-Волковысски", в/с',
                            term: '60 суток',
                            weight: '10',
                        },
                    ]
                }
            ]
        },
        {
            id: '6',
            name: 'Фрукты',
            categories: [
                {
                    name: 'Вареные колбасные изделия',
                    list: [
                        {
                            name: '"Березинская по-Волковысски классик" (газ)',
                            term: '25/6 суток',
                            weight: '7,5-8',
                        },
                        {
                            name: '"Докторская" категории А ГОСТ, в/с',
                            term: '60 суток ',
                            weight: '10',
                        },
                        {
                            name: '"Докторская по-Волковысски", в/с',
                            term: '60 суток',
                            weight: '10',
                        },
                    ]
                }
            ]
        },
        {
            id: '7',
            name: 'Овощи',
            categories: [
                {
                    name: 'Вареные колбасные изделия',
                    list: [
                        {
                            name: '"Березинская по-Волковысски классик" (газ)',
                            term: '25/6 суток',
                            weight: '7,5-8',
                        },
                        {
                            name: '"Докторская" категории А ГОСТ, в/с',
                            term: '60 суток ',
                            weight: '10',
                        },
                        {
                            name: '"Докторская по-Волковысски", в/с',
                            term: '60 суток',
                            weight: '10',
                        },
                    ]
                }
            ]
        },
        {
            id: '8',
            name: 'Орехи',
            categories: [
                {
                    name: 'Вареные колбасные изделия',
                    list: [
                        {
                            name: '"Березинская по-Волковысски классик" (газ)',
                            term: '25/6 суток',
                            weight: '7,5-8',
                        },
                        {
                            name: '"Докторская" категории А ГОСТ, в/с',
                            term: '60 суток ',
                            weight: '10',
                        },
                        {
                            name: '"Докторская по-Волковысски", в/с',
                            term: '60 суток',
                            weight: '10',
                        },
                    ]
                }
            ]
        },

    ]

    const navigate = useNavigate();

    const getCardsHandler = (name: string, id: string) => {
            navigate('/product', {
                state: {
                    packName: name,
                    id,
                },
            });

    };

    return (
        <div className="App">
            <Header/>
            <Container maxWidth="xl">
                <div className="nav">
                    {data.map(el => {
                        return (
                         <div onClick={()=>getCardsHandler(el.name, el.id)}>{el.name}</div>
                        )
                    })}
                </div>
                <div>
                    <Routes>

                        <Route path="product" element={<Product data={data[0]} />} />


                    </Routes></div>
            </Container>
        </div>
    );
}

export default App;
