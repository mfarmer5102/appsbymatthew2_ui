import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField
} from '@mui/material';
import {ApplicationContext} from '../../context/ApplicationContext';
import {processTextWithAi} from "../../services/ai.service";

const ResponseIndicator = ({aiResponse}) => {

    useEffect(() => {}, [aiResponse])

    return (
        <div>{aiResponse}</div>
    )

}

const AiDialog = (props) => {
    const AppContext = useContext(ApplicationContext);
    const [open, setOpen] = React.useState(false);
    const [aiSubmission, setAiSubmission] = useState('Enter your question here');
    const [aiResponse, setAiResponse] = useState('Response will go here');

    useEffect(() => {
        console.log(props.data);
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitToAi = async () => {
        try {
            let params = `text=${aiSubmission}`
            const res = await processTextWithAi(params);
            setAiResponse(res.text);
        } catch (e) {
            console.log(e)
            AppContext.handleError('Unable to process.');
        }
    }

    const populateModalContents = () => {
        return (
            <>
                <TextField
                    id="outlined-basic"
                    value={aiSubmission}
                    label="Outlined"
                    variant="outlined"
                    multiline={true}
                    onChange={e => setAiSubmission(e.target.value)}
                />
                <br/>
                <ResponseIndicator aiResponse={aiResponse}/>
                <br/>
                <Button onClick={submitToAi}>Submit</Button>
            </>
        )
    }

    return (<div style={{float: 'right'}}>
        <div
            onClick={handleClickOpen}
            variant="text"
            className={'medium-label sidebar-font'}
        >
            ABM-AI
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className='modal primary-font'>ABM-AI</DialogTitle>
            <DialogContent className='modal primary-font'>
                <DialogContentText className='modal primary-font'>
                    {populateModalContents()}
                </DialogContentText>
            </DialogContent>
            <DialogActions className='modal primary-font'>
                <Button className='modal primary-font' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    </div>);
}

export default AiDialog;
