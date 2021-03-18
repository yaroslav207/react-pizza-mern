import React, {useState} from "react";
import {Collection, CollectionItem,  Textarea, Icon, Table, Button} from 'react-materialize'

const NavSite = ({items = [], activeCollection, setActiveCollection}) => {
    return(
        <div className='admin-wrapper__nav-site'>
            <Collection header={`Admin Panel`}>
                {items.map((item) => {
                    return (
                        <div
                            onClick={() => setActiveCollection(item)}
                            className={`collection-item${activeCollection === item ? ' active' : ''}`}
                        >{item}
                        </div>
                    )
                })}
                <div className="collection-item logout"><Icon>logout</Icon>Выйти с Admin Panel</div>
            </Collection>
        </div>
    )
}

export default NavSite