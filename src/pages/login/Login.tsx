import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatchType, store, useAppSelector} from "../../store/store";
import {appFetchData, changeErrorStatus} from "../../store/appReducer";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import {baseDataLoading} from "../../store/productsReducer";

type PropsType = {};

const Login: React.FC<PropsType> = ({}) => {
    const error = useAppSelector(state => state.app.error)
    const buttonStatus = useAppSelector(state => state.app.buttonStatus)
    const dispatch = useDispatch<AppDispatchType>()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.currentTarget.value)
        dispatch(changeErrorStatus(false))

    }
    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        dispatch(changeErrorStatus(false))
    }
    const submitHandler = () => {
        const data = {
            login, password
        }
        const instance = axios.create({
            baseURL: "/importgarant_ut/odata/standard.odata/",
            headers: {
                // 'Authorization': "Basic " + window.btoa(login + ':' + password),
                'Authorization': "Basic " + window.btoa(unescape(encodeURIComponent(login + ':' + password))),
            },
        })
        dispatch(appFetchData(data.login, data.password, instance))
        dispatch(baseDataLoading())
    }


    return (
        <div className='login'>
            <form className='login__form' onSubmit={submitHandler} autoComplete={'on'}>
                {error && <div className='error'>Неверный логин или пароль</div>}
                <div className="input">
                    <div className="input__caption">Логин</div>
                    <input className='input__field' type="text" onChange={changeLogin}/>
                </div>
                <div className="input">
                    <div className="input__caption">Пароль</div>
                    <input className='input__field' type="password" onChange={changePassword}/>
                </div>
                <button style={{marginTop: '15px'}} type={'button'} disabled={buttonStatus === "loading"}
                        onClick={submitHandler}
                        className={buttonStatus === 'loading' ? 'button load' : 'button'}>Вход
                </button>
            </form>
        </div>
    );
};


export default Login;