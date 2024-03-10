import React, {useContext} from 'react';
import {ApplicationContext} from '../../context/ApplicationContext';
import {Card, CardContent, Typography} from '@mui/material';

const CardSkill = (props) => {
    const AppContext = useContext(ApplicationContext);

    return (
        <Card className={'card-bg'} elevation={1} style={{minHeight: '50px'}}>
            <CardContent>
                <div className='primary-font' style={{fontWeight: '800'}}>
                    <span style={{float: 'left'}}>{props.data.name}</span>
                    <span style={{float: 'right'}}>{props.data.is_featured ? 'Featured Skill!' : null}</span>
                </div>
            </CardContent>
        </Card>
    );
}

export default CardSkill;
