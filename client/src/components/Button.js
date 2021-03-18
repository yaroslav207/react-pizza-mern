import React from 'react';
import classNames from 'classnames'


function Button(props) {
    const {className, children, outline} = props
    return (
        <div onClick={props.onClick}
            className={classNames(
                'button', className, {
                    'button--outline': outline,
                })}>
            {children}
        </div>
    )
}

export default Button;