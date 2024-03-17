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
import {ApplicationContext} from '../context/ApplicationContext';
import {processTextWithAi, searchEmbeddingsPlus} from "../services/ai.service";
import moment from "moment";


const AiDialog = (props) => {
    const AppContext = useContext(ApplicationContext);

    const [isOpenPanel, setIsOpenPanel] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [aiSubmission, setAiSubmission] = useState(null);
    const [aiResponse, setAiResponse] = useState('');
    const [chatLog, setChatLog] = useState([
        {
            text: "Hello there! I'm Matt's AI Assistant. Ask me anything about Matt's skills and applications, and I will do my best to answer!",
            role: "system",
            timestamp: new Date()
        }
    ]);
    const [isAwaitingChatReply, setIsAwaitingChatReply] = useState(false);
    const [lastUpdatedChat, setLastUpdatedChat] = useState(new Date())

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [lastUpdatedChat]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitToAi = async () => {
        try {
            setLastUpdatedChat(new Date());
            setIsAwaitingChatReply(true);
            let params = `text=${aiSubmission}`
            const res = await searchEmbeddingsPlus(params);
            const updatedChatLog = chatLog;
            updatedChatLog.push({
                role: 'system',
                text: res.text,
                timestamp: new Date()
            })
            setIsAwaitingChatReply(false);
            console.log(updatedChatLog)
            setChatLog(updatedChatLog);
            setLastUpdatedChat(new Date());
        } catch (e) {
            console.log(e)
            AppContext.handleError('Unable to process.');
        }
    }

    const populateModalContents = () => {

        if (!isOpenPanel) return null;
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
                            Received {moment(item.timestamp).format('h:mm A')}
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
                            Sent {moment(item.timestamp).format('h:mm A')}
                        </small>
                        <br/>
                    </div>
                )
            }
        });

        return (
            <div style={{padding: '20px'}}>
                {messageBubbles}
                <br/>
                <div style={{float: 'left', width: '100%', marginTop: '20px'}}>
                    {isAwaitingChatReply
                        ? <i>AI Assistant is typing...</i>
                        : null
                    }
                </div>

                <TextField
                    ref={messagesEndRef}
                    autoFocus={true}
                    style={{marginTop: '20px'}}
                    id="outlined-basic"
                    placeholder='Type question here, then press Enter.'
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

    const generatePanelHeader = () => {
        return (
            <div
                // style={{padding: '10px'}}
                onClick={handleClickOpen}
                variant="text"
                className={'medium-label sidebar-font'}
            >
                <span style={{float: 'left'}}>AI Assistant</span>
                <span style={{float: 'right', cursor: 'pointer'}} onClick={(e) => setIsOpenPanel(!isOpenPanel)}>
                    {isOpenPanel ? 'Hide' : 'Show'}
                </span>
            </div>
        );
    }

    return (<div style={{
        padding: '10px',
        position: 'fixed',
        // minWidth: '300px',
        // maxWidth: '700px',
        width: '600px',
        right: '50px',
        bottom: '0px',
        background: 'white',
        // borderRadius: '10px',

        border: '1px solid silver',
        boxShadow: '#80808057 0px 0px 10px 0px',
    }}>
        {generatePanelHeader()}
        <div style={{
            maxHeight: '600px',
            overflowY: 'scroll',
            overflowX: 'hidden',
            width: '100%'
        }}>
            {populateModalContents()}
        </div>
    </div>);
}

export default AiDialog;
