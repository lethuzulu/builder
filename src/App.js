import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

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
                    component={Link}
                    to={'development'}
                />
                <Tab
                    label='Constraints'
                    component={Link}
                    to={'constraint'}
                />
                <Tab
                    label='Zonal Density'
                    component={Link}
                    to={'zonal'}
                />
                <Tab
                    label='Projections'
                    component={Link}
                    to={'projections'}
                    // disabled={true}
                />
                <Tab
                    label={'Building Type'}
                    component={Link}
                    to={'building'}
                />
                <Tab
                    label={'Zonal Mix'}
                    component={Link}
                    to={'zonalmix'}
                />
            </Tabs>
            <Box>
                <Outlet />
            </Box>
        </div>
    )
}

export default App
