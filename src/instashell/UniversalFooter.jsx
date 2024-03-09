import React from 'react';
import {NavLink} from 'react-router-dom';
import {Grid,} from '@material-ui/core';
import moment from "moment";

const UniversalFooter = ({instashellSetup}) => {

    const generateFooterColumns = () => {
        const contentsArr = [];
        contentsArr.push(
            <Grid item xs={12} sm={3}>
                <div className='small-label primary-font'>Application version {instashellSetup.applicationVersion}</div>
            </Grid>
        );
        instashellSetup.footerItemsArr.forEach(col => {
            const subContentsArr = [];
            col.contents.forEach(item => {
                if (item?.type === 'link') {
                    subContentsArr.push(
                        <NavLink to={item?.path}>
                            <div className='small-label primary-font'>{item?.label}</div>
                        </NavLink>
                    );
                }
                else if (item?.type === 'externalLink') {
                    subContentsArr.push(
                        <a href={item?.path} target={'_blank'}>
                            <div className='small-label primary-font'>{item?.label}</div>
                        </a>
                    );
                }
                else if (item?.type === 'component') {
                    subContentsArr.push(item.component)
                }
            });
            contentsArr.push(
                <Grid item xs={12} sm={3}>
                    <div className='medium-label primary-font'>{col?.title}</div>
                    {subContentsArr}
                </Grid>
            );
        });
        contentsArr.push(
            <Grid item xs={12} sm={12}>
                <br/><br/>
                <div className='small-label primary-font'>© Matthew Farmer {moment().year()}</div>
            </Grid>
        );
        return contentsArr;
    }

    return (
        <div
            id="universalFooter"
            style={{
                bottom: '0px',
                width: '100%',
                position: 'relative',
                padding: '1.5rem',
                paddingLeft: '250px',
                minHeight: '300px'
            }}
        >
            <Grid container spacing={0}>
                {generateFooterColumns()}
            </Grid>
        </div>
    );
}

export default UniversalFooter;
