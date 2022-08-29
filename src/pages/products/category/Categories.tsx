import React, {useEffect, useState} from 'react';
import {
    Link,
    useParams
} from 'react-router-dom';
import {AppDispatchType, useAppSelector} from "../../../bll/store";
import Search from "../../../components/search/Search";
import {useDispatch} from "react-redux";
import {fetchGroups, fetchProducts} from "../../../bll/productsReducer";
import {Checkbox, LinearProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import FolderIcon from '@mui/icons-material/Folder';


const Categories: React.FC = () => {
    const [open, setOpen] = useState(false)
    const {id} = useParams()
    const img = false
    const groups = useAppSelector(state => state.products.groups)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(fetchGroups(id))
    }, [id])

    useEffect(() => {

    }, [id])


    return (
        <div className='content'>
            <div className="content__top">
                <button className='button' onClick={() => setOpen(true)}>Добавить</button>
                <Search/>
            </div>
            <div className="content__list">
                <div className={img ? 'content__captions img' : 'content__captions'}>
                    <div className="content__caption">Наименование группы</div>
                    <div className="content__caption">Опубликованно</div>
                    <div className="content__caption">Редактировать</div>
                    <div className="content__caption">Удалить</div>
                </div>
                {status === 'loading'
                    ? <div className='content__message'>Загрузка...</div>
                    : groups.length === 0
                        ? <div className='content__message'>Таблица пустая </div>
                        : groups.map(el => {
                            return (
                                <div className={img ? 'content__item img' : 'content__item'}
                                     key={el.Ref_Key}>
                                    <Link className='content__link'
                                          to={`/${id}/${el.Ref_Key}`}>
                                        <IconButton sx={{padding: '5px', marginRight: '10px'}}>
                                            <FolderIcon/>
                                        </IconButton>
                                        {el.Description}</Link>
                                    <div className='content__public content__col'>
                                        <Checkbox sx={{padding: '5px'}} color="success"/>
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

            {/*            <CategoryModal open={open} setOpen={setOpen} sectionId={id!}
                           setRender={setRender} render={render}/>*/}
        </div>
    );
};

export default Categories;