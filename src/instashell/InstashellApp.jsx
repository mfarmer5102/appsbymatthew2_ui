import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@material-ui/core";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainContainer from "./MainContainer";
import React from "react";
import PageBase from "./PageBase";

const InstashellApp = ({instashellSetup}) => {

    const darkTheme = createTheme({
        palette: {
            // mode: 'dark',
        },
    });

    const generateUnshelledRoutes = () => {
        const unshelledRoutes = [];
        instashellSetup.unshelledRoutesArr.forEach(route => {
            unshelledRoutes.push(<Route
                path={route.path}
                render={(props) => {
                    return (<>
                        {route.targetPageComponent(props)}
                    </>)
                }}
                exact
            />)
        });
        return unshelledRoutes;
    }

    const generateShelledRoutes = () => {
        const shelledRoutes = [];
        instashellSetup.shelledRoutesArr.forEach(route => {
            shelledRoutes.push(<Route
                path={route.path}
                render={(props) => {
                    return (<PageBase pageTitle={route.pageTitle} hasBackButton={route.hasBackButton}>
                        {route.targetPageComponent(props)}
                    </PageBase>);
                }}
                exact
            />)
        });
        return shelledRoutes;
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Router>
                <Switch>
                    {generateUnshelledRoutes()}
                    <MainContainer instashellSetup={instashellSetup}>
                        {generateShelledRoutes()}
                    </MainContainer>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default InstashellApp;
