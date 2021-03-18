import React from "react";
import PropTypes from "prop-types";


function Categories({activeItem, items, onClickCategory}) {
    return (
        <div className="categories">
            <ul>
                <li
                    className={activeItem === null ? 'active' : ''}
                    onClick={() => onClickCategory(null)}>
                    Все
                </li>
                {items && items.map((item ) => <li
                    className={activeItem === item._id ? 'active' : ''}
                    onClick={() => onClickCategory(item._id)}
                    key={item._id}
                >

                    {item.name}
                </li>)}
            </ul>
        </div>
    )
}


Categories.propTypes = {
    activeItem: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClickCategory: PropTypes.func,
}

Categories.defaultProps = {
    activeItem: null,
    items: []
}

export default Categories