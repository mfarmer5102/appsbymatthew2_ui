import React, {useEffect} from 'react';
import instashellSetup from "./instashellSetup";
import InstashellApp from "./instashell/InstashellApp";

const App = () => {

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
    }, []);

    return (
        <InstashellApp instashellSetup={instashellSetup}/>
    );

}

export default App;
