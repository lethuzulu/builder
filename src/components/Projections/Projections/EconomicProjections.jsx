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

export default function EconomicProjections() {
    const navigate = useNavigate()

    const { state } = useLocation()

    let { employmentData, growthRate, geoData, raceData, city } = state

    const [cityGrowthRate, setCityGrowthRate] = useState(growthRate)
    const [cityGeoData] = useState(geoData)
    const [cityRaceData] = useState(raceData)

    const updatedEconomicGrowth = updateEconomicGrowth(
        cityGeoData,
        cityGrowthRate
    )

    const handleChange = (event, index, column) => {
        const value = event.target.value
        setCityGrowthRate((cityGrowthRate) => {
            const newRow = [...cityGrowthRate]
            newRow[index][column] = value
            return newRow
        })
    }

    return (
        <>
            <Typography
                variant='h6'
                fontWeight='bold'>
                {city} Economic Projections
            </Typography>
            <TableContainer
                component={Paper}
                sx={{ height: '83vh' }}>
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
                        {cityGrowthRate.map((row, index) => {
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
            <DialogActions>
                <Button onClick={() => navigate(-1)}>Back</Button>
                <Button 
                component={Link}
                to='/preview'
                state = {{updatedEconomicGrowth}}
                >Preview</Button>
                <Button
                    component={Link}
                    to='/population_projections'
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
