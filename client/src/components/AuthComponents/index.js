import React, {useState} from 'react';
import ModalWindow from "../ModalWindow";
import RegistrationComponent from "./RegistrationComponent";
import {visibleLoginForm} from "../../redux/actions/auth"

import LoginComponent from "./LoginComponent";
import {useDispatch, useSelector} from "react-redux";


function Index() {
    const dispatch = useDispatch()

    const visibleModalForm = useSelector(({auth}) => auth.visibleLoginForm)
    const [haveProfile, setHaveProfile] = useState(true)

    const setVisibleModalForm = (value) => {
        dispatch(visibleLoginForm(value))
    }

    const handleHaveProfile = () => {
        setHaveProfile(!haveProfile)
    }

    console.log(visibleModalForm)
    return (
        <div>
            <div className="sign-in">
                {
                    <ModalWindow
                        titleModal="Войти"
                        defaultStateModal={visibleModalForm}
                        disableModal={() => {setVisibleModalForm(false)}}
                        activeModal={() => {setVisibleModalForm(true)}}>
                        {haveProfile
                            ? <LoginComponent
                                toRegistration={handleHaveProfile}
                            />
                            : <RegistrationComponent
                                toLogin={handleHaveProfile}
                            />}
                    </ModalWindow>
                }
            </div>
        </div>

    )
}

export default Index;