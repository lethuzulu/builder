import {
    Button,
    DialogActions,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { updateEconomicGrowth } from './util/helperFunctions'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function EconomicProjectionsMultiple() {
    const navigate = useNavigate()

    const { state } = useLocation()

    let { employmentData, growthRate, geoData, raceData, city } = state

    var city1 = 'Ekurhuleni'
    var city2 = 'Johannesburg'
    var city3 = 'Tshwane'
    // var coe_growth = growthRate.coe_growth_rates 
    var coj_growth = growthRate.coj_growth_rates
    var cot_growth = growthRate.cot_growth_rates

    const [cityGrowthRate1, setCity1GrowthRate] = useState([
        {
            "year":2011,
            "munic":"coj",
            "predicted_population_growth":3.32,
            "change":0,
            "predicted_economic_growth":2.73,
            "change_economic":0
        },
        {
            "year":2012,
            "munic":"coj",
            "predicted_population_growth":3.24,
            "change":0,
            "predicted_economic_growth":2.85,
            "change_economic":0
        },
        {
            "year":2013,
            "munic":"coj",
            "predicted_population_growth":3.15,
            "change":0,
            "predicted_economic_growth":2.58,
            "change_economic":0
        },
        {
            "year":2014,
            "munic":"coj",
            "predicted_population_growth":3.07,
            "change":0,
            "predicted_economic_growth":1.80,
            "change_economic":0
        },
        {
            "year":2015,
            "munic":"coj",
            "predicted_population_growth":2.97,
            "change":0,
            "predicted_economic_growth":0.76,
            "change_economic":0
        },
        {
            "year":2016,
            "munic":"coj",
            "predicted_population_growth":2.88,
            "change":0,
            "predicted_economic_growth":1.25,
            "change_economic":0
        },
        {
            "year":2017,
            "munic":"coj",
            "predicted_population_growth":2.80,
            "change":0,
            "predicted_economic_growth":0.89,
            "change_economic":0
        },
        {
            "year":2018,
            "munic":"coj",
            "predicted_population_growth":2.72,
            "change":0,
            "predicted_economic_growth":1.95,
            "change_economic":0
        },
        {
            "year":2019,
            "munic":"coj",
            "predicted_population_growth":2.65,
            "change":0,
            "predicted_economic_growth":0.72,
            "change_economic":0
        },
        {
            "year":2020,
            "munic":"coj",
            "predicted_population_growth":2.58,
            "change":0,
            "predicted_economic_growth":-4.75,
            "change_economic":0
        },
        {
            "year":2021,
            "munic":"coj",
            "predicted_population_growth":2.51,
            "change":0,
            "predicted_economic_growth":4.18,
            "change_economic":0
        },
        {
            "year":2022,
            "munic":"coj",
            "predicted_population_growth":2.46,
            "change":0,
            "predicted_economic_growth":2.72,
            "change_economic":0
        },
        {
            "year":2023,
            "munic":"coj",
            "predicted_population_growth":2.40,
            "change":0,
            "predicted_economic_growth":1.69,
            "change_economic":0
        },
        {
            "year":2024,
            "munic":"coj",
            "predicted_population_growth":2.35,
            "change":0,
            "predicted_economic_growth":2.14,
            "change_economic":0
        },
        {
            "year":2025,
            "munic":"coj",
            "predicted_population_growth":2.31,
            "change":0,
            "predicted_economic_growth":2.09,
            "change_economic":0
        },
        {
            "year":2026,
            "munic":"coj",
            "predicted_population_growth":2.27,
            "change":0,
            "predicted_economic_growth":2.36,
            "change_economic":0
        },
        {
            "year":2027,
            "munic":"coj",
            "predicted_population_growth":2.24,
            "change":0,
            "predicted_economic_growth":2.41,
            "change_economic":0
        },
        {
            "year":2028,
            "munic":"coj",
            "predicted_population_growth":2.21,
            "change":0,
            "predicted_economic_growth":2.50,
            "change_economic":0
        },
        {
            "year":2029,
            "munic":"coj",
            "predicted_population_growth":2.19,
            "change":0,
            "predicted_economic_growth":2.60,
            "change_economic":0
        },
        {
            "year":2030,
            "munic":"coj",
            "predicted_population_growth":2.16,
            "change":0,
            "predicted_economic_growth":2.92,
            "change_economic":0
        },
        {
            "year":2031,
            "munic":"coj",
            "predicted_population_growth":2.13,
            "change":0,
            "predicted_economic_growth":3.03,
            "change_economic":0
        },
        {
            "year":2032,
            "munic":"coj",
            "predicted_population_growth":2.11,
            "change":0,
            "predicted_economic_growth":2.88,
            "change_economic":0
        },
        {
            "year":2033,
            "munic":"coj",
            "predicted_population_growth":2.08,
            "change":0,
            "predicted_economic_growth":2.83,
            "change_economic":0
        },
        {
            "year":2034,
            "munic":"coj",
            "predicted_population_growth":2.05,
            "change":0,
            "predicted_economic_growth":2.66,
            "change_economic":0
        },
        {
            "year":2035,
            "munic":"coj",
            "predicted_population_growth":2.01,
            "change":0,
            "predicted_economic_growth":2.56,
            "change_economic":0
        },
        {
            "year":2036,
            "munic":"coj",
            "predicted_population_growth":1.97,
            "change":0,
            "predicted_economic_growth":2.61,
            "change_economic":0
        },
        {
            "year":2037,
            "munic":"coj",
            "predicted_population_growth":1.93,
            "change":0,
            "predicted_economic_growth":2.55,
            "change_economic":0
        },
        {
            "year":2038,
            "munic":"coj",
            "predicted_population_growth":1.91,
            "change":0,
            "predicted_economic_growth":2.39,
            "change_economic":0
        },
        {
            "year":2039,
            "munic":"coj",
            "predicted_population_growth":1.89,
            "change":0,
            "predicted_economic_growth":2.31,
            "change_economic":0
        },
        {
            "year":2040,
            "munic":"coj",
            "predicted_population_growth":1.89,
            "change":0,
            "predicted_economic_growth":2.13,
            "change_economic":0
        },
        {
            "year":2041,
            "munic":"coj",
            "predicted_population_growth":1.89,
            "change":0,
            "predicted_economic_growth":2.02,
            "change_economic":0
        },
        {
            "year":2042,
            "munic":"coj",
            "predicted_population_growth":1.89,
            "change":0,
            "predicted_economic_growth":2.00,
            "change_economic":0
        },
        {
            "year":2043,
            "munic":"coj",
            "predicted_population_growth":1.89,
            "change":0,
            "predicted_economic_growth":2.02,
            "change_economic":0
        },
        {
            "year":2044,
            "munic":"coj",
            "predicted_population_growth":1.89,
            "change":0,
            "predicted_economic_growth":2.00,
            "change_economic":0
        }
        ,
        {
            "year":2045,
            "munic":"coj",
            "predicted_population_growth":1.89,
            "change":0,
            "predicted_economic_growth":1.91,
            "change_economic":0
        }
        ,
        {
            "year":2046,
            "munic":"coj",
            "predicted_population_growth":1.36,
            "change":0,
            "predicted_economic_growth":2.02,
            "change_economic":0
        }
        ,
        {
            "year":2047,
            "munic":"coj",
            "predicted_population_growth":1.30,
            "change":0,
            "predicted_economic_growth":2.02,
            "change_economic":0
        }
        ,
        {
            "year":2048,
            "munic":"coj",
            "predicted_population_growth":1.26,
            "change":0,
            "predicted_economic_growth":2.04,
            "change_economic":0
        }
        ,
        {
            "year":2049,
            "munic":"coj",
            "predicted_population_growth":1.22,
            "change":0,
            "predicted_economic_growth":2.01,
            "change_economic":0
        }
    ])
    const [cityGrowthRate2, setCity2GrowthRate] = useState(coj_growth)
    const [cityGrowthRate3, setCity3GrowthRate] = useState(cot_growth)
    const [cityGeoData1] = useState(geoData.coe_control_totals)
    const [cityGeoData2] = useState(geoData.coj_control_totals)
    const [cityGeoData3] = useState(geoData.cot_control_totals)
    const [cityRaceData1] = useState(raceData.coe_race)
    const [cityRaceData2] = useState(raceData.coe_race)
    const [cityRaceData3] = useState(raceData.coe_race)

    // const years = [...new Set(cityGrowthRate1.map((entry) => entry.year))]

    // console.log('years   ', years)

    const years = [
        2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
        2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
        2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046,
        2047, 2048, 2049,
    ]
 

    const handleChange = (event, index, column) => {
        const value = event.target.value
        setCity1GrowthRate((cityGrowthRate1) => {
            const newRow = [...cityGrowthRate1]
            newRow[index][column] = value
            return newRow
        })
    }

    const handleChange2 = (event, index, column) => {
        const value = event.target.value
        setCity2GrowthRate((cityGrowthRate2) => {
            const newRow = [...cityGrowthRate2]
            newRow[index][column] = value
            return newRow
        })
    }

    const handleChange3 = (event, index, column) => {
        const value = event.target.value
        setCity3GrowthRate((cityGrowthRate3) => {
            const newRow = [...cityGrowthRate3]
            newRow[index][column] = value
            return newRow
        })
    }

    const updatedEconomicGrowth1 = updateEconomicGrowth(
        cityGeoData1,
        cityGrowthRate1
    )
    const updatedEconomicGrowth2 = updateEconomicGrowth(
        cityGeoData2,
        cityGrowthRate2
    )
    const updatedEconomicGrowth3 = updateEconomicGrowth(
        cityGeoData3,
        cityGrowthRate3
    )

    const cityGrowthRate = { cityGrowthRate1, cityGrowthRate2, cityGrowthRate3 }
    const updatedEconomicGrowth = {
        updatedEconomicGrowth1,
        updatedEconomicGrowth2,
        updatedEconomicGrowth3,
    }
    const cityRaceData = { cityRaceData1, cityRaceData2, cityRaceData3 }

    return (
        <>
            <Typography
                variant='h6'
                fontWeight='bold'>
                All Economic Projections
            </Typography>
            <TableContainer
                component={Paper}
                sx={{ height: '26vh' }}>
                <Table
                    stickyHeader
                    size='small'
                    aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Year
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Change In Economic Growth(%)
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {years.map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell
                                        align='center'
                                        scope='row'>
                                        <Typography>{row}</Typography>
                                    </TableCell>

                                    <TableCell align='center'>
                                        <TextField
                                            type='number'
                                            variant='standard'
                                            onChange={(event) => {
                                                handleChange(
                                                    event,
                                                    index,
                                                    'change_economic'
                                                )
                                                handleChange2(
                                                    event,
                                                    index,
                                                    'change_economic'
                                                )
                                                handleChange3(
                                                    event,
                                                    index,
                                                    'change_economic'
                                                )
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <Typography
                variant='h6'
                fontWeight='bold'>
                {city1} Economic Projections
            </Typography>
            <TableContainer
                component={Paper}
                sx={{ height: '26vh' }}>
                <Table
                    stickyHeader
                    size='small'
                    aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Year
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Projected Economic Growth(%)
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Change In Economic Growth(%)
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    New Economic Growth
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cityGrowthRate1.map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell
                                        align='center'
                                        scope='row'>
                                        <Typography>{row.year}</Typography>
                                    </TableCell>

                                    <TableCell align='center'>
                                        <Typography>
                                            {row.predicted_economic_growth}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align='center'>
                                        <TextField
                                            type='number'
                                            value={row.change_economic}
                                            variant='standard'
                                            onChange={(event) =>
                                                handleChange(
                                                    event,
                                                    index,
                                                    'change_economic'
                                                )
                                            }
                                        />
                                    </TableCell>

                                    <TableCell align='center'>
                                        <Typography>
                                            {(
                                                parseFloat(
                                                    row.predicted_economic_growth
                                                ) +
                                                parseFloat(row.change_economic)
                                            ).toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <Typography
                variant='h6'
                fontWeight='bold'>
                {city2} Economic Projections
            </Typography>
            <TableContainer
                component={Paper}
                sx={{ height: '26vh' }}>
                <Table
                    stickyHeader
                    size='small'
                    aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Year
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Projected Economic Growth(%)
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Change In Economic Growth(%)
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    New Economic Growth
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cityGrowthRate2.map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell
                                        align='center'
                                        scope='row'>
                                        <Typography>{row.year}</Typography>
                                    </TableCell>

                                    <TableCell align='center'>
                                        <Typography>
                                            {row.predicted_economic_growth}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align='center'>
                                        <TextField
                                            type='number'
                                            value={row.change_economic}
                                            variant='standard'
                                            onChange={(event) =>
                                                handleChange2(
                                                    event,
                                                    index,
                                                    'change_economic'
                                                )
                                            }
                                        />
                                    </TableCell>

                                    <TableCell align='center'>
                                        <Typography>
                                            {(
                                                parseFloat(
                                                    row.predicted_economic_growth
                                                ) +
                                                parseFloat(row.change_economic)
                                            ).toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <Typography
                variant='h6'
                fontWeight='bold'>
                {city3} Economic Projections
            </Typography>
            <TableContainer
                component={Paper}
                sx={{ height: '26vh' }}>
                <Table
                    stickyHeader
                    size='small'
                    aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Year
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Projected Economic Growth(%)
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    Change In Economic Growth(%)
                                </Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography
                                    variant='h7'
                                    fontWeight='bold'>
                                    New Economic Growth
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cityGrowthRate3.map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell
                                        align='center'
                                        scope='row'>
                                        <Typography>{row.year}</Typography>
                                    </TableCell>

                                    <TableCell align='center'>
                                        <Typography>
                                            {row.predicted_economic_growth}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align='center'>
                                        <TextField
                                            type='number'
                                            value={row.change_economic}
                                            variant='standard'
                                            onChange={(event) =>
                                                handleChange3(
                                                    event,
                                                    index,
                                                    'change_economic'
                                                )
                                            }
                                        />
                                    </TableCell>

                                    <TableCell align='center'>
                                        <Typography>
                                            {(
                                                parseFloat(
                                                    row.predicted_economic_growth
                                                ) +
                                                parseFloat(row.change_economic)
                                            ).toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogActions>
                <Button onClick={() => navigate(-1)}>Back</Button>
                <Button
                    component={Link}
                    to='/population_projections_multiple'
                    state={{
                        updatedEconomicGrowth,
                        cityGrowthRate,
                        cityRaceData,
                        employmentData,
                        city,
                    }}>
                    Population Projections
                </Button>
            </DialogActions>
        </>
    )
}
