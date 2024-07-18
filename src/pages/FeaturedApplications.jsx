import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {ApplicationContext} from '../context/ApplicationContext';
import {Chip, Grid} from '@material-ui/core';
import CardApplication from '../components/DataCards/CardApplication';
// import CardEntrySkeleton from '../components/DataCards/CardEntrySkeleton';
import {getApplications} from "../services/applications.service";
import SkeletonCardApplication from "../components/DataCards/SkeletonCardApplication";

const FeaturedApplicationsPage = () => {
    const AppContext = useContext(ApplicationContext);
    const [applications, setApplications] = useState([]);
    const [lastFetched, setLastFetched] = useState(new Date());
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(12);
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
    }, [page, lastFetched]);

    const updateLastFetched = () => setLastFetched(new Date());

    const generateApplicationCards = () => {
        let appCards = [];
        if (!isRespondedServer) {
            for (let i = 0; i < 2; i++) {
                appCards.push(<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <SkeletonCardApplication/>
                </Grid>);
            }
        } else if (isRespondedServer && !applications.length) {
            return (<Grid item xs={12}>
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                    No applications to show.
                </div>
                <br/>
            </Grid>);
        } else {
            for (let i = 0; i < applications.length; i++) {
                applications[i].published_date = moment(applications[i].published_date).utc();
                appCards.push(<Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={applications[i]._id}>
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
