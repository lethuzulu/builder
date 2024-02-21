import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import Header from './components/Header'
import ConstructionIcon from '@mui/icons-material/Construction'
import TuneIcon from '@mui/icons-material/Tune'
import LayersIcon from '@mui/icons-material/Layers'
import ApartmentIcon from '@mui/icons-material/Apartment'
import BlenderIcon from '@mui/icons-material/Blender';

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
                    icon={<ConstructionIcon />}
                    to={'development'}
                />
                <Tab
                    label='Constraints'
                    component={Link}
                    icon={<TuneIcon />}
                    to={'constraint'}
                />
                <Tab
                    label='Zonal Density'
                    component={Link}
                    icon={<LayersIcon />}
                    to={'zonal_density'}
                />
                <Tab
                    label={'Building Type'}
                    component={Link}
                    icon={<ApartmentIcon />}
                    to={'building_type'}
                />
                <Tab
                    label={'Zonal Mix'}
                    component={Link}
                    icon={<BlenderIcon />}
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
