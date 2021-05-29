import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import {useSelector} from "react-redux";


const Orders = () => {
    const {request} = useHttp()
    const [orderList, setOrderList] = useState([])

    const token = useSelector(({auth}) => auth.token)

    const formatedDate = (value) => {
        const date = new Date(value)
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    }

    useEffect(() => {
            request(`/api/order/`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
                .then(data => {
                    setOrderList(data)
                })
        }
        , [])

    return(
        <div className="orders-block">
        <h4 className="title">Мои заказы</h4>
        <table className="orders-block__table table">
            <tr className="table__title">
                <th>Заказ №</th>
                <th className="table__date">Дата</th>
                <th className="table__price">Сумма заказа</th>
                <th className="table__status">Статус заказа</th>
                <th></th>
            </tr>
            <tbody>
            {orderList.map((item) => (
                <tr className="table__rows">
                    <td className="table__id">
                        <Link to={`/profile/orders/${item._id}`}>{item.orderId}</Link>
                    </td>
                    <td className="table__date">
                        {formatedDate(item.date)}
                    </td>

                    <td className="table__price">
                        {item.amount} грн.
                    </td>
                    <td className="table__status">
                        {item.status?`Выполнено`:`Подготовка`}
                    </td>
                    <td className="table__reorder">
                        Перезаказать
                    </td>
                </tr>
            ))}

            </tbody>
        </table>
    </div>)}



export default Orders