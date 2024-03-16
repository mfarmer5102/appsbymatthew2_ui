import React, {useContext, useEffect, useRef, useState} from 'react';
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
import moment from "moment";


const AiDialog = (props) => {
    const AppContext = useContext(ApplicationContext);
    const messagesRef = useRef();
    const [open, setOpen] = React.useState(false);
    const [aiSubmission, setAiSubmission] = useState(null);
    const [aiResponse, setAiResponse] = useState('');
    const [chatLog, setChatLog] = useState([
        {
            text: "Hello! Ask me anything about Matt's skills and applications.",
            role: "system",
            timestamp: new Date()
        }
    ]);
    const [lastUpdatedChat, setLastUpdatedChat] = useState(new Date())

    useEffect(() => {}, []);

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
            const updatedChatLog = chatLog;
            updatedChatLog.push({
                role: 'system',
                text: res.text,
                timestamp: new Date()
            })
            console.log(updatedChatLog)
            setChatLog(updatedChatLog);
            setLastUpdatedChat(new Date());
        } catch (e) {
            console.log(e)
            AppContext.handleError('Unable to process.');
        }
    }

    const populateModalContents = () => {
        const messageBubbles = [];
        chatLog.forEach(item => {
            if (item.role === 'system') {
                messageBubbles.push(
                    <div style={{width: 'fit-content', float: 'left'}}>
                        <div style={{
                            background: '#0072ff',
                            color: 'white',
                            margin: '10px 100px 3px 0px',
                            padding: '10px',
                            borderRadius: '20px'
                        }}>
                            {item.text}
                        </div>
                        <small style={{float: 'left'}}>
                            Received {moment(item.timestamp).format('hh:mm A')}
                        </small>
                        <br/>
                    </div>
                )
            } else if (item.role === 'user') {
                messageBubbles.push(
                    <div style={{width: 'fit-content', float: 'right'}}>
                        <div style={{
                            background: 'silver',
                            color: 'black',
                            margin: '10px 0px 3px 100px',
                            padding: '10px',
                            borderRadius: '20px'
                        }}>
                            {item.text}
                        </div>
                        <small style={{float: 'right'}}>
                            Sent {moment(item.timestamp).format('hh:mm A')}
                        </small>
                        <br/>
                    </div>
                )
            }
        });

        return (
            <div style={{padding: '20px', minWidth: '500px'}}>
                {messageBubbles}
                <TextField
                    autoFocus={true}
                    style={{marginTop: '20px'}}
                    id="outlined-basic"
                    placeholder='Enter prompt here, then press Enter.'
                    value={aiSubmission}
                    // label="Outlined"
                    variant="outlined"
                    // multiline={true}
                    fullWidth={true}
                    onChange={e => setAiSubmission(e.target.value)}
                    onKeyDown={(e)=> {
                        if (e.key === 'Enter') {
                            submitToAi(e.target.value)
                            const updatedChatLog = chatLog;
                            updatedChatLog.push({
                                role: 'user',
                                text: aiSubmission,
                                timestamp: new Date()
                            })
                            setChatLog(updatedChatLog)
                            setAiSubmission('')
                        }
                    }}
                />
                {/*<Button variant='outlined' onClick={submitToAi}>Submit</Button>*/}
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
