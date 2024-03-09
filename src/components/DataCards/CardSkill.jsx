import React, {useContext} from 'react';
import {ApplicationContext} from '../../context/ApplicationContext';
import {Card, CardContent, Typography} from '@mui/material';

const CardSkill = (props) => {
    const AppContext = useContext(ApplicationContext);

    return (
        <Card className={'card-bg'} elevation={1} style={{minHeight: '50px'}}>
            <CardContent>
                <div className='primary-font' style={{fontWeight: '800'}}>
                    {props.data.name}
                </div>
            </CardContent>
        </Card>
    );
}

export default CardSkill;
