import React, {useState} from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Button} from "../index";

function PizzaBlock({_id, url, name, types, sizes, onClickAddPizza, addedCount}) {


    const availabelTypes = ['тонкое', 'традиционное'];

    const [activeType, setActiveType] = useState(types[0]);
    const [activeSize, setActiveSize] = useState(0);

    const onActiveType = (index) => {
        setActiveType(index)
    };
    const onActiveSize = (size) => {
        setActiveSize(size)
    };

    const onAddPizza = () => {
        const obj = {
            id: `${_id}/${activeSize}/${activeType}`,
            name,
            url,
            price: sizes[activeSize].price,
            size: sizes[activeSize].size,
            type: 0,
        }
        return obj;
    }
    const handleOnAddPizza = () => {
        onClickAddPizza(onAddPizza())
    }

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={url}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {availabelTypes.map((type, index) =>
                        <li
                            key={type}
                            onClick={() => onActiveType(index)}
                            className={classNames({
                                'active': activeType === index,
                                'disabled': !types.includes(index)
                            })}>
                            {type}
                        </li>)}
                </ul>
                <ul>
                    {sizes.map((item, index) =>
                        <li
                            key={item.size}
                            onClick={() => onActiveSize(index)}
                            className={classNames({
                                'active': activeSize === index
                            })}>
                            {item.size} см.
                        </li>)}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {sizes[activeSize].price} ₽</div>
                <Button
                    onClick={handleOnAddPizza}
                    className='button--add'
                    outline>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {addedCount&&<i>{addedCount}</i>}
                </Button>
            </div>
        </div>
    )
}

PizzaBlock.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.number).isRequired,
    sizes: PropTypes.object,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    onClickAddPizza: PropTypes.func.isRequired,
    addedCount: PropTypes.number
}

PizzaBlock.defaultProps = {
    name: '---',
    sizes: [],
    types: [],
    price: 0,
}


export default PizzaBlock;