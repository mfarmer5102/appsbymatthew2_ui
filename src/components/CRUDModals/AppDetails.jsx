import React, {useContext, useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from '@mui/material';
import {ApplicationContext} from '../../context/ApplicationContext';
import moment from "moment";
import config from "../../config";

const AppDetailsDialog = (props) => {
    const AppContext = useContext(ApplicationContext);
    const [open, setOpen] = React.useState(false);

    const imageLocation = config.imageUrlBasePath + props.data['image_url_relative']

    useEffect(() => {
        console.log(props.data);
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const generateSkillsUsed = (skills) => {
        const htmlToReturn = [];
        skills.forEach(skill => {
            htmlToReturn.push(<li>{skill}</li>)
        })
        return htmlToReturn;
    };

    return (<div style={{float: 'right'}}>
        <Button
            onClick={handleClickOpen}
            variant="text"
            className={'primary-font'}
        >
            Details
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className='modal primary-font'>{props.data['title']}</DialogTitle>
            <DialogContent className='modal primary-font'>
                <DialogContentText className='modal primary-font'>
                    <img src={imageLocation} style={{maxWidth: '100%'}}/>
                    <br/><br/>
                    {props.data['description']}
                    <br/><br/>
                    First published on {moment(props.data?.publish_date?.['$date']).format('LL')}.
                    <br/><br/>
                    Demonstrates the following skills:
                    {generateSkillsUsed(props.data['associated_skill_codes'])}
                </DialogContentText>
            </DialogContent>
            <DialogActions className='modal primary-font'>
                <Button className='modal primary-font' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    </div>);
}

export default AppDetailsDialog;
