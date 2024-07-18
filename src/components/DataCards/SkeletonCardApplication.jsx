import React, {useContext} from 'react';
import {ApplicationContext} from '../../context/ApplicationContext';
import {Card, Skeleton} from '@mui/material';

const CardApplication = (props) => {
    const AppContext = useContext(ApplicationContext);
    return (
        <Card className={'card-bg'} elevation={1} style={{minHeight: '230px'}}>
            <div className='primary-font' style={{fontWeight: '800', padding: '10px 10px 10px 10px'}}>
                <div className='primary-font' style={{fontWeight: '800', padding: '10px 10px 0px 10px'}}>
                    <Skeleton variant="rounded" width={'50%'} height={'20px'}/>
                </div>
            </div>
            <br/>
            <div>
                <img src={'https://placehold.co/600x360?text=Loading...'} className='animated flash infinite slower' style={{width: '100%'}}/>
            </div>
        </Card>
    );
}

export default CardApplication;
