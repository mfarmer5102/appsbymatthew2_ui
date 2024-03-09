import React, {useContext} from 'react';
import {ApplicationContext} from '../../context/ApplicationContext';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ToastSection = () => {
    const AppContext = useContext(ApplicationContext);
    if (!AppContext.isOpenToast) return null;

    const iconToUse = AppContext.toastType === 'success' ?
        <CheckCircleOutlineIcon style={{color: 'rgb(103, 173, 91)'}}/> :
        <WarningAmberRoundedIcon style={{color: 'rgb(241, 157, 56)'}}/>

    return (<Snackbar
        open={AppContext.isOpenToast}
        onClose={(e) => AppContext.setIsOpenToast(false)}
        message={AppContext.toastMessage}
        autoHideDuration={3000}
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
        key={Math.random()}
    >
        <Chip icon={iconToUse} label={AppContext.toastMessage} style={{padding: '1rem'}}/>
    </Snackbar>);
}

export default ToastSection;
