import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import DevelopmentGroup from './components/Development-Projects/DevelopmentGroup'
import DevelopmentProject from './components/Development-Projects/DevelopmentProject'
import ConstraintGroup from './components/Contraints-Tool/ConstraintGroup'
import ConstraintProject from './components/Contraints-Tool/ConstraintProject'
import ZonalProject from './components/Zonal-Density/ZonalProject'
import ZonalGroup from './components/Zonal-Density/ZonalGroup'
import BuildingTypeGroup from './components/Building-Types/BuildingTypeGroup'
import ZonalMixGroup from './components/Zonal-Mix/ZonalMixGroup'

import ZonalMixProject from './components/Zonal-Mix/ZonalMixProject'
import BuildingTypeProject from './components/Building-Types/BuildingTypeProject'
import { ThemeProvider, createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import setHeaders from './utils/setHeaders'

if (localStorage.token) {
    setHeaders(localStorage.token)
}
const theme = createTheme({
    palette: {
        primary: {
            main: '#01366a',
        },
        secondary: {
            main: grey[100],
        },
    },
})

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <Navigate
                        to='/development'
                        replace={true}
                    />
                ),
            },
            {
                path: '*',
                element: (
                    <Navigate
                        to={'/development'}
                        replace={true}
                    />
                ),
            },
            {
                path: '/development',
                element: <DevelopmentGroup />,
            },
            {
                path: '/development/:group_id',
                element: <DevelopmentProject />,
            },
            {
                path: '/constraint',
                element: <ConstraintGroup />,
            },
            {
                path: '/constraint/:group_id',
                element: <ConstraintProject />,
            },
            {
                path: '/zonal_density',
                element: <ZonalGroup />,
            },
            {
                path: '/zonal_density/:group_id',
                element: <ZonalProject />,
            },
            {
                path: '/building_type',
                element: <BuildingTypeGroup />,
            },
            {
                path: '/building_type/:group_id',
                element: <BuildingTypeProject />,
            },
            {
                path: '/zonalmix',
                element: <ZonalMixGroup />,
            },
            {
                path: '/zonalmix/:group_id',
                element: <ZonalMixProject />,
            },
        ],
    },
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
