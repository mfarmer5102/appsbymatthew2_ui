import React from 'react';
import {NavLink} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {Drawer} from "@mui/material";

const UniversalSidebar = ({instashellSetup}) => {

    const generateSidebarItems = () => {
        const componentsArr = [];
        instashellSetup.sidebarItemsArr.forEach(item => {
            if (item.type === 'link') {
                componentsArr.push(<NavLink to={item.path}>
                    <ListItem className={'sidebar-option'}>
					<span className='medium-label sidebar-font'>
						{item.label}
					</span>
                    </ListItem>
                </NavLink>);
            }
            else if (item.type === 'sublink') {
                componentsArr.push(<NavLink to={item.path}>
                    <ListItem className={'sidebar-option'}>
					<span className='small-label sidebar-font' style={{paddingLeft: '0px'}}>
						{item.label}
					</span>
                    </ListItem>
                </NavLink>);
            }
            else if (item.type === 'externalSublink') {
                componentsArr.push(
                    <ListItem className={'sidebar-option'}>
                        <a href={item?.path} target={'_blank'}>
                            <div className='small-label primary-font' style={{paddingLeft: '0px'}}>
                                {item?.label}
                            </div>
                        </a>
                    </ListItem>
                );
            }
            else if (item.type === 'component') {
                componentsArr.push(
                    <NavLink to={'#'}>
                        <ListItem className={'sidebar-option'}>
                            <span className='medium-label sidebar-font'>
                                {item.component}
                            </span>
                        </ListItem>
                    </NavLink>
                );
            }
            else if (item.type === 'break') {
                componentsArr.push(<br/>)
            }
        });
        return componentsArr;
    }

    const SidebarHeader = () => {
        return (<div>
            <br/>
            <h2 className={'sidebar-font'} style={{
                fontFamily: instashellSetup?.sidebarHeader?.titleFont,
                textAlign: 'center',
                fontSize: instashellSetup?.sidebarHeader?.titleSize,
                margin: '0px 0px 10px 0px'
            }}>
                {instashellSetup?.sidebarHeader?.titleLabel}
            </h2>
        </div>);
    }

    return (
        <>
            <Drawer variant="permanent" anchor="left">
                <List style={{padding: '20px', width: '230px'}}>
                    <SidebarHeader/>
                    <br/>
                    {generateSidebarItems()}
                </List>
            </Drawer>
        </>
    );
};

// export default Drawer;
export default UniversalSidebar;
