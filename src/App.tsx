import Header from "./components/Header";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Button, Container} from "@mui/material";
import Product from "./components/Product";


function App() {
    const data = [
        {
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


    return (
        <div className="App">
            <Header/>
            <Container maxWidth="xl">
                <Tabs>
                    <div className="aside">
                        <TabList>
                            {
                                data.map(el => {
                                    return (
                                        <Tab>{el.name}</Tab>
                                    )
                                })
                            }
                        </TabList>
                        <Button sx={{width: '100%'}} variant="contained">Добавить продукцию</Button>
                    </div>


                    <div className="content">
                        {
                            data.map(el => {
                                return (
                                    <TabPanel>
                                        <div className="container">
                                            <div className='title'>{el.name}</div>
                                            <Product data={el}/>
                                        </div>

                                    </TabPanel>
                                )
                            })
                        }
                    </div>
                </Tabs>
            </Container>
        </div>
    );
}

export default App;
