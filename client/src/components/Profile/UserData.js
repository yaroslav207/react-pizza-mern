import React, {useEffect, useState} from "react"
import Button from "../Button";
import {useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";

const UserData = () => {
    const {request} = useHttp();
    const token = useSelector(({auth}) => auth.token);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        sex: '',
        birthDate: '',
        address: []

    })
    const [addressForm, setAddressForm] = useState({
        sity: '',
        street: '',
        number: '',
        numberApartment: '',
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const changeHandlerAddress = (event) => {
        setAddressForm({...addressForm, [event.target.name]: event.target.value})
    }

    const changeUserData = () => {
        updateUserData(form)
    }

    const addAddress = () => {
        const address = [...form.address, addressForm];
        updateAddress(address)
    }

    const deleteAddress = (deleteIndex) => {
        const address = form.address.filter((_, index) => index !== deleteIndex);
        updateAddress(address)
    }

    const updateAddress = (address) => {
        setForm({...form, address: address})
        updateUserData({address: address})
    }

    const updateUserData = (data) => {
        request(`/api/user-data/update`, 'POST', {...data}, {
            Authorization: `Bearer ${token}`
        })
            .then(data => {
                console.log(data)
            })
    }

    useEffect(() => {

            request(`/api/user-data/`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
                .then(data => {
                    const date = new Date(data.birthDate);
                    const formatedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)


                    setForm({...data, birthDate: formatedDate})
                })
        }
        , [])

    return (
        <>
            <form className="profile__form">
                <label className="profile-field">
                    <span>Имя:</span>
                    <input onChange={changeHandler} name="name" type="text" value={form.name}/>
                </label>
                <label className="profile-field">
                    <span>Элекронная почта:</span>
                    <input onChange={changeHandler} name="email" type="text" value={form.email}/>
                </label>
                <label className="profile-field">
                    <span>Пол:</span>
                    <input onChange={changeHandler} name="sex" type="text" value={form.sex}/>
                </label>
                <label className="profile-field">
                    <span>Телефон:</span>
                    <input onChange={changeHandler} name="phone" type="text" value={form.phone}/>
                </label>
                <label className="profile-field">
                    <span>Дата рождения</span>
                    <input onChange={changeHandler} name="birthDate" type="date" value={form.birthDate}/>
                </label>
                <Button onClick={changeUserData} className='button--form'>
                    Сохранить
                </Button>
            </form>
            <div className="address">
                {form.address && (form.address.length > 0)
                    ? <div><h4>Адреса доставки:</h4>
                        {form.address.map((item, index) => {
                            return (<div className="address__item">
                                <div className="address-block city-block">
                                    <div className="title">Город:</div>
                                    <div className="value">{item.city}</div>
                                </div>
                                <div className="address-block">
                                    <div className="title">Улица:</div>
                                    <div className="value">{item.street}</div>
                                </div>
                                <div className="address-block house-block">
                                    <div className="title">Дом:</div>
                                    <div className="value">{item.number}</div>
                                </div>
                                <div className="address-block app-block">
                                    <div className="title">Квартира:</div>
                                    <div className="value">{item.numberApartment}</div>
                                </div>
                                <div className="address-block remove-block">
                                    <div onClick={() => deleteAddress(index)} className="button button--outline button--circle">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                                fill="#EB5A1E"/>
                                            <path
                                                d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                                fill="#EB5A1E"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                        )
                        })}
                    </div>
                        :<h4>Нет адреса</h4>}

                    </div>
            <div className="add-address-block">
                        <h4>Добавить адрес</h4>
                        <form className="add-address-block__form">
                            <label className="add-address-block__field profile-field city">
                                <span>Город</span>
                                <input onChange={changeHandlerAddress} name="city" type="text"/>
                            </label>
                            <label className="add-address-block__field profile-field street">
                                <span>Улица</span>
                                <input onChange={changeHandlerAddress} name="street" type="text"/>
                            </label>
                            <label className="add-address-block__field profile-field number">
                                <span>Номер дома</span>
                                <input onChange={changeHandlerAddress} name="number" type="text"/>
                            </label>
                            <label className="add-address-block__field profile-field number">
                                <span>Квартира</span>
                                <input onChange={changeHandlerAddress} name="numberApartment" type="text"/>
                            </label>
                            <Button onClick={addAddress}>
                                Сохранить
                            </Button>
                        </form>
                    </div>
                    </>
    )
};

export default UserData