import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {ApplicationContext} from '../context/ApplicationContext';
import {Chip, Grid} from '@material-ui/core';
import CardApplication from '../components/DataCards/CardApplication';
import {getApplications} from "../services/applications.service";

const AllApplicationsPage = ({sourceKey, sourceName, sourceTypeKey}) => {
    const AppContext = useContext(ApplicationContext);
    const [applications, setApplications] = useState([]);
    const [lastFetched, setLastFetched] = useState(new Date());
    const [entries, setEntries] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [sortColumn, setSortColumn] = useState('entry_date');
    const [sortDirection, setSortDirection] = useState(-1);
    const [isRespondedServer, setIsRespondedServer] = useState(false);

    useEffect(async () => {
        setIsRespondedServer(false);
        window.scrollTo(0, 0);
        try {
            const apps = await getApplications();
            setApplications(apps);
        } catch (e) {
            AppContext.handleError('Unable to load applications.');
        }
        setIsRespondedServer(true);
    }, [page, sortColumn, sortDirection, lastFetched]);

    const updateLastFetched = () => setLastFetched(new Date());

    const generateEntryCards = () => {
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
                    <CardApplication data={applications[i]} updateLastFetched={updateLastFetched}/>
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
            <Grid container spacing={2}>
                {generateEntryCards()}
            </Grid>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
                {page !== 0 ?
                    <Chip className='primary-font' variant="outlined" label="Return to First Page" style={{margin: '0.5rem'}}
                          onClick={(e) => goFirstPage()}>Return to First Page</Chip> :
                    <Chip className='primary-font' variant="outlined" label="Return to First Page" style={{margin: '0.5rem'}}
                          disabled onClick={(e) => goFirstPage()}>Return to First Page</Chip>}
                {page > 0 ? <Chip className='primary-font' variant="outlined" label="Previous Page" style={{margin: '0.5rem'}}
                                  onClick={(e) => goPreviousPage()}>Previous Page</Chip> :
                    <Chip className='primary-font' variant="outlined" label="Previous Page" style={{margin: '0.5rem'}} disabled
                          onClick={(e) => goPreviousPage()}>Previous Page</Chip>}
                {entries.length === pageSize ?
                    <Chip className='primary-font' variant="outlined" label="Next Page" style={{margin: '0.5rem'}}
                          onClick={(e) => goNextPage()}>Next Page</Chip> :
                    <Chip className='primary-font' variant="outlined" label="Next Page" style={{margin: '0.5rem'}} disabled
                          onClick={(e) => goNextPage()}>Next Page</Chip>}
            </div>
        </div>
    );

};

export default AllApplicationsPage;
