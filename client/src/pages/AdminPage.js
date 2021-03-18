import React, {useEffect} from "react";
import Admin from "../components/Admin";
import {useDispatch, useSelector} from "react-redux";
import {fetchPizzas} from "../redux/actions/pizzas";
import {useHttp} from "../hooks/http.hook"

const AdminPage = () => {
    const {request} = useHttp()
    const {token} = useSelector(({auth}) => auth)

    const collectionName = {
        pizza: {
            visibleName: 'Пиццы',
            fields: {
                'name': null,
                'types': (item) => {
                    const types = ['тонкое', 'традиционое']
                    return item.map(item => <div>{types[item]}</div>)
                },
                'sizes': (item) => {
                    return Object.keys(item).map(size => <div>{`${size}см: ${item[size]}грн`}</div>)
                },
                'rating': null,
                'url': (item) => {
                    return <img style={{width: 90+'px'}} src={item} alt=''/>
                }}
        },
        user: {
            visibleName: 'Пользователи'
        },
        order: {
            visibleName: 'Заказы'
        },
        categories: {
            visibleName: 'Категории',
            fields: {
                name: null
            }
        }
    }

    const fetchApi = (method, nameCollection, token) => {
        return async (body, params) => await request(`/api/${nameCollection}/${params}`, method, body, {
            Authorization: `Bearer ${token}`
        })
    }

    for (const key in collectionName){
        collectionName[key] = {
            ...collectionName[key],
            getAllItems: fetchApi('GET', key, token),
            addItem: fetchApi('POST', key, token),
            editItem: fetchApi('PUT', key, token),
            deleteItem: fetchApi('DELETE', key, token),
            searchItem: fetchApi('GET', key, token)
        }
    }


    return(
       <Admin
            collection = {collectionName}
       />
    )
}

export default AdminPage