import React, {useEffect, useState} from "react";
import {Collection, CollectionItem, Textarea, Icon, Table, Button} from 'react-materialize'
import {useDispatch, useSelector} from "react-redux";
import {fetchPizzas} from '../../redux/actions/pizzas'
import {useHttp} from "../../hooks/http.hook";


const ContentAdmin = ({items = [], fields, deleteItem, editItem, addItem}) => {
    const keyItems = fields
        ? Object.keys(fields)
        : ((items.length === 0)
                ? []
                : Object.keys(items[0])
        )
    return (
        <div>
            <div className="table__header">
            <div className="table__row">
                {keyItems.map((item) => {
                        return (
                            <div className="table__item">
                                {item}
                            </div>)
                    }

                )}
                <div className="table__item"></div>
            </div>
            </div>
                <div className="table__body">
                {items.map((item) => {
                    return (<div className="table__row">{
                            [...keyItems.map((key) => {
                                return <div className="table__item">{fields && fields[key]
                                    ? fields[key](item[key])
                                    : item[key].toString()}</div>
                            }),
                                <div className="table__item">
                                    <div onClick={() => {
                                        console.log(item._id)
                                        deleteItem({_id: item._id}, '')
                                    }}>
                                        <Icon className='delete-icon'>delete_forever</Icon>
                                    </div>
                                    <div><Icon className='edit-icon'>edit</Icon></div>
                                </div>
                            ]
                        }
                        </div>
                    )
                })}
                </div>


        </div>
    )
}

export default ContentAdmin

