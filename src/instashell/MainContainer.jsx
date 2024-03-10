import React from 'react';
import UniversalSidebar from './UniversalSidebar';
import UniversalFooter from './UniversalFooter';

const MainContainer = ({instashellSetup, children}) => {
    return (<>
        <div>
            <UniversalSidebar instashellSetup={instashellSetup}/>
            <main style={{marginLeft: '230px', padding: '30px', minHeight: '30rem', marginBottom: '1.5rem'}}>
                {children}
            </main>
        </div>
        <UniversalFooter instashellSetup={instashellSetup}/>
    </>);
}

export default MainContainer;
