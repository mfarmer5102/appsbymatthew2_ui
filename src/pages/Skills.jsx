import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {ApplicationContext} from '../context/ApplicationContext';
import {Chip, Grid} from '@material-ui/core';
import CardSkill from '../components/DataCards/CardSkill';
// import CardEntrySkeleton from '../components/DataCards/CardEntrySkeleton';
import {getSkills} from "../services/skills.service";
import {TextField} from "@mui/material";
import {genericFunctionCall, searchEmbeddingsPlus} from "../services/ai.service";
import DogPhoto from "../components/doggy.jpg";

const SkillsPage = () => {
    const AppContext = useContext(ApplicationContext);
    const [skills, setSkills] = useState([]);
    const [lastFetched, setLastFetched] = useState(new Date());
    const [isRespondedServer, setIsRespondedServer] = useState(false);
    const [aiSubmission, setAiSubmission] = useState(null)

    useEffect(async () => {
        setIsRespondedServer(false);
        window.scrollTo(0, 0);
        try {
            const skills = await getSkills();
            setSkills(skills);
        } catch (e) {
            AppContext.handleError('Unable to load skills.');
        }
        setIsRespondedServer(true);
    }, [lastFetched]);

    const updateLastFetched = () => setLastFetched(new Date());

    const submitToAi = async () => {
        try {
            setSkills([])
            // setLastUpdatedChat(new Date());
            // setIsAwaitingChatReply(true);
            let params = `text=Find skills that meet the following criteria: ${aiSubmission}`
            const res = await genericFunctionCall(params);
            console.log(res)
            setSkills(res.data)
            // updateLastFetched()
            // alert(res)
            // const updatedChatLog = chatLog;
            // updatedChatLog.push({
            //     role: 'system',
            //     text: res.text,
            //     timestamp: new Date()
            // })
            // setIsAwaitingChatReply(false);
            // console.log(updatedChatLog)
            // setChatLog(updatedChatLog);
            // setLastUpdatedChat(new Date());
        } catch (e) {
            console.log(e)
            AppContext.handleError('Unable to process.');
        }
    }

    const VerbalFilter = () => (
        <>
            <img
                src={DogPhoto}
                style={{
                    height: '50px',
                    position: 'absolute',
                    borderRadius: '100%',
                    // top: '-60px',
                    // left: '250px',
                    boxShadow: 'gray 0px 0px 7px'
                }}
            />
            <TextField
                style={{paddingLeft: '70px'}}
                placeholder="Tell me what you would like to see! For example, 'Show me featured programming languages'"
                value={aiSubmission}
                autoFocus={true}
                // label="Outlined"
                variant="outlined"
                // multiline={true}
                fullWidth={true}
                onChange={e => setAiSubmission(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                            setAiSubmission('')
                            submitToAi(e.target.value)
                            // const updatedChatLog = chatLog;
                            // updatedChatLog.push({
                            //     role: 'user',
                            //     text: aiSubmission,
                            //     timestamp: new Date()
                            // })
                            // setChatLog(updatedChatLog)
                    }
                }}
            />
        </>
    )

    const generateSkillCards = (skillCode) => {
        let appCards = [];
        if (!isRespondedServer) {
            for (let i = 0; i < 7; i++) {
                appCards.push(<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    {/*<CardEntrySkeleton/>*/}
                </Grid>);
            }
        } else if (isRespondedServer && !skills?.length) {
            return (<Grid item xs={12}>
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                    No entries to show for this source.
                    Create a new entry to see it appear here.
                </div>
                <br/>
            </Grid>);
        } else {
            for (let i = 0; i < skills?.length; i++) {
                if (skills[i].skill_type_code === skillCode) {
                    skills[i].published_date = moment(skills[i].published_date).utc();
                    appCards.push(<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={skills[i]._id}>
                        <CardSkill data={skills[i]} updateLastFetched={updateLastFetched}/>
                    </Grid>);
                }
            }
        }
        return appCards;
    }

    return (<div class='animated fadeIn'>
        <VerbalFilter/>
        <h3 className={'primary-font'}>Back-End Frameworks</h3>
        <Grid container spacing={1}>
            {generateSkillCards('BACKENDFRAMEWORK')}
        </Grid>
        <h3 className={'primary-font'}>Front-End Frameworks</h3>
        <Grid container spacing={1}>
            {generateSkillCards('FRONTENDFRAMEWORK')}
        </Grid>
        <h3 className={'primary-font'}>Databases</h3>
        <Grid container spacing={1}>
            {generateSkillCards('DATABASE')}
        </Grid>
        <h3 className={'primary-font'}>Deployment Technologies</h3>
        <Grid container spacing={1}>
            {generateSkillCards('DEPLOYMENT')}
        </Grid>
        <h3 className={'primary-font'}>Cloud Technologies</h3>
        <Grid container spacing={1}>
            {generateSkillCards('CLOUD')}
        </Grid>
        <h3 className={'primary-font'}>Languages</h3>
        <Grid container spacing={1}>
            {generateSkillCards('LANGUAGE')}
        </Grid>
        <h3 className={'primary-font'}>Library</h3>
        <Grid container spacing={1}>
            {generateSkillCards('LIBRARY')}
        </Grid>
        <h3 className={'primary-font'}>Data Science Tools</h3>
        <Grid container spacing={1}>
            {generateSkillCards('DATASCIENCE')}
        </Grid>
        <h3 className={'primary-font'}>ORMs</h3>
        <Grid container spacing={1}>
            {generateSkillCards('ORM')}
        </Grid>
        <h3 className={'primary-font'}>Operating Systems</h3>
        <Grid container spacing={1}>
            {generateSkillCards('OPERATINGSYSTEM')}
        </Grid>
        <h3 className={'primary-font'}>Other Technologies</h3>
        <Grid container spacing={1}>
            {generateSkillCards('OTHER')}
        </Grid>
    </div>);

};

export default SkillsPage;
