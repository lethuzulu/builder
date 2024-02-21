import React, { useState } from 'react'
import { updatePopulationGrowth } from './util/helperFunctions'
import { pop_race_split, update_income_quantiles, update_population } from './util/calcFunctions'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, DialogActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import CsvDownloader from "react-csv-downloader"


function PopulationProjections() {

  const { state } = useLocation()

  const navigate = useNavigate()

  let { updatedEconomicGrowth, cityGrowthRate, cityRaceData, employmentData, city } = state
  
  if(city === 'Johannesburg'){
    var cityFile = 'coj'
  }
  if(city === 'Ekurhuleni'){
    cityFile = 'coe'
  }
  if(city === 'Tshwane'){
    cityFile = 'cot'
  }

  const [pop_cityGrowthRate, pop_setCityGrowthRate] = useState(cityGrowthRate)

  const updatedEconomicAndPopulationGrowth = updatePopulationGrowth(updatedEconomicGrowth, pop_cityGrowthRate)//
  const populationGrowthImplemented = update_population(updatedEconomicAndPopulationGrowth)
  const household_data = update_income_quantiles(populationGrowthImplemented)
  const race_data = pop_race_split(household_data, cityRaceData)

  const handleChange = (event, index, column) => {
    const value = event.target.value
    pop_setCityGrowthRate(pop_cityGrowthRate => {
      const newRow = [...pop_cityGrowthRate]
      newRow[index][column] = value
      return newRow
    })
  }

  const columns = [
    {
      id: 'year',
      displayName: 'year'
    },
    {
      id: 'income_quantile',
      displayName: 'income_quantile'
    },
    {
      id: 'race',
      displayName: "race_of_head"
    },
    {
      id: "total_no_of_households",
      displayName: "total_number_of_households"
    }
  ];


  const datas = race_data.map((element) => {
    return {
      year: element.year,
      income_quantile: element.income_quantile,
      race: element.race,
      total_no_of_households: Math.trunc(element.Final_no_of_hhs),
    }
  })

  return (

    <>
    <Typography variant="h6" fontWeight="bold">{city} Household Projections</Typography>
      <TableContainer component={Paper} sx={{ height: '74vh' }} >
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
          <TableRow>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Year</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Projected Population Growth</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Change In Population Growth(%)</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">New Population Growth(%)</Typography>
            </TableCell>
          </TableRow>
          </TableHead>
          <TableBody>

            {
              pop_cityGrowthRate.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align='center' scope="row">
                      <Typography >{row.year}</Typography>
                    </TableCell>

                    <TableCell align='center' size="small">
                      <Typography >{row.predicted_population_growth}</Typography>
                    </TableCell>

                    <TableCell align='center' >
                      <TextField type="number" value={(row.change)} variant='standard' onChange={(event) => handleChange(event, index, 'change')} />
                    </TableCell>

                    <TableCell align='center' >
                      <Typography >{(parseFloat(row.predicted_population_growth) + parseFloat(row.change)).toFixed(2)}</Typography>
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
        {/* <Button component={Link} to='/household_preview' state={{ household_data: household_data, race_data: race_data, city }}>
          Preview
        </Button> */}
        {/* <Button component={Link} to='/employment_projections' state={{ household_data: household_data, race_data: race_data, city }}>
          Employment Projections
        </Button> */}
        <Button component={Link} to='/employment_projections' state={{ pop_cityGrowthRate, cityRaceData, employmentData, city }}>
          Employment Projections
        </Button>
      </DialogActions>
      <DialogActions>
        <CsvDownloader
          filename={`${cityFile}_race_split_hh_control_totals_census`}
          extension=".csv"
          separator=","
          columns={columns}
          datas={datas}
          text="DOWNLOAD" />
      </DialogActions>

    </>

  )
}

export default PopulationProjections