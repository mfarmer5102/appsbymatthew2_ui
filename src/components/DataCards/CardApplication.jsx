import React, {useContext} from 'react';
import {ApplicationContext} from '../../context/ApplicationContext';
import {Card} from '@mui/material';
import AppDetails from "../CRUDModals/AppDetails";

const CardApplication = (props) => {
    const AppContext = useContext(ApplicationContext);
    return (
        <Card className={'card-bg'} elevation={1} style={{minHeight: '230px'}}>
            <div className='primary-font' style={{fontWeight: '800', padding: '10px 10px 0px 10px'}}>
                {props.data.title}
            </div>
            <br/>
            <img src={props.data.image_url} style={{width: '100%'}}/>
            <br/>
            <AppDetails data={props.data}/>
        </Card>
    );
}

export default CardApplication;
