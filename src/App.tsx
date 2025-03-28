import React, {useEffect} from 'react';
import instashellSetup from "./instashellSetup";
import InstashellApp from "./instashell/InstashellApp";
import ChatBox from "./components/ChatBox";

const App = () => {

    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
    }, []);

    return (
        <>
            <InstashellApp instashellSetup={instashellSetup}/>
            <ChatBox/>
        </>
    );

}

export default App;
