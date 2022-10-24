import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatchType, useAppSelector} from "../../store/store";
import {appFetchData, changeErrorStatus} from "../../store/appReducer";
import axios from "axios";
import {baseDataLoading} from "../../store/productsReducer";


const Login = () => {
    
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
        if(login !== '' && password !== '') {
            const data = {
                login, password
            }
            const instance = axios.create({
                // baseURL: "/importgarant_ut/odata/standard.odata/",
                headers: {
                    'Authorization': "Basic " + window.btoa(unescape(encodeURIComponent(login + ':' + password))),
                },
            })
            dispatch(appFetchData(data.login, data.password, instance))
            dispatch(baseDataLoading())
        } else {
            dispatch(changeErrorStatus(true))
        }
    }


    return (
        <div className='login'>
            <form className='login__form' onSubmit={submitHandler} autoComplete={'on'}>
                {error && <div className='error'>Неверный логин или пароль</div>}
                <div className="input">
                    <div className="input__caption">Логин</div>
                    <input className='input__field' placeholder='Введите  лоигн' type="text" onChange={changeLogin}/>
                </div>
                <div className="input">
                    <div className="input__caption">Пароль</div>
                    <input autoComplete="on" className='input__field' placeholder='Введите пароль' type="password" onChange={changePassword}/>
                </div>
                <button style={{marginTop: '15px'}} type={'button'} disabled={buttonStatus === "loading"}
                        onClick={submitHandler} className={buttonStatus === 'loading' ? 'button load' : 'button'}>Вход
                </button>
            </form>
        </div>
    );
};


export default Login;