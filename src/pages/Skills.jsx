import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {ApplicationContext} from '../context/ApplicationContext';
import {Chip, Grid} from '@material-ui/core';
import CardSkill from '../components/DataCards/CardSkill';
// import CardEntrySkeleton from '../components/DataCards/CardEntrySkeleton';
import {getSkills} from "../services/skills.service";
import {Button, TextField} from "@mui/material";
import {genericFunctionCall, searchEmbeddingsPlus} from "../services/ai.service";
import DogPhoto from "../components/doggy.jpg";
import SkeletonCardSkill from "../components/DataCards/SkeletonCardSkill";

const SkillsPage = () => {
    const AppContext = useContext(ApplicationContext);
    const [skills, setSkills] = useState([]);
    const [lastFetched, setLastFetched] = useState(new Date());
    const [isRespondedServer, setIsRespondedServer] = useState(false);
    const [aiSubmission, setAiSubmission] = useState(null)

    useEffect(async () => {
        window.scrollTo(0, 0);
        await loadSkills();
    }, [lastFetched]);

    const loadSkills = async () => {
        setIsRespondedServer(false);
        try {
            const skills = await getSkills();
            setSkills(skills);
        } catch (e) {
            AppContext.handleError('Unable to load skills.');
        }
        setIsRespondedServer(true);
    }

    const updateLastFetched = () => setLastFetched(new Date());

    const submitToAi = async () => {
        setIsRespondedServer(false);
        try {
            setSkills([]);
            let params = `text=Find skills that meet the following criteria: ${aiSubmission}`
            const res = await genericFunctionCall(params);
            setSkills(res.data)
        }
        catch (e) {
            console.log(e)
            AppContext.handleError('Unable to process.');
        }
        finally {
            setIsRespondedServer(true);
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
                    boxShadow: 'gray 0px 0px 7px'
                }}
            />
            <TextField
                style={{paddingLeft: '70px'}}
                placeholder="Tell me what you would like to see! For example, 'Show me featured programming languages'"
                value={aiSubmission}
                autoFocus={true}
                variant="outlined"
                fullWidth={true}
                onChange={e => setAiSubmission(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setAiSubmission('');
                        submitToAi(e.target.value);
                    }
                }}
            />
            <div style={{float: 'right'}}>
                <Button onClick={() => loadSkills()}>
                    Reset results
                </Button>
            </div>
        </>
    )

    const generateSkillCards = (skillCode) => {
        let appCards = [];
        if (!isRespondedServer) {
            for (let i = 0; i < 7; i++) {
                appCards.push(<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <SkeletonCardSkill/>
                </Grid>);
            }
        } else if (isRespondedServer && !skills?.length) {
            return (<Grid item xs={12}>
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                    No skills to show.
                </div>
                <br/>
            </Grid>);
        } else {
            for (let i = 0; i < skills?.length; i++) {
                if (skills[i].skill_type_code === skillCode) {
                    skills[i].published_date = moment(skills[i].published_date).utc();
                    appCards.push(<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`${skills[i].name}_${Math.random()}`}>
                        <CardSkill data={skills[i]} updateLastFetched={updateLastFetched}/>
                    </Grid>);
                }
            }
        }
        return appCards;
    }

    const generateSkillSections = () => {
        let sections = [
            {label: 'Back-End Frameworks', skillCode: 'BACKENDFRAMEWORK'},
            {label: 'Front-End Frameworks', skillCode: 'FRONTENDFRAMEWORK'},
            {label: 'Cloud Technologies', skillCode: 'CLOUD'},
            {label: 'Languages', skillCode: 'LANGUAGE'},
            {label: 'Databases', skillCode: 'DATABASE'},
            {label: 'Libraries', skillCode: 'LIBRARY'},
            {label: 'Dev Ops and Deployment Technologies', skillCode: 'DEPLOYMENT'},
            {label: 'Data Science Tools', skillCode: 'DATASCIENCE'},
            {label: 'ORMs', skillCode: 'ORM'},
            {label: 'Operating Systems', skillCode: 'OPERATINGSYSTEM'},
            {label: 'Other Technologies', skillCode: 'OTHER'},
        ]
        const sectionDivs = sections.map(item => {
            let skillCards = generateSkillCards(item.skillCode);
            if (!skillCards.length) return null;
            return (
                <>
                    <h3 className={'primary-font'}>{item.label}</h3>
                    <Grid container spacing={1}>
                        {skillCards}
                    </Grid>
                </>
            )
        });
        const finalSectionDivs = sectionDivs.filter(item => !!item)
        if (!finalSectionDivs.length) return (
            <Grid item xs={12}>
                <div style={{textAlign: 'center', marginTop: '4rem'}}>
                    No skills to show.
                </div>
                <br/>
            </Grid>
        )
        return finalSectionDivs
    }

    return (<div className='animated fadeIn'>
        <VerbalFilter/>
        {generateSkillSections()}
    </div>);

};

export default SkillsPage;
