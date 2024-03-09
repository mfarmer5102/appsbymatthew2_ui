import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {ApplicationContext} from '../context/ApplicationContext';
import {Chip, Grid} from '@material-ui/core';
import CardApplication from '../components/DataCards/CardApplication';
// import CardEntrySkeleton from '../components/DataCards/CardEntrySkeleton';
import {getApplications} from "../services/applications.service";

const FeaturedApplicationsPage = ({sourceKey, sourceName, sourceTypeKey}) => {
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
            const apps = await getApplications('featured=true');
            setApplications(apps);
        } catch (e) {
            AppContext.handleError('Unable to load applications.');
        }
        setIsRespondedServer(true);
    }, [page, sortColumn, sortDirection, lastFetched]);

    const updateLastFetched = () => setLastFetched(new Date());

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
                appCards.push(<Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={applications[i]._id}>
                    <CardApplication data={applications[i]} updateLastFetched={updateLastFetched}/>
                </Grid>);
            }
        }
        return appCards;
    }

    return (
        <div className='animated fadeIn'>
            <Grid container spacing={2}>
                {generateApplicationCards()}
            </Grid>
        </div>
    );

};

export default FeaturedApplicationsPage;
