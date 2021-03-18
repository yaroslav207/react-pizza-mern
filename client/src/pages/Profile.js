import React, {useEffect, useState} from 'react';
import {Orders, UserData, Bonuses, OrderDetail} from "../components/Profile"
import {Route, Link, Redirect, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../components";
import {logout} from "../redux/actions/auth"
import {setOrderConfirmation, clearCart} from "../redux/actions/cart"
import {useHttp} from "../hooks/http.hook"

const storageName = 'userData'
const profileLink = [{to:'', text:'Мои данные'}, {to:'orders', text:'Заказы'}, {to:'bonuses', text: 'Бонусы'}];


function Profile() {
    const dispatch = useDispatch()
    const {request} = useHttp()
    const history = useHistory()
    const [activeItem, setActiveItem] = useState(0);
    const {isAuth, token} = useSelector(({auth}) => auth)
    const {orderConfirmation, items} = useSelector(({cart}) => cart)

    const leaveAccount = () => {
        dispatch(logout())
        localStorage.removeItem(storageName)
    }

    const addOrder = () => {
        request('/api/order/add', 'POST', {orderList: items}, {
            Authorization: `Bearer ${token}`
        })
    .then(data => {
        history.push(`/profile/orders/${data.id}`)
        })
    }

    useEffect(() => {
        if(orderConfirmation){
            dispatch(setOrderConfirmation(false))
            addOrder()
            dispatch(clearCart())

        }
    }, [])

    return(
        isAuth?
        <div className="container container--profile">
            <div className="profile">
                <div className="profile-nav">
                    <ul className="profile-nav__list">
                        {profileLink.map((item, index) => (
                            <ProfileNav
                                to={item.to}
                                active = {index === activeItem}
                                onClick = {() => setActiveItem(index)}
                            >
                                {item.text}
                            </ProfileNav>
                        ))}
                    </ul>
                    <Button onClick={leaveAccount} className="logout-button">Выход</Button>
                </div>
                <div className="profile-body">
                    <Route exact path={'/profile/orders'} component={Orders}/>
                    <Route exact path={'/profile/'} component={UserData}/>
                    <Route exact path={'/profile/bonuses'} component={Bonuses}/>
                    <Route exact path={'/profile/orders/:id'} component={OrderDetail}/>
                </div>
            </div>
        </div>
            : <Redirect to="/"/>
    )
}

function ProfileNav({to, active, onClick, children}) {
    return (
        <li
            className={`profile-nav__item ${active?'active':''}`}
            onClick={onClick}
        >
            <Link to={`/profile/${to}`}>{children}</Link>
        </li>
    )
}

export default Profile