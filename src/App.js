import { Tab, Tabs } from '@mui/material'
import React from 'react'
import BuildingType from './components/Building-Types/Main'
import ZonalMix from './components/Zonal-Mix/Main'

function App() {
    const [activeTab, setActiveTab] = React.useState(1)

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue)
    }
    return (
        <div>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant='fullWidth'>
                <Tab
                    label='Development Project'
                />
                <Tab
                    label='Constraints'
                />
                <Tab
                    label='Zonal Density'
                />
                <Tab
                    label='Projections'
                />
                <Tab label={'Building Type'} />
                <Tab label={'Zonal Mix'} />
            </Tabs>
            {activeTab === 0 && <BuildingType />}
            {activeTab === 1 && <ZonalMix />}
        </div>
    )
}

export default App
