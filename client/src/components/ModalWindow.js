import React, {useEffect, useRef, useState} from "react";

const ModalWindow = ({titleModal, children, closeButtonRef, defaultStateModal, activeModal = () => {}, disableModal = () => {}}) => {
    const [visibleModal, setVisibleModal] = useState(false)

    const modalRef = useRef();
    const closeModalRef = useRef();
    const toggleVisibleModal = (value) => {
        setVisibleModal(value)
    }
    const handleClick = () => {
            toggleVisibleModal(true)
            activeModal()
    }

    const handleOutsideClick = (e) => {
        console.log(e.target.className)
        if ((e.target.className === 'modal-block') || closeButtonRef && e.path.includes(closeButtonRef.current)) {
            toggleVisibleModal(false)
            disableModal()
        }
    }

    useEffect(() => {
        setVisibleModal(defaultStateModal)
    }, [defaultStateModal])

    return (
        <>
            <div className="modal-toggle" onClick={handleClick}>{titleModal}</div>
            {visibleModal &&
            <div  className="modal-block" onClick={(event) => {handleOutsideClick(event)}}>
                <div ref={modalRef} className="modal-block__content">
                    {children}
                </div>
            </div>
            }
        </>
    )
}

export default ModalWindow