import React from 'react';
import {ArrowBackIos} from "@mui/icons-material";
import {useHistory} from "react-router-dom";

export const PageBase = ({children, pageTitle, hasBackButton}) => {

    const history = useHistory();

    return (<>
            <div className='large-label primary-font'
                 style={{margin: '20px 0', display: 'flex', justifyContent: 'space-between'}}>
                {hasBackButton ?
                    <ArrowBackIos onClick={history.goBack} style={{cursor: 'pointer', marginRight: '10px'}}/> : ""}
                {pageTitle}
            </div>
            {children}
        </>);
}

export default PageBase;
