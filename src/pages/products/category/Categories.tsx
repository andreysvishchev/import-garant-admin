import React, {useState} from 'react';
import {
    Link,
    useParams
} from 'react-router-dom';
import CategoryModal from "../../../components/Modal/CategoryModal";
import {useAppSelector} from "../../../bll/store";
import {Button} from "@mui/material";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Categories: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [render, setRender] = useState(true)
    const {id} = useParams()
    let state = useAppSelector(state => state.products)
    const index = state.findIndex(i => i.id === id)
    const img = false;

    return (
        <div className='content'>
            <Button onClick={() => setOpen(true)} variant="outlined">Добавить</Button>
            <div className="content__list">
                <div className={img ? 'content__captions img' : 'content__captions'}>
                    <div className="content__caption">Наименование группы</div>
                    <div className="content__caption">Опубликованно</div>
                    <div className="content__caption">Редактировать</div>
                    <div className="content__caption">Удалить</div>
                </div>
                {state[index].categories.map(el => {
                    return (
                        <div className={img ? 'content__item img' : 'content__item'}
                             key={el.id}>
                            <Link className='content__link'
                                  to={`/products/${id}/${el.id}`}>{el.name}</Link>
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

            <CategoryModal open={open} setOpen={setOpen} sectionId={id!}
                           setRender={setRender} render={render}/>
        </div>
    );
};

export default Categories;