import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook";
import {useSelector} from "react-redux";
import Button from "../Button";

const OrderDetail = () => {
    const orderId = useParams().id;
    const {request} = useHttp();
    const {token, userId} = useSelector(({auth}) => auth);
    const pizzas = useSelector(({pizzas}) => pizzas.items);

    const [orderDetail, setOrderDetail] = useState({})


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

    const changeHandlerAddress = (event) => {
        setAddressForm({...addressForm, [event.target.name]: event.target.value})
    }
    const addAddress = () => {
        const address = [...form.address, addressForm];
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
                console.log(data) //доделать
            })
    }
    const deleteAddress = (deleteIndex) => {
        const address = form.address.filter((_, index) => index !== deleteIndex);
        updateAddress(address)
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

    useEffect(() => {
            request(`/api/order/${orderId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
                .then(data => {
                    const date = new Date(data.date);
                    const formatedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
                    setOrderDetail({...data, date: formatedDate, keyOrderList: Object.keys(data.orderList)})
                })
        }
        , [orderId])
    return (
        <div className="order-details-block">
            <div className="order-header">
                <h1 className="account-main-title">
                    <span className="base" data-ui-id="page-title-wrapper">Заказ {orderId}</span>
                </h1>
                <span className="order-status">{orderDetail.status?`Выполнено`:`Подготовка`}</span>

                <time className="order-date">
                    {orderDetail.date}
                </time>
                <a className="action reorder" href="/">
                    <span>Перезаказать</span>
                </a>

            </div>
            <div className="order-items-details">
                <div className="one-order-table">
                    <div className="header row">
                        <div className="cell product">
                            Название товара
                        </div>
                        <div className="cell price">
                            Цена
                        </div>
                        <div className="cell count">
                            Кол-во
                        </div>
                        <div className="cell summ">
                            Итого
                        </div>
                    </div>
                    {orderDetail.keyOrderList && orderDetail.keyOrderList.map((item) => {
                        return (
                            <div className="row">
                                <div className="cell product">
                                    <strong className="product name product-item-name">
                                        {pizzas.filter((pizza) => {
                                            console.log(pizza._id === orderDetail.orderList[item].idPizza)
                                            return(pizza._id === orderDetail.orderList[item].idPizza)})[0].name}</strong>
                                    <ul className="product-options">
                                        <li className="product-option">
                                            350 г
                                        </li>
                                        <li className="product-option">
                                            , 350 г
                                        </li>
                                    </ul>


                                </div>
                                <div className="cell price">
                                    <span className="price">{orderDetail.orderList[item].price}&nbsp;<span className="currency">грн</span></span>
                                </div>
                                <div className="cell count">
                                    <ul className="items-qty">
                                        <li className="item">
                                            <span className="content">{orderDetail.orderList[item].count}<span> шт</span></span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="cell summ">
                                    <span className="price">{orderDetail.orderList[item].totalPrice}&nbsp;<span className="currency">грн</span></span>
                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className="totals">
                    <div className="row">
                        <div className="cell label">
                            Итого
                        </div>

                        <div className="cell price">
                            <span className="price">{orderDetail.amount}&nbsp;<span className="currency">грн</span></span></div>
                    </div>
                    <div className="row">
                        <div className="cell label">
                            Доставка и обработка
                        </div>

                        <div className="cell price">
                            <span className="price">0&nbsp;<span className="currency">грн</span></span></div>
                    </div>
                    <div className="row grand-total">
                        <div className="cell label">
                            <strong>К оплате</strong>
                        </div>

                        <div className="cell price">
                            <strong><span className="price">{orderDetail.amount}&nbsp;<span
                                className="currency">грн</span></span></strong>
                        </div>
                    </div>
                </div>

            </div>
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
        </div>
    )
}


export default OrderDetail;