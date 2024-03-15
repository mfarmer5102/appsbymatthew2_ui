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
import {processTextWithAi, searchEmbeddingsPlus} from "../../services/ai.service";

const ResponseIndicator = ({aiResponse}) => {

    useEffect(() => {}, [aiResponse])

    // return (
    //     <TextField
    //         id="outlined-basic"
    //         value={aiResponse}
    //         // label="Prompt"
    //         variant="outlined"
    //         multiline={true}
    //         fullWidth={true}
    //         disabled={true}
    //     />
    // )

    return aiResponse;

}

const AiDialog = (props) => {
    const AppContext = useContext(ApplicationContext);
    const [open, setOpen] = React.useState(false);
    const [aiSubmission, setAiSubmission] = useState(null);
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
            const res = await searchEmbeddingsPlus(params);
            console.log(res)
            // setAiResponse(res)
            setAiResponse(res.text);
        } catch (e) {
            console.log(e)
            AppContext.handleError('Unable to process.');
        }
    }

    const populateModalContents = () => {
        return (
            <div style={{padding: '20px', minWidth: '500px'}}>
                <TextField
                    id="outlined-basic"
                    placeholder='Enter prompt here'
                    value={aiSubmission}
                    // label="Outlined"
                    variant="outlined"
                    multiline={true}
                    fullWidth={true}
                    onChange={e => setAiSubmission(e.target.value)}
                />
                <br/><br/>
                <ResponseIndicator aiResponse={aiResponse}/>
                <br/>
                <Button variant='outlined' onClick={submitToAi}>Submit</Button>
            </div>
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
