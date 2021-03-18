import React, {useEffect, useState} from "react";
import {Textarea, Icon, Button, Dropdown, Divider} from 'react-materialize'
import ContentAdmin from "./ContentAdmin";
import NavSite from "./NavSite";


const Admin = ({collection}) => {
    const arrayKeys = collection && Object.keys(collection)
    console.log(collection)
    console.log(arrayKeys)
    const [activeCollection, setActiveCollection] = useState((!arrayKeys)?null:arrayKeys[0])
    const [items, setItems] = useState([])
    console.log(activeCollection)
    useEffect( () =>{
        if(!collection){return}
          collection[activeCollection].getAllItems(undefined, '')

              .then(data => {console.log(data); setItems(data)})
    },[activeCollection])
    return (
        <div className="admin-wrapper">
           <NavSite
               items = {arrayKeys}
               activeCollection = {activeCollection}
               setActiveCollection = {setActiveCollection}
           />
            <div className="admin-wrapper__content-wrapper">
                <div className="admin-wrapper__header-content">
                    <Textarea
                        icon={<Icon>search</Icon>}
                        id="Textarea-12"
                    />
                    <div className="header-content__menu">
                        <Dropdown
                            id="Dropdown_6"
                            options={{
                                alignment: 'right',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: false,
                                container: <div className="form"></div>,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                            }}
                            trigger={
                                <Button
                                node="a"
                                small
                                style={{
                                    marginRight: '5px'
                                }}
                                waves="light"
                            >
                                Добавить
                                <Icon left>
                                    add
                                </Icon>
                            </Button>}
                        >
                            <div className={'form'}>

                            </div>
                            <button>Отправить</button>
                        </Dropdown>

                    </div>
                </div>
                <div className="admin-wrapper__body-content">
                    {activeCollection && <ContentAdmin
                        items = {items}
                        fields = {collection[activeCollection].fields || undefined}
                        deleteItem = {collection[activeCollection].deleteItem}
                        editItem = {collection[activeCollection].editItem}
                        addItem = {collection[activeCollection].addItem}
                    />}
                </div>
            </div>
        </div>
    )
}
export default Admin