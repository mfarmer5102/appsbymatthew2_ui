import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {ApplicationContext} from '../context/ApplicationContext';
import {Chip, Grid} from '@material-ui/core';
import CardApplication from '../components/DataCards/CardApplication';
import {getApplications} from "../services/applications.service";
import AssociatedSkills from "../components/FormInputs/AssociatedSkills";
import SupportStatus from "../components/FormInputs/SupportStatus";
import {Button} from "@mui/material";

const AllApplicationsPage = () => {
    const AppContext = useContext(ApplicationContext);
    const [applications, setApplications] = useState([]);
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [filteredStatuses, setFilteredStatuses] = useState([]);
    const [lastFetched, setLastFetched] = useState(new Date());
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [isRespondedServer, setIsRespondedServer] = useState(false);

    useEffect(() => {
        setIsRespondedServer(false);
        window.scrollTo(0, 0);
        loadApplications()
        setIsRespondedServer(true);
    }, [page, filteredSkills, filteredStatuses]);

    const loadApplications = async () => {
        try {
            let params = `limit=${pageSize}&skip=${page * pageSize}&`;
            filteredSkills.length ? params += `skills=${filteredSkills}&` : null;
            filteredStatuses.length ? params += `supportStatus=${filteredStatuses}&` : null;
            const apps = await getApplications(params);
            setApplications(apps);
        } catch (e) {
            AppContext.handleError('Unable to load applications.');
        }
    }

    const clearFilters = () => {
        setFilteredStatuses([]);
        setFilteredSkills([]);
    }

    const generateApplicationCards = () => {
        let appCards = [];
        if (!isRespondedServer) {
            for (let i = 0; i < 7; i++) {
                appCards.push(<Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    {/*<CardEntrySkeleton/>*/}
                </Grid>);
            }
        } else if (isRespondedServer && !applications.length) {
            return (<Grid item xs={12}>
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                    No entries to show for this source.
                    Create a new entry to see it appear here.
                </div>
                <br/>
            </Grid>);
        } else {
            for (let i = 0; i < applications.length; i++) {
                applications[i].published_date = moment(applications[i].published_date).utc();
                appCards.push(<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={applications[i]._id}>
                    <CardApplication
                        data={applications[i]}
                        // updateLastFetched={updateLastFetched}
                        key={applications[i].title}
                    />
                </Grid>);
            }
        }
        return appCards;
    }

    const goFirstPage = () => {
        setPage(0);
        window.scrollTo({top: 200, behavior: 'smooth'});
    }

    const goPreviousPage = () => {
        setPage(page - 1);
        window.scrollTo({top: 200, behavior: 'smooth'});
    }

    const goNextPage = () => {
        setPage(page + 1);
        window.scrollTo({top: 200, behavior: 'smooth'});
    }

    return (
        <div className='animated fadeIn'>
            <br/>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AssociatedSkills filteredSkills={filteredSkills} setFilteredSkills={setFilteredSkills}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SupportStatus filteredStatuses={filteredStatuses} setFilteredStatuses={setFilteredStatuses}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button variant='outlined' onClick={clearFilters} color={'error'}
                            style={{height: '100%', width: '100%'}}>Clear Filters</Button>
                </Grid>
            </Grid>
            <br/><br/>
            <Grid container spacing={2}>
                {generateApplicationCards()}
            </Grid>
            <br/><br/>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
                {page !== 0 ?
                    <Chip className='primary-font' variant="outlined" label="Return to First Page"
                          style={{margin: '0.5rem'}}
                          onClick={(e) => goFirstPage()}>Return to First Page</Chip> :
                    <Chip className='primary-font' variant="outlined" label="Return to First Page"
                          style={{margin: '0.5rem'}}
                          disabled onClick={(e) => goFirstPage()}>Return to First Page</Chip>}
                {page > 0 ?
                    <Chip className='primary-font' variant="outlined" label="Previous Page" style={{margin: '0.5rem'}}
                          onClick={(e) => goPreviousPage()}>Previous Page</Chip> :
                    <Chip className='primary-font' variant="outlined" label="Previous Page" style={{margin: '0.5rem'}}
                          disabled
                          onClick={(e) => goPreviousPage()}>Previous Page</Chip>}
                {applications.length === pageSize ?
                    <Chip className='primary-font' variant="outlined" label="Next Page" style={{margin: '0.5rem'}}
                          onClick={(e) => goNextPage()}>Next Page</Chip> :
                    <Chip className='primary-font' variant="outlined" label="Next Page" style={{margin: '0.5rem'}}
                          disabled
                          onClick={(e) => goNextPage()}>Next Page</Chip>}
            </div>
        </div>
    );

};

export default AllApplicationsPage;
