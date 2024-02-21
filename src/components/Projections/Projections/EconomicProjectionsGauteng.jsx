import { Button, DialogActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { updateEconomicGrowth } from './util/helperFunctions'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function EconomicProjectionsGauteng() {
    const navigate = useNavigate()

    const { state } = useLocation()


    let { employmentData, growthRate, geoData, raceData, city } = state

    var city1 = 'Ekurhuleni'
    var city2 ='Johannesburg'
    var city3 = 'Tshwane'
    var city4 = 'Sedibeng'
    var city5 = 'West Rand'

    const [cityGrowthRate1, setCity1GrowthRate] = useState(growthRate.coe_growth_rates)
    const [cityGrowthRate2, setCity2GrowthRate] = useState(growthRate.coj_growth_rates)
    const [cityGrowthRate3, setCity3GrowthRate] = useState(growthRate.cot_growth_rates)
    const [cityGrowthRate4, setCity4GrowthRate] = useState(growthRate.cos_growth_rates)
    const [cityGrowthRate5, setCity5GrowthRate] = useState(growthRate.cow_growth_rates)
    const [cityGeoData1] = useState(geoData.coe_control_totals)
    const [cityGeoData2] = useState(geoData.coj_control_totals)
    const [cityGeoData3] = useState(geoData.cot_control_totals)
    const [cityGeoData4] = useState(geoData.cos_control_totals)
    const [cityGeoData5,] = useState(geoData.cow_control_totals)
    const [cityRaceData1] = useState(raceData.coe_race)
    const [cityRaceData2] = useState(raceData.coj_race)
    const [cityRaceData3] = useState(raceData.cot_race)
    const [cityRaceData4] = useState(raceData.cos_race)
    const [cityRaceData5] = useState(raceData.cow_race)

    // const years = [...new Set(cityGrowthRate1.map((entry) => entry.year))];
    const years = [
        2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
        2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
        2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046,
        2047, 2048, 2049,
    ]

    const handleChange = (event, index, column) => {
        const value = event.target.value
        setCity1GrowthRate(cityGrowthRate1 => {
            const newRow = [...cityGrowthRate1]
            newRow[index][column] = value
            return newRow
        })
    }

    const handleChange2 = (event, index, column) => {
        const value = event.target.value
        setCity2GrowthRate(cityGrowthRate2 => {
            const newRow = [...cityGrowthRate2]
            newRow[index][column] = value
            return newRow
        })
    }

    const handleChange3= (event, index, column) => {
        const value = event.target.value
        setCity3GrowthRate(cityGrowthRate3 => {
            const newRow = [...cityGrowthRate3]
            newRow[index][column] = value
            return newRow
        })
    }

    const handleChange4= (event, index, column) => {
        const value = event.target.value
        setCity4GrowthRate(cityGrowthRate4 => {
            const newRow = [...cityGrowthRate4]
            newRow[index][column] = value
            return newRow
        })
    }

    const handleChange5= (event, index, column) => {
        const value = event.target.value
        setCity5GrowthRate(cityGrowthRate5 => {
            const newRow = [...cityGrowthRate5]
            newRow[index][column] = value
            return newRow
        })
    }

    const updatedEconomicGrowth1 = updateEconomicGrowth(cityGeoData1, cityGrowthRate1)
    const updatedEconomicGrowth2 = updateEconomicGrowth(cityGeoData2, cityGrowthRate2)
    const updatedEconomicGrowth3 = updateEconomicGrowth(cityGeoData3, cityGrowthRate3)
    const updatedEconomicGrowth4 = updateEconomicGrowth(cityGeoData4, cityGrowthRate4)
    const updatedEconomicGrowth5 = updateEconomicGrowth(cityGeoData5, cityGrowthRate5)
    
    const cityGrowthRate = {cityGrowthRate1,cityGrowthRate2,cityGrowthRate3,cityGrowthRate4,cityGrowthRate5}
    const updatedEconomicGrowth = {updatedEconomicGrowth1,updatedEconomicGrowth2,updatedEconomicGrowth3,updatedEconomicGrowth4,updatedEconomicGrowth5}
    const cityRaceData = {cityRaceData1,cityRaceData2,cityRaceData3,cityRaceData4,cityRaceData5}


    return (
        <>
        <TableContainer component={Paper} sx={{ height: '26vh' }}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <Typography variant="h6" fontWeight="bold">All Economic Projections</Typography>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Year</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Change In Economic Growth(%)</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                                years.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center' scope="row">
                                            <Typography >{row}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <TextField type="number" variant='standard' onChange={(event) => {
                                                handleChange(event, index, 'change_economic');
                                                handleChange2(event, index, 'change_economic');
                                                handleChange3(event, index, 'change_economic')
                                                handleChange4(event, index, 'change_economic')
                                                handleChange5(event, index, 'change_economic');
                                            }} />
                                        </TableCell>

                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
        <Typography variant="h6" fontWeight="bold">{city1} Economic Projections</Typography>
            <TableContainer component={Paper} sx={{ height: '26vh' }}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Year</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Projected Economic Growth(%)</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Change In Economic Growth(%)</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">New Economic Growth</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cityGrowthRate1.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center' scope="row">
                                            <Typography >{row.year}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <Typography>{row.predicted_economic_growth}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <TextField type="number" value={row.change_economic} variant='standard' onChange={(event) => handleChange(event, index, 'change_economic')} />
                                        </TableCell>

                                        <TableCell align='center' >
                                            <Typography>{(parseFloat(row.predicted_economic_growth) + parseFloat(row.change_economic)).toFixed(2)}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <Typography variant="h6" fontWeight="bold">{city2} Economic Projections</Typography>
            <TableContainer component={Paper} sx={{ height: '26vh' }}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Year</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Projected Economic Growth(%)</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Change In Economic Growth(%)</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">New Economic Growth</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cityGrowthRate2.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center' scope="row">
                                            <Typography >{row.year}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <Typography>{row.predicted_economic_growth}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <TextField type="number" value={row.change_economic} variant='standard' onChange={(event) => handleChange2(event, index, 'change_economic')} />
                                        </TableCell>

                                        <TableCell align='center' >
                                            <Typography>{(parseFloat(row.predicted_economic_growth) + parseFloat(row.change_economic)).toFixed(2)}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <Typography variant="h6" fontWeight="bold">{city3} Economic Projections</Typography>
            <TableContainer component={Paper} sx={{ height: '26vh' }}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Year</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Projected Economic Growth(%)</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Change In Economic Growth(%)</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">New Economic Growth</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cityGrowthRate3.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center' scope="row">
                                            <Typography >{row.year}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <Typography>{row.predicted_economic_growth}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <TextField type="number" value={row.change_economic} variant='standard' onChange={(event) => handleChange3(event, index, 'change_economic')} />
                                        </TableCell>

                                        <TableCell align='center' >
                                            <Typography>{(parseFloat(row.predicted_economic_growth) + parseFloat(row.change_economic)).toFixed(2)}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <Typography variant="h6" fontWeight="bold">{city4} Economic Projections</Typography>
            <TableContainer component={Paper} sx={{ height: '26vh' }}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Year</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Projected Economic Growth(%)</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Change In Economic Growth(%)</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">New Economic Growth</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cityGrowthRate4.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center' scope="row">
                                            <Typography >{row.year}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <Typography>{row.predicted_economic_growth}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <TextField type="number" value={row.change_economic} variant='standard' onChange={(event) => handleChange4(event, index, 'change_economic')} />
                                        </TableCell>

                                        <TableCell align='center' >
                                            <Typography>{(parseFloat(row.predicted_economic_growth) + parseFloat(row.change_economic)).toFixed(2)}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <Typography variant="h6" fontWeight="bold">{city5} Economic Projections</Typography>
            <TableContainer component={Paper} sx={{ height: '26vh' }}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Year</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Projected Economic Growth(%)</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">Change In Economic Growth(%)</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="h7" fontWeight="bold">New Economic Growth</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cityGrowthRate5.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center' scope="row">
                                            <Typography >{row.year}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <Typography>{row.predicted_economic_growth}</Typography>
                                        </TableCell>

                                        <TableCell align='center' >
                                            <TextField type="number" value={row.change_economic} variant='standard' onChange={(event) => handleChange5(event, index, 'change_economic')} />
                                        </TableCell>

                                        <TableCell align='center' >
                                            <Typography>{(parseFloat(row.predicted_economic_growth) + parseFloat(row.change_economic)).toFixed(2)}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <DialogActions>
                <Button onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Button component={Link} to='/population_projections_gauteng' state={{ updatedEconomicGrowth, cityGrowthRate, cityRaceData, employmentData, city }}>
                    Population Projections
                </Button>
            </DialogActions>
        </>
    )
}
