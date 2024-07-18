import React, {useContext} from 'react';
import {ApplicationContext} from '../../context/ApplicationContext';
import {Card, CardContent, Skeleton, Typography} from '@mui/material';

const CardSkill = (props) => {
    const AppContext = useContext(ApplicationContext);

    return (
        <Card className={'card-bg'} elevation={1} style={{minHeight: '50px'}}>
            <CardContent>
                <div className='primary-font' style={{fontWeight: '800'}}>
                    <Skeleton variant="rounded" width={'70%'}/>
                </div>
            </CardContent>
        </Card>
    );
}

export default CardSkill;
