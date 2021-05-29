import React, {useState} from 'react';
import Button from "../Button";
import {useDispatch} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {login} from "../../redux/actions/auth";

const storageName = 'userData';
function RegistrationComponent({toLogin}) {

    const dispatch = useDispatch()
    const {request} = useHttp()
    const [form, setForm] = useState({
        login: '', password: '', password2: '', phoneNumber: '',
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {
                username: form.login,
                password: form.password,
                password2: form.password2,
                phone: form.phoneNumber
            })
            localStorage.setItem(storageName, JSON.stringify({userId: data.userId, token: data.token}))
            dispatch(login({token: data.token, userId: data.userId}));
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="login-wrap">
            <h4 className="login-wrap__title">Зарегистрироваться</h4>
            <form className="form-login"
                  method="post"
                  id="login-form" autoComplete="off" noValidate="novalidate">
                <label className="form-login__field">
                    <span>Електронная почта</span>
                    <input onChange={changeHandler} name="login" type="text"></input>
                </label>
                <label className="form-login__field">
                    <span>Номер телефона</span>
                    <input onChange={changeHandler} name="phoneNumber" type="phone"></input>
                </label>
                <label className="form-login__field">
                    <span>Пароль</span>
                    <input onChange={changeHandler} name="password" type="password"></input>
                </label>
                <label className="form-login__field">
                    <span>Пароль еще раз</span>
                    <input onChange={changeHandler} name="password2" type="password"></input>
                </label>
                <div className="actions-wrap">
                    <Button onClick={registerHandler} className="registration-button" outline>
                        Зарегистрироватся
                    </Button>
                </div>
                <div className="actions-wrap">
                    <span className="to-login" onClick={toLogin}>
                        У меня уже есть аккаунт
                    </span>
                </div>
            </form>
        </div>
    )
}

export default RegistrationComponent