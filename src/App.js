import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import Header from './components/Header'

function App() {
    const [activeTab, setActiveTab] = React.useState(1)

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue)
    }
    return (
        <Fragment>
            <Header />
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
                    to={'zonal_density'}
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
                    to={'building_type'}
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
        </Fragment>
    )
}

export default App
