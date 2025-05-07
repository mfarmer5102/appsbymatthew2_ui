import React, {useContext, useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from '@mui/material';
import {ApplicationContext} from '../../context/ApplicationContext';

const WelcomeDialog = (props) => {
    const AppContext = useContext(ApplicationContext);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        console.log(props.data);
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<div style={{float: 'right'}}>
        <div
            onClick={handleClickOpen}
            variant="text"
            className={'medium-label sidebar-font'}
        >
            About
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className='modal primary-font'>Hello!</DialogTitle>
            <DialogContent className='modal primary-font'>
                <DialogContentText className='modal primary-font'>
                    I'm a professional data engineer and full-stack web developer with a passion for developing applications and transforming data to solve real-world problems. In addition to more than 5 years of experience as a professional and data engineer and full-stack developer, I possess more than 10 years of professional experience with creative problem solving.
                </DialogContentText>
            </DialogContent>
            <DialogActions className='modal primary-font'>
                <Button className='modal primary-font' onClick={handleClose}>Continue</Button>
            </DialogActions>
        </Dialog>
    </div>);
}

export default WelcomeDialog;
