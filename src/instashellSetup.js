import FeaturedApplicationsPage from "./pages/FeaturedApplications";
import AllApplicationsPage from "./pages/AllApplications";
import SkillsPage from "./pages/Skills";
import ThemePicker from "./components/Other/ThemePicker";
import packageJson from '../package.json';
import React from "react";
import WelcomeDialog from "./components/CRUDModals/Welcome";

const instashellSetup = {
    applicationVersion: packageJson.version,
    unshelledRoutesArr: [],
    shelledRoutesArr: [
        {
            path: "/",
            pageTitle: 'Featured Apps',
            hasBackButton: false,
            targetPageComponent: (props) => <FeaturedApplicationsPage/>
        },
        {
            path: "/allApplications",
            pageTitle: 'All Applications',
            hasBackButton: false,
            targetPageComponent: (props) => <AllApplicationsPage/>
        },
        // {
        //     path: "/featuredSkills",
        //     pageTitle: 'Featured Skills',
        //     hasBackButton: false,
        //     targetPageComponent: (props) => <SkillsPage/>
        // },
        {
            path: "/allSkills",
            pageTitle: 'All Skills',
            hasBackButton: false,
            targetPageComponent: (props) => <SkillsPage/>
        }
    ],
    sidebarHeader: {
        titleLabel: 'AppsByMatthew.com',
        titleFont: 'Reenie Beanie',
        titleSize: '26px'
    },
    sidebarItemsArr: [
        {type: 'link', label: 'Applications', path: '#'},
        {type: 'sublink', label: 'Featured Apps', path: '/'},
        {type: 'sublink', label: 'All Applications', path: '/allApplications'},
        {type: 'break'},
        {type: 'link', label: 'Skills', path: '#'},
        // {type: 'sublink', label: 'Featured Skills', path: '/featuredSkills'},
        {type: 'sublink', label: 'All Skills', path: '/allSkills'},
        {type: 'break'},
        {type: 'link', label: 'Links', path: '#'},
        {type: 'externalSublink', label: 'GitHub', path: 'https://github.com/mfarmer5102'},
        {type: 'externalSublink', label: 'LinkedIn', path: 'https://www.linkedin.com/in/matthew-farmer-204930182'},
        {type: 'break'},
        {type: 'component', component: <WelcomeDialog/>}
    ],
    footerItemsArr: [
        {
            title: "Links",
            contents: [
                {type: 'externalLink', label: 'GitHub', path: 'https://github.com/mfarmer5102'},
                {type: 'externalLink', label: 'LinkedIn', path: 'https://www.linkedin.com/in/matthew-farmer-204930182'}
            ]
        },
        {
            title: "Applications",
            contents: [
                {type: 'link', label: 'Featured', path: '/'},
                {type: 'link', label: 'All', path: '/allApplications'}
            ]
        },
        {
            title: "Skills",
            contents: [
                {type: 'link', label: 'All', path: '/allSkills'}
            ]
        },
        // {
        //     title: "Theme",
        //     contents: [
        //         // {type: 'component', component: <ThemePicker label={'Retro'} value={'retro'}/>},
        //         {type: 'component', component: <ThemePicker label={'Light'} value={'light'}/>},
        //         {type: 'component', component: <ThemePicker label={'Dark'} value={'dark'}/>},
        //         {type: 'component', component: <ThemePicker label={'Blue'} value={'blue'}/>},
        //         {type: 'component', component: <ThemePicker label={'Pink'} value={'pink'}/>},
        //     ]
        // }
    ]
}

export default instashellSetup;
