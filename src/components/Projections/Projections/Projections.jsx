import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import coj_growth_rates from './data/johannesburg/coj_growth_rates.json'
import coe_growth_rates from './data/ekurhuleni/coe_growth_rates.json'
import cot_growth_rates from './data/tshwane/cot_growth_rates.json'
import cos_growth_rates from './data/sedibeng/cos_growth_rates.json'
import cow_growth_rates from './data/westrand/cow_growth_rates.json'

import coj_emp from './data/johannesburg/coj_emp.json'
import coe_emp from './data/ekurhuleni/coe_emp.json'
import cot_emp from './data/tshwane/cot_emp.json'
import cos_emp from './data/sedibeng/cos_emp.json'
import cow_emp from './data/westrand/cow_emp.json'

import coj_race from './data/johannesburg/coj_race.json'
import coe_race from './data/ekurhuleni/coe_race.json'
import cot_race from './data/tshwane/cot_race.json'
import cos_race from './data/sedibeng/cos_race.json'
import cow_race from './data/westrand/cow_race.json'

import coj_control_totals from './data/johannesburg/coj_control_totals.json'
import coe_control_totals from './data/ekurhuleni/coe_control_totals.json'
import cot_control_totals from './data/tshwane/cot_control_totals.json'
import cos_control_totals from './data/sedibeng/cos_control_totals.json'
import cow_control_totals from './data/westrand/cow_control_totals.json'

const geography = [
    { value: 'Ekurhuleni' },
    { value: 'Johannesburg' },
    { value: 'Sedibeng' },
    { value: 'Tshwane' },
    { value: 'West-Rand' },
    { value: 'Metros' },
    { value: 'Gauteng' },
]

function Projections() {
    const [city, setCity] = useState('')

    const [growthRate, setGrowthRate] = useState([])
    const [employmentData, setEmploymentData] = useState([])
    const [raceData, setRaceData] = useState([])
    const [geoData, setGeoData] = useState([])

    const changeHandler = (event) => {
        const value = event.target.value
        setCity(value)

        if (value === 'Johannesburg') {
            setGrowthRate(coj_growth_rates)
            setEmploymentData(coj_emp)
            setRaceData(coj_race)
            setGeoData(coj_control_totals)
        }
        if (value === 'Ekurhuleni') {
            setGrowthRate(coe_growth_rates)
            setEmploymentData(coe_emp)
            setRaceData(coe_race)
            setGeoData(coe_control_totals)
        }
        if (value === 'Tshwane') {
            setGrowthRate(cot_growth_rates)
            setEmploymentData(cot_emp)
            setRaceData(cot_race)
            setGeoData(cot_control_totals)
        }
        if (value === 'Sedibeng') {
            setGrowthRate(cos_growth_rates)
            setEmploymentData(cos_emp)
            setRaceData(cos_race)
            setGeoData(cos_control_totals)
        }
        if (value === 'West-Rand') {
            setGrowthRate(cow_growth_rates)
            setEmploymentData(cow_emp)
            setRaceData(cow_race)
            setGeoData(cow_control_totals)
        }
        if (value === 'Metros') {
            setGrowthRate({
                coe_growth_rates,
                coj_growth_rates,
                cot_growth_rates,
            })
            setEmploymentData({ coe_emp, coj_emp, cot_emp })
            setRaceData({ coe_race, coj_race, cot_race })
            setGeoData({
                coe_control_totals,
                coj_control_totals,
                cot_control_totals,
            })
        }
        if (value === 'Gauteng') {
            setGrowthRate({
                coe_growth_rates,
                coj_growth_rates,
                cot_growth_rates,
                cos_growth_rates,
                cow_growth_rates,
            })
            setEmploymentData({ coe_emp, coj_emp, cot_emp, cos_emp, cow_emp })
            setRaceData({ coe_race, coj_race, cot_race, cos_race, cow_race })
            setGeoData({
                coe_control_totals,
                coj_control_totals,
                cot_control_totals,
                cos_control_totals,
                cow_control_totals,
            })
        }
    }

    const isMetrosOrGautengSelected = city === 'Metros' || city === 'Gauteng'

    return (
        <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={2}>
            <Typography
                component={'h3'}
                variant='h5'
                sx={{ my: 1.5 }}>
                Select Geography
            </Typography>

            <TextField
                select
                variant='outlined'
                label='Geography'
                value={city}
                onChange={changeHandler}
                name='value'
                sx={{ width: '20%' }}>
                {geography.map((element, index) => (
                    <MenuItem
                        value={element.value}
                        key={index}>
                        {element.value}
                    </MenuItem>
                ))}
            </TextField>

            <Button
                component={Link}
                to={
                    city === 'Metros'
                        ? '/economic_projections_multiple'
                        : city === 'Gauteng'
                        ? '/economic_projections_gauteng'
                        : '/economic_projections'
                }
                state={{ employmentData, growthRate, geoData, raceData, city }}
                disabled={!city} // Disable the button if no city is selected
            >
                {isMetrosOrGautengSelected
                    ? 'Create Multiple Economic Projections'
                    : 'Create Economic Projections'}
            </Button>

            {/* <Button
                component={Link}
                to={isMetrosOrGautengSelected ? '/economic_projections_multiple' : '/economic_projections'}
                state={{ employmentData, growthRate, geoData, raceData, city }}
                disabled={!city} // Disable the button if no city is selected
            >
                {isMetrosOrGautengSelected ? 'Create Multiple Economic Projections' : 'Create Economic Projections'}
            </Button> */}

            {/* <Button
                component={Link}
                to={'/economic_projections'}
                state={{ employmentData, growthRate, geoData, raceData, city }}
            >
                Create Economic Projections
            </Button>
            <Button
                component={Link}
                to={'/economic_projections_multiple'}
                state={{ employmentData, growthRate, geoData, raceData, city }}
            >
                Create Multiple Economic Projections
            </Button> */}
        </Stack>
    )
}

export default Projections
