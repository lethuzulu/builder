import React, { useState } from 'react'
import { updatePopulationGrowth } from './util/helperFunctions'
import { pop_race_split, update_income_quantiles, update_population } from './util/calcFunctions'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, DialogActions, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import CsvDownloader from "react-csv-downloader"


function PopulationProjectionsGauteng() {

  const { state } = useLocation()

  const navigate = useNavigate()

  let { updatedEconomicGrowth, cityGrowthRate, cityRaceData, employmentData, city } = state
  
  var city1 = 'Ekurhuleni'
  var city2 ='Johannesburg'
  var city3 = 'Tshwane'
  var city4 = 'Sedibeng'
  var city5 = 'West Rand' 

  const [pop_cityGrowthRate1, pop_setCityGrowth1Rate] = useState(cityGrowthRate.cityGrowthRate1)
  const [pop_cityGrowthRate2, pop_setCityGrowth2Rate] = useState(cityGrowthRate.cityGrowthRate2)
  const [pop_cityGrowthRate3, pop_setCityGrowth3Rate] = useState(cityGrowthRate.cityGrowthRate3)
  const [pop_cityGrowthRate4, pop_setCityGrowth4Rate] = useState(cityGrowthRate.cityGrowthRate4)
  const [pop_cityGrowthRate5, pop_setCityGrowth5Rate] = useState(cityGrowthRate.cityGrowthRate5)

  const years = [...new Set(pop_cityGrowthRate1.map((entry) => entry.year))];

  
  const updatedEconomicGrowth1 = updatedEconomicGrowth.updatedEconomicGrowth1
  const updatedEconomicGrowth2 = updatedEconomicGrowth.updatedEconomicGrowth2
  const updatedEconomicGrowth3 = updatedEconomicGrowth.updatedEconomicGrowth3
  const updatedEconomicGrowth4 = updatedEconomicGrowth.updatedEconomicGrowth4
  const updatedEconomicGrowth5 = updatedEconomicGrowth.updatedEconomicGrowth5


  const updatedEconomicAndPopulationGrowth1 = updatePopulationGrowth(updatedEconomicGrowth1, pop_cityGrowthRate1)
  const updatedEconomicAndPopulationGrowth2 = updatePopulationGrowth(updatedEconomicGrowth2, pop_cityGrowthRate2)
  const updatedEconomicAndPopulationGrowth3 = updatePopulationGrowth(updatedEconomicGrowth3, pop_cityGrowthRate3)
  const updatedEconomicAndPopulationGrowth4 = updatePopulationGrowth(updatedEconomicGrowth4, pop_cityGrowthRate4)
  const updatedEconomicAndPopulationGrowth5 = updatePopulationGrowth(updatedEconomicGrowth5, pop_cityGrowthRate5)

  const populationGrowthImplemented1 = update_population(updatedEconomicAndPopulationGrowth1)
  const populationGrowthImplemented2 = update_population(updatedEconomicAndPopulationGrowth2)
  const populationGrowthImplemented3 = update_population(updatedEconomicAndPopulationGrowth3)
  const populationGrowthImplemented4 = update_population(updatedEconomicAndPopulationGrowth4)
  const populationGrowthImplemented5 = update_population(updatedEconomicAndPopulationGrowth5)


  const household_data1 = update_income_quantiles(populationGrowthImplemented1)
  const household_data2 = update_income_quantiles(populationGrowthImplemented2)
  const household_data3 = update_income_quantiles(populationGrowthImplemented3)
  const household_data4 = update_income_quantiles(populationGrowthImplemented4)
  const household_data5 = update_income_quantiles(populationGrowthImplemented5)


  const race_data1 = pop_race_split(household_data1, cityRaceData.cityRaceData1)
  const race_data2 = pop_race_split(household_data2, cityRaceData.cityRaceData2)
  const race_data3 = pop_race_split(household_data3, cityRaceData.cityRaceData3)
  const race_data4 = pop_race_split(household_data4, cityRaceData.cityRaceData4)
  const race_data5 = pop_race_split(household_data5, cityRaceData.cityRaceData5)



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

  const handleChange4 = (event, index, column) => {
    const value = event.target.value
    pop_setCityGrowth4Rate(pop_cityGrowthRate4 => {
      const newRow = [...pop_cityGrowthRate4]
      newRow[index][column] = value
      return newRow
    })
  }

  const handleChange5 = (event, index, column) => {
    const value = event.target.value
    pop_setCityGrowth5Rate(pop_cityGrowthRate5 => {
      const newRow = [...pop_cityGrowthRate5]
      newRow[index][column] = value
      return newRow
    })
  }

  const pop_cityGrowthRate = {pop_cityGrowthRate1,pop_cityGrowthRate2,pop_cityGrowthRate3,pop_cityGrowthRate4,pop_cityGrowthRate5}

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

  const datas4 = race_data4.map((element) => {
    return {
      year: element.year,
      income_quantile: element.income_quantile,
      race_of_head: element.race,
      total_number_of_households: Math.trunc(element.Final_no_of_hhs),
    }
  })

  const datas5 = race_data5.map((element) => {
    return {
      year: element.year,
      income_quantile: element.income_quantile,
      race_of_head: element.race,
      total_number_of_households: Math.trunc(element.Final_no_of_hhs),
    }
  })

  const allDatas = [...datas1,...datas2,...datas3,...datas4,...datas5]
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
                        handleChange4(event, index, 'change')
                        handleChange5(event, index, 'change')
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
      <br></br>
      <Typography variant="h6" fontWeight="bold">{city4} Household Projections</Typography>
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
              pop_cityGrowthRate4.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align='center' scope="row">
                      <Typography >{row.year}</Typography>
                    </TableCell>

                    <TableCell align='center' size="small">
                      <Typography >{row.predicted_population_growth}</Typography>
                    </TableCell>

                    <TableCell align='center' >
                      <TextField type="number" value={(row.change)} variant='standard' onChange={(event) => handleChange4(event, index, 'change')} />
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
      <Typography variant="h6" fontWeight="bold">{city5} Household Projections</Typography>
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
              pop_cityGrowthRate5.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align='center' scope="row">
                      <Typography >{row.year}</Typography>
                    </TableCell>

                    <TableCell align='center' size="small">
                      <Typography >{row.predicted_population_growth}</Typography>
                    </TableCell>

                    <TableCell align='center' >
                      <TextField type="number" value={(row.change)} variant='standard' onChange={(event) => handleChange5(event, index, 'change')} />
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
        <Button component={Link} to='/employment_projections_gauteng' state={{ pop_cityGrowthRate, cityRaceData, employmentData, city }}>
          Employment Projections
        </Button>
      </DialogActions>
      <DialogActions>
        <CsvDownloader
          filename={`gpf_race_split_hh_control_totals_census`}
          extension=".csv"
          separator=","
          columns={columns}
          datas={datas}
          text="DOWNLOAD" />
      </DialogActions>

    </>

  )
}

export default PopulationProjectionsGauteng