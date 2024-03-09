import React, {createContext, useState} from "react";

export const ApplicationContext = createContext();

const ApplicationContextProvider = props => {
    const [isOpenToast, setIsOpenToast] = useState(false);
    const [toastType, setToastType] = useState('success');
    const [toastMessage, setToastMessage] = useState('');
    const [sourceTypes, setSourceTypes] = useState('');

    const handleError = (errMessage) => {
        setToastMessage(errMessage);
        setToastType('warning');
        setIsOpenToast(true);
    };

    const handleNotification = (message) => {
        setToastMessage(message);
        setToastType('success');
        setIsOpenToast(true);
    };

    return (<ApplicationContext.Provider value={{
            isOpenToast,
            toastMessage,
            toastType,
            sourceTypes,
            setIsOpenToast,
            handleError,
            handleNotification,
            setSourceTypes
        }}>
            {props.children}
        </ApplicationContext.Provider>);
};

export default ApplicationContextProvider;
