import React, { useState } from 'react'
import { updatePopulationGrowth } from './util/helperFunctions'
import { pop_race_split, update_income_quantiles, update_population } from './util/calcFunctions'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, DialogActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import CsvDownloader from "react-csv-downloader"


function PopulationProjectionsMultiple() {

  const { state } = useLocation()

  const navigate = useNavigate()

  let { updatedEconomicGrowth, cityGrowthRate, cityRaceData, employmentData, city } = state
  
  if (city ==="Metros"){
    var city1 = 'Ekurhuleni'
    var city2 ='Johannesburg'
    var city3 = 'Tshwane'
    var pop_coe_growth = cityGrowthRate.cityGrowthRate1
    var pop_coj_growth = cityGrowthRate.cityGrowthRate2
    var pop_cot_growth = cityGrowthRate.cityGrowthRate3
  }
  // console.log("cityGrowthRate === ", cityGrowthRate)
  // console.log("EG ==== ", updatedEconomicGrowth.updatedEconomicGrowth1)
  // console.log("updatedEconomicGrowth === ", updatedEconomicGrowth)
  // console.log("pop_cot_growth ===" ,pop_cot_growth)
  // const [pop_cityGrowthRate, pop_setCityGrowthRate] = useState(cityGrowthRate)
  const [pop_cityGrowthRate1, pop_setCityGrowth1Rate] = useState(pop_coe_growth)
  const [pop_cityGrowthRate2, pop_setCityGrowth2Rate] = useState(pop_coj_growth)
  const [pop_cityGrowthRate3, pop_setCityGrowth3Rate] = useState(pop_cot_growth)

  const years = [...new Set(pop_coe_growth.map((entry) => entry.year))];

  
  const updatedEconomicGrowth1 = updatedEconomicGrowth.updatedEconomicGrowth1
  const updatedEconomicGrowth2 = updatedEconomicGrowth.updatedEconomicGrowth2
  const updatedEconomicGrowth3 = updatedEconomicGrowth.updatedEconomicGrowth3


  const updatedEconomicAndPopulationGrowth1 = updatePopulationGrowth(updatedEconomicGrowth1, pop_cityGrowthRate1)
  const updatedEconomicAndPopulationGrowth2= updatePopulationGrowth(updatedEconomicGrowth2, pop_cityGrowthRate2)
  const updatedEconomicAndPopulationGrowth3 = updatePopulationGrowth(updatedEconomicGrowth3, pop_cityGrowthRate3)

  const populationGrowthImplemented1 = update_population(updatedEconomicAndPopulationGrowth1)
  const populationGrowthImplemented2 = update_population(updatedEconomicAndPopulationGrowth2)
  const populationGrowthImplemented3 = update_population(updatedEconomicAndPopulationGrowth3)


  const household_data1 = update_income_quantiles(populationGrowthImplemented1)
  const household_data2 = update_income_quantiles(populationGrowthImplemented2)
  const household_data3 = update_income_quantiles(populationGrowthImplemented3)


  const race_data1 = pop_race_split(household_data1, cityRaceData.cityRaceData1)
  const race_data2 = pop_race_split(household_data2, cityRaceData.cityRaceData2)
  const race_data3 = pop_race_split(household_data3, cityRaceData.cityRaceData3)



  const handleChange = (event, index, column) => {
    const value = event.target.value
    pop_setCityGrowth1Rate(pop_cityGrowthRate1 => {
      const newRow = [...pop_cityGrowthRate1]
      newRow[index][column] = value
      return newRow
    })
  }

  const handleChange2 = (event, index, column) => {
    const value = event.target.value
    pop_setCityGrowth2Rate(pop_cityGrowthRate2 => {
      const newRow = [...pop_cityGrowthRate2]
      newRow[index][column] = value
      return newRow
    })
  }

  const handleChange3 = (event, index, column) => {
    const value = event.target.value
    pop_setCityGrowth3Rate(pop_cityGrowthRate3 => {
      const newRow = [...pop_cityGrowthRate3]
      newRow[index][column] = value
      return newRow
    })
  }

  const pop_cityGrowthRate = {pop_cityGrowthRate1,pop_cityGrowthRate2,pop_cityGrowthRate3}

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
      id: 'race_of_head',
      displayName: "race_of_head"
    },
    {
      id: "total_number_of_households",
      displayName: "total_number_of_households"
    }
  ];


  const datas1 = race_data1.map((element) => {
    return {
      year: element.year,
      income_quantile: element.income_quantile,
      race_of_head: element.race,
      total_number_of_households: Math.trunc(element.Final_no_of_hhs),
    }
  })

  const datas2 = race_data2.map((element) => {
    return {
      year: element.year,
      income_quantile: element.income_quantile,
      race_of_head: element.race,
      total_number_of_households: Math.trunc(element.Final_no_of_hhs),
    }
  })

  const datas3 = race_data3.map((element) => {
    return {
      year: element.year,
      income_quantile: element.income_quantile,
      race_of_head: element.race,
      total_number_of_households: Math.trunc(element.Final_no_of_hhs),
    }
  })

  const allDatas = [...datas1,...datas2,...datas3]
  const householdsByCombination = allDatas.reduce((totals, data) => {
    const key = `${data.year}-${data.income_quantile}-${data.race_of_head}`;
    if (!totals[key]) {
      totals[key] = {
        year: data.year,
        income_quantile: data.income_quantile,
        race_of_head: data.race_of_head,
        total_number_of_households: 0,
      };
    }
    totals[key].total_number_of_households += data.total_number_of_households;
    return totals;
  }, {});
  
  // Create the final datas array with the summed households for each combination
  const datas = Object.values(householdsByCombination);
  
  return (

    <>
    <Typography variant="h6" fontWeight="bold">All Household Projections</Typography>
      <TableContainer component={Paper} sx={{ height: '26vh' }} >
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
          <TableRow>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Year</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Change In Population Growth (%)</Typography>
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
                        handleChange(event, index, 'change')
                        handleChange2(event, index, 'change')
                        handleChange3(event, index, 'change')
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
    <Typography variant="h6" fontWeight="bold">{city1} Household Projections</Typography>
      <TableContainer component={Paper} sx={{ height: '26vh' }} >
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
          <TableRow>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Year</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Projected Population Growth (%)</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Change In Population Growth (%)</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">New Population Growth (%)</Typography>
            </TableCell>
          </TableRow>
          </TableHead>
          <TableBody>

            {
              pop_cityGrowthRate1.map((row, index) => {
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
      <br></br>
      <Typography variant="h6" fontWeight="bold">{city2} Household Projections</Typography>
      <TableContainer component={Paper} sx={{ height: '26vh' }} >
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
          <TableRow>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Year</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Projected Population Growth (%)</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Change In Population Growth (%)</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">New Population Growth (%)</Typography>
            </TableCell>
          </TableRow>
          </TableHead>
          <TableBody>

            {
              pop_cityGrowthRate2.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align='center' scope="row">
                      <Typography >{row.year}</Typography>
                    </TableCell>

                    <TableCell align='center' size="small">
                      <Typography >{row.predicted_population_growth}</Typography>
                    </TableCell>

                    <TableCell align='center' >
                      <TextField type="number" value={(row.change)} variant='standard' onChange={(event) => handleChange2(event, index, 'change')} />
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
      <br></br>
      <Typography variant="h6" fontWeight="bold">{city3} Household Projections</Typography>
      <TableContainer component={Paper} sx={{ height: '26vh' }} >
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
          <TableRow>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Year</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Projected Population Growth (%)</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Change In Population Growth (%)</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">New Population Growth (%)</Typography>
            </TableCell>
          </TableRow>
          </TableHead>
          <TableBody>

            {
              pop_cityGrowthRate3.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align='center' scope="row">
                      <Typography >{row.year}</Typography>
                    </TableCell>

                    <TableCell align='center' size="small">
                      <Typography >{row.predicted_population_growth}</Typography>
                    </TableCell>

                    <TableCell align='center' >
                      <TextField type="number" value={(row.change)} variant='standard' onChange={(event) => handleChange3(event, index, 'change')} />
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
        <Button component={Link} to='/employment_projections_multiple' state={{ pop_cityGrowthRate, cityRaceData, employmentData, city }}>
          Employment Projections
        </Button>
      </DialogActions>
      <DialogActions>
        <CsvDownloader
          filename={`gpm_race_split_hh_control_totals_census`}
          extension=".csv"
          separator=","
          columns={columns}
          datas={datas}
          text="DOWNLOAD" />
      </DialogActions>

    </>

  )
}

export default PopulationProjectionsMultiple