import React, {useEffect} from 'react';
import {Route} from "react-router-dom";

import {Header} from './components'
import {Home, Cart, Profile} from './pages'
import AdminPage from "./pages/AdminPage";
import {useDispatch, useSelector} from "react-redux";
import {login, logout, } from "./redux/actions/auth";
import {useHttp} from './hooks/http.hook'

const storageName = 'userData'

function App() {
    const dispatch = useDispatch()
    const {request} = useHttp();

    const {isAdmin, adminMode} = useSelector(({auth}) => auth)
    console.log(adminMode)
    console.log(isAdmin)

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            request('/api/auth/isAuth', 'POST', {...data}, {
                Authorization: `Bearer ${data.token}`
            }).then(
                (res) => {

                    if(res && res.user){
                        console.log(res.user)
                        dispatch(login({token: data.token,  userId: res.user._id, isAdmin: res.user.admin}))
                    } else dispatch(logout())
                }
            ).catch(() => dispatch(logout()))

        }

    },[])

    useEffect(()=>{}, [adminMode])

    return (
        <div className="App">
            {isAdmin && adminMode
                ?<Route path={'/'} component={AdminPage}/>
                :<div className="wrapper">
                    <Route path='/'>
                        <Header/>
                        <div className="content">
                            <Route exact path={'/'} component={Home}/>
                            <Route path={'/cart'} component={Cart}/>
                            <Route path={'/profile'} component={Profile}/>
                        </div>
                    </Route>
                </div>
            }
        </div>
    );
}
export default App;
