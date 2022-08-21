import {Button} from '@mui/material';
import React from 'react';
import {
    Link,
    useParams,
} from "react-router-dom";
import {useAppSelector} from "../../../../bll/store";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Group: React.FC = () => {
    const {id, groupId} = useParams()
    const state = useAppSelector(state => state.products)
    const catIndex = state.findIndex(i => i.id === id)
    const groupIndex = state[catIndex].categories.findIndex(i => i.id === groupId)
    const img = true;
    return (
        <div className='content'>
            <div className="content__top">
                <Button variant="contained">
                    <Link className='content__back'
                          to={`/products/${id}`}>Назад</Link>
                </Button>
                <Button variant="outlined">
                    <Link className='content__button'
                          to={`/products/${id}/${groupId}/new`}>Добавить</Link>
                </Button>
            </div>
            <div
                className="content__title">{state[catIndex].categories[groupIndex].name}</div>

            <div className='content__list'>
                <div className={img ? 'content__captions img' : 'content__captions'}>
                    <div className="content__caption"></div>
                    <div className="content__caption">Наименование продукта</div>
                    <div className="content__caption">Опубликованно</div>
                    <div className="content__caption">Редактировать</div>
                    <div className="content__caption">Удалить</div>
                </div>
                {state[catIndex].categories[groupIndex].list.map(el => {
                    return (
                        <div className={img ? 'content__item img' : 'content__item'} key={el.id}>
                            <div className='content__img'>картинка товара</div>
                            <Link className='content__link'
                                  to={`/products/${id}/${groupId}/${el.id}`}>{el.name}</Link>
                            <div className='content__public content__col'>
                                <Checkbox sx={{padding: '5px'}}/>
                            </div>
                            <div className='content__edit content__col'>
                                <IconButton sx={{padding: '5px'}}>
                                    <EditIcon/>
                                </IconButton>
                            </div>
                            <div className='content__delete content__col'>
                                <IconButton sx={{padding: '5px'}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Group;