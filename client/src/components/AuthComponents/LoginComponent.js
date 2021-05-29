import Button from "../Button";
import React, {useState} from "react";
import {useHttp} from "../../hooks/http.hook"
import {login} from "../../redux/actions/auth"
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";


const storageName = 'userData';

function LoginComponent({toRegistration}){
    const dispatch = useDispatch()
    const {request} = useHttp()
    const [form, setForm] = useState({
        login: '', pass: ''
    })
    const history = useHistory()

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = (loginUser, password) => {
        request('/api/auth/login', 'POST', {username: loginUser, password: password})
            .then((data) => {
                localStorage.setItem(storageName, JSON.stringify({userId: data.userId, token: data.token}))
                dispatch(login({token: data.token, userId: data.userId, isAdmin: data.isAdmin}));
                history.push('/profile')

            })
            .catch((e) => console.log(e))
    }

    return(
        <div className="login-wrap">
            <h4 className="login-wrap__title">Войти</h4>
            <form className="form-login"
                  method="post"
                  id="login-form" autoComplete="off" noValidate="novalidate">
                <label className="form-login__field">
                    <span>Електронная почта</span>
                    <input onChange={changeHandler} name="login" type="text"></input>
                </label>
                <label className="form-login__field">
                    <span>Пароль</span>
                    <input onChange={changeHandler} name="pass" type="password"></input>
                </label>
                <div className="actions-wrap">
                    <Button onClick={() => loginHandler(form.login, form.pass)} >
                        Войти
                    </Button>
                    <a className="forgot-link"
                       href="">
                        <span>Забыли пароль?</span>
                    </a>
                </div>
                <div className="actions-wrap">
                    <Button onClick={toRegistration} className="registration-button" outline>
                        Регистрация
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default LoginComponent