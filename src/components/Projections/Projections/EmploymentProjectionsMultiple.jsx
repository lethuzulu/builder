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
import { useLocation, useNavigate } from 'react-router-dom'
import initial_changes from './data/initial_data_employment.json'
import CsvDownloader from 'react-csv-downloader'

function EmploymentProjectionsMultiple() {
  const navigate = useNavigate()

  const { state } = useLocation()

  let { pop_cityGrowthRate, employmentData,  } = state

  // console.log(pop_cityGrowthRate)

  var city1 = 'Ekurhuleni'
  var city2 ='Johannesburg'
  var city3 = 'Tshwane'
  

  let employmentData1 = employmentData.coe_emp
  let employmentData2 = employmentData.coj_emp
  let employmentData3 = employmentData.cot_emp

  let pop_cityGrowthRate1 = pop_cityGrowthRate.pop_cityGrowthRate1
  let pop_cityGrowthRate2 = pop_cityGrowthRate.pop_cityGrowthRate2
  let pop_cityGrowthRate3 = pop_cityGrowthRate.pop_cityGrowthRate3

  let [percentageChange1, setPercentageChange1] = useState(initial_changes) 
  let [percentageChange2, setPercentageChange2] = useState(initial_changes)
  let [percentageChange3, setPercentageChange3] = useState(initial_changes)

  employmentData1.forEach((employment_row) => {
    const { year, sector_id } = employment_row
    const index = percentageChange1.findIndex((perc_change_row) => perc_change_row.year === year)
    employment_row.change = parseFloat(percentageChange1[index][sector_id])
  })

  employmentData1.forEach((employment_row) => {
    const { year } = employment_row
    const index = pop_cityGrowthRate1.findIndex((pop_city_growth_rate_row) => pop_city_growth_rate_row.year === year)
    employment_row.economic_change = parseFloat(pop_cityGrowthRate1[index].change_economic)
    employment_row.predicted_economic_growth = parseFloat(pop_cityGrowthRate1[index].predicted_economic_growth)
  })

  const years = [...new Set(employmentData1.map((entry) => entry.year))];
  
  // Iterate over each year
  let previousYearJobs1 = {};
  let previousYearGVAPerc1 = {};
  
  for (const year of years) {
    const yearData = employmentData1.filter((entry) => entry.year === year);
    const sectors = [...new Set(yearData.map((entry) => entry.sector_id))];
    
    let yearSum = 0;
  
    if (year === 2011) {
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          var econ = entry.economic_change +entry.predicted_economic_growth
          yearSum += entry.total_number_of_jobs + (entry.total_number_of_jobs * entry.relationship_variable * (econ / 100));
        }
      }
  
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          const newGvaPerc = entry.perc_of_total_gva + entry.change / 100;
          const sectorTotalJobs = yearSum * newGvaPerc;
  
          previousYearJobs1[sector] = sectorTotalJobs;
          previousYearGVAPerc1[sector] = newGvaPerc;
          entry.total_number_of_jobs = sectorTotalJobs;
        }
      }
    } else {
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          econ = entry.economic_change +entry.predicted_economic_growth
          yearSum += previousYearJobs1[sector] + (previousYearJobs1[sector] * entry.relationship_variable * (econ / 100));
        }
      }
  
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          const newGvaPerc = previousYearGVAPerc1[sector] + entry.change / 100;
          const sectorTotalJobs = yearSum * newGvaPerc;
  
          previousYearJobs1[sector] = sectorTotalJobs;
          previousYearGVAPerc1[sector] = newGvaPerc;
          entry.total_number_of_jobs = sectorTotalJobs;
          // console.log("SECTOR DATA == ", sectorData)
        }
      }
    }
  
  }


  employmentData2.forEach((employment_row) => {
    const { year, sector_id } = employment_row
    const index = percentageChange2.findIndex((perc_change_row) => perc_change_row.year === year)
    employment_row.change = parseFloat(percentageChange2[index][sector_id])
  })

  employmentData2.forEach((employment_row) => {
    const { year } = employment_row
    const index = pop_cityGrowthRate2.findIndex((pop_city_growth_rate_row) => pop_city_growth_rate_row.year === year)
    employment_row.economic_change = parseFloat(pop_cityGrowthRate2[index].change_economic)
    employment_row.predicted_economic_growth = parseFloat(pop_cityGrowthRate2[index].predicted_economic_growth)
  })
  
  // Iterate over each year
  let previousYearJobs2 = {};
  let previousYearGVAPerc2 = {};
  
  for (const year of years) {
    const yearData = employmentData2.filter((entry) => entry.year === year);
    const sectors = [...new Set(yearData.map((entry) => entry.sector_id))];
    
    let yearSum = 0;
  
    if (year === 2011) {
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          econ = entry.economic_change +entry.predicted_economic_growth
          yearSum += entry.total_number_of_jobs + (entry.total_number_of_jobs * entry.relationship_variable * (econ / 100));
        }
      }
  
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          const newGvaPerc = entry.perc_of_total_gva + entry.change / 100;
          const sectorTotalJobs = yearSum * newGvaPerc;
  
          previousYearJobs2[sector] = sectorTotalJobs;
          previousYearGVAPerc2[sector] = newGvaPerc;
          entry.total_number_of_jobs = sectorTotalJobs;
        }
      }
    } else {
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          econ = entry.economic_change +entry.predicted_economic_growth
          yearSum += previousYearJobs2[sector] + (previousYearJobs2[sector] * entry.relationship_variable * (econ / 100));
        }
      }
  
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          const newGvaPerc = previousYearGVAPerc2[sector] + entry.change / 100;
          const sectorTotalJobs = yearSum * newGvaPerc;
  
          previousYearJobs2[sector] = sectorTotalJobs;
          previousYearGVAPerc2[sector] = newGvaPerc;
          entry.total_number_of_jobs = sectorTotalJobs;
          // console.log("SECTOR DATA == ", sectorData)
        }
      }
    }
  
  }

  employmentData3.forEach((employment_row) => {
    const { year, sector_id } = employment_row
    const index = percentageChange3.findIndex((perc_change_row) => perc_change_row.year === year)
    employment_row.change = parseFloat(percentageChange3[index][sector_id])
  })

  employmentData3.forEach((employment_row) => {
    const { year } = employment_row
    const index = pop_cityGrowthRate3.findIndex((pop_city_growth_rate_row) => pop_city_growth_rate_row.year === year)
    employment_row.economic_change = parseFloat(pop_cityGrowthRate3[index].change_economic)
    employment_row.predicted_economic_growth = parseFloat(pop_cityGrowthRate3[index].predicted_economic_growth)
  })
 
  // Iterate over each year
  let previousYearJobs3 = {};
  let previousYearGVAPerc3 = {};
  
  for (const year of years) {
    const yearData = employmentData3.filter((entry) => entry.year === year);
    const sectors = [...new Set(yearData.map((entry) => entry.sector_id))];
    
    let yearSum = 0;
  
    if (year === 2011) {
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          econ = entry.economic_change +entry.predicted_economic_growth
          yearSum += entry.total_number_of_jobs + (entry.total_number_of_jobs * entry.relationship_variable * (econ / 100));
        }
      }
  
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          const newGvaPerc = entry.perc_of_total_gva + entry.change / 100;
          const sectorTotalJobs = yearSum * newGvaPerc;
  
          previousYearJobs3[sector] = sectorTotalJobs;
          previousYearGVAPerc3[sector] = newGvaPerc;
          entry.total_number_of_jobs = sectorTotalJobs;
        }
      }
    } else {
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          econ = entry.economic_change +entry.predicted_economic_growth
          yearSum += previousYearJobs3[sector] + (previousYearJobs3[sector] * entry.relationship_variable * (econ / 100));
        }
      }
  
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          const newGvaPerc = previousYearGVAPerc3[sector] + entry.change / 100;
          const sectorTotalJobs = yearSum * newGvaPerc;
  
          previousYearJobs3[sector] = sectorTotalJobs;
          previousYearGVAPerc3[sector] = newGvaPerc;
          entry.total_number_of_jobs = sectorTotalJobs;
          // console.log("SECTOR DATA == ", sectorData)
        }
      }
    }
  
  }
  


//   let employmentAndEconomicChange = updateEmploymentEconomic(employmentData)

  const handleChange = (event, index, column,  ) => {
    const value = event.target.value
    setPercentageChange1((currentRows) => {
      const newRow = [...currentRows]
      newRow[index][column] = value
      return newRow
    })
  }

  const handleChange2 = (event, index, column,  ) => {
    const value = event.target.value
    setPercentageChange2((currentRows) => {
      const newRow = [...currentRows]
      newRow[index][column] = value
      return newRow
    })
  }

  const handleChange3 = (event, index, column,  ) => {
    const value = event.target.value
    setPercentageChange3((currentRows) => {
      const newRow = [...currentRows]
      newRow[index][column] = value
      return newRow
    })
  }

  const columns = [
    {
      id: 'year',
      displayName: 'year',
    },
    {
      id: 'sector_id',
      displayName: 'sector_id',
    },
    {
      id: 'total_number_of_jobs',
      displayName: 'total_number_of_jobs',
    },
  ]

  const datas1 = employmentData1.map((element) => {
    return {
      year: element.year,
      sector_id: element.sector_id,
      total_number_of_jobs: element.total_number_of_jobs,
    }
  })

  const datas2 = employmentData2.map((element) => {
    return {
      year: element.year,
      sector_id: element.sector_id,
      total_number_of_jobs: element.total_number_of_jobs,
    }
  })

  const datas3 = employmentData3.map((element) => {
    return {
      year: element.year,
      sector_id: element.sector_id,
      total_number_of_jobs: element.total_number_of_jobs,
    }
  })

  const allDatas = [...datas1,...datas2,...datas3]
  const employmentByCombination = allDatas.reduce((totals, data) => {
    const key = `${data.year}-${data.sector_id}`;
    if (!totals[key]) {
      totals[key] = {
        year: data.year,
        sector_id: data.sector_id,
        total_number_of_jobs: 0,
      };
    }
    totals[key].total_number_of_jobs += data.total_number_of_jobs;
    return totals;
  }, {});

  const datas = Object.values(employmentByCombination);

  return (
    <>
    <Typography variant="h6" fontWeight="bold">All Employment Projections</Typography>
      <TableContainer component={Paper} sx={{ height: '26vh' }}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Year</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Domestic</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Agriculture</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Mining</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Manufacturing</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Electricity</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Construction</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Trade</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Transport</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Finance</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Government</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Social</Typography>
            </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {years.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center" scope="row">
                    <Typography component="div">{row}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['0']}
                      onChange={(event) => {
                        handleChange(event, index, '0', row, 0);
                        handleChange2(event, index, '0', row, 0);
                        handleChange3(event, index, '0', row, 0);
                        }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['1']}
                      onChange={(event) => {
                        handleChange(event, index, '1', row, 1)
                        handleChange2(event, index, '1', row, 1)
                        handleChange3(event, index, '1', row, 1)
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['2']}
                      onChange={(event) => {
                        handleChange(event, index, '2', row, 2)
                        handleChange2(event, index, '2', row, 2)
                        handleChange3(event, index, '2', row, 2)
                        
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['3']}
                      onChange={(event) => {
                        handleChange(event, index, '3', row, 3)
                        handleChange2(event, index, '3', row, 3)
                        handleChange3(event, index, '3', row, 3)
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['4']}
                      onChange={(event) => {
                        handleChange(event, index, '4', row, 4)
                        handleChange2(event, index, '4', row, 4)
                        handleChange3(event, index, '4', row, 4)
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['5']}
                      onChange={(event) => {
                        handleChange(event, index, '5', row, 5)
                        handleChange2(event, index, '5', row, 5)
                        handleChange3(event, index, '5', row, 5)
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['6']}
                      onChange={(event) => {
                        handleChange(event, index, '6', row, 6)
                        handleChange2(event, index, '6', row, 6)
                        handleChange3(event, index, '6', row, 6)
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['7']}
                      onChange={(event) => {
                        handleChange(event, index, '7', row, 7)
                        handleChange2(event, index, '7', row, 7)
                        handleChange3(event, index, '7', row, 7)
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['8']}
                      onChange={(event) => {
                        handleChange(event, index, '8', row, 8)
                        handleChange2(event, index, '8', row, 8)
                        handleChange3(event, index, '8', row, 8)
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['9']}
                      onChange={(event) => {
                        handleChange(event, index, '9', row, 9)
                        handleChange2(event, index, '9', row, 9)
                        handleChange3(event, index, '9', row, 9)
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      // value={row['10']}
                      onChange={(event) => {
                        handleChange(event, index, '10', row, 10)
                        handleChange2(event, index, '10', row, 10)
                        handleChange3(event, index, '10', row, 10)
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
    <Typography variant="h6" fontWeight="bold">{city1} Employment Projections</Typography>
      <TableContainer component={Paper} sx={{ height: '26vh' }}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Year</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Domestic</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Agriculture</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Mining</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Manufacturing</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Electricity</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Construction</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Trade</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Transport</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Finance</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Government</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Social</Typography>
            </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {percentageChange1.slice(0, 20).map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center" scope="row">
                    <Typography component="div">{row.year}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['0']}
                      onChange={(event) => handleChange(event, index, '0', row.year, 0)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['1']}
                      onChange={(event) => handleChange(event, index, '1', row.year, 1)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['2']}
                      onChange={(event) => handleChange(event, index, '2', row.year, 2)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['3']}
                      onChange={(event) => handleChange(event, index, '3', row.year, 3)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['4']}
                      onChange={(event) => handleChange(event, index, '4', row.year, 4)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['5']}
                      onChange={(event) => handleChange(event, index, '5', row.year, 5)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['6']}
                      onChange={(event) => handleChange(event, index, '6', row.year, 6)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['7']}
                      onChange={(event) => handleChange(event, index, '7', row.year, 7)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['8']}
                      onChange={(event) => handleChange(event, index, '8', row.year, 8)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['9']}
                      onChange={(event) => handleChange(event, index, '9', row.year, 9)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['10']}
                      onChange={(event) => handleChange(event, index, '10', row.year, 10)}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Typography variant="h6" fontWeight="bold">{city2} Employment Projections</Typography>
      <TableContainer component={Paper} sx={{ height: '26vh' }}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Year</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Domestic</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Agriculture</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Mining</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Manufacturing</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Electricity</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Construction</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Trade</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Transport</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Finance</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Government</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Social</Typography>
            </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {percentageChange2.slice(0, 20).map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center" scope="row">
                    <Typography component="div">{row.year}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['0']}
                      onChange={(event) => handleChange2(event, index, '0', row.year, 0)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['1']}
                      onChange={(event) => handleChange2(event, index, '1', row.year, 1)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['2']}
                      onChange={(event) => handleChange2(event, index, '2', row.year, 2)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['3']}
                      onChange={(event) => handleChange2(event, index, '3', row.year, 3)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['4']}
                      onChange={(event) => handleChange2(event, index, '4', row.year, 4)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['5']}
                      onChange={(event) => handleChange2(event, index, '5', row.year, 5)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['6']}
                      onChange={(event) => handleChange2(event, index, '6', row.year, 6)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['7']}
                      onChange={(event) => handleChange2(event, index, '7', row.year, 7)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['8']}
                      onChange={(event) => handleChange2(event, index, '8', row.year, 8)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['9']}
                      onChange={(event) => handleChange2(event, index, '9', row.year, 9)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['10']}
                      onChange={(event) => handleChange2(event, index, '10', row.year, 10)}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Typography variant="h6" fontWeight="bold">{city3} Employment Projections</Typography>
      <TableContainer component={Paper} sx={{ height: '26vh' }}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Year</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Domestic</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Agriculture</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Mining</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Manufacturing</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Electricity</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Construction</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Trade</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Transport</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Finance</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Government</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant="h7" fontWeight="bold">Social</Typography>
            </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {percentageChange3.slice(0, 20).map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center" scope="row">
                    <Typography component="div">{row.year}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['0']}
                      onChange={(event) => handleChange3(event, index, '0', row.year, 0)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['1']}
                      onChange={(event) => handleChange3(event, index, '1', row.year, 1)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['2']}
                      onChange={(event) => handleChange3(event, index, '2', row.year, 2)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['3']}
                      onChange={(event) => handleChange3(event, index, '3', row.year, 3)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['4']}
                      onChange={(event) => handleChange3(event, index, '4', row.year, 4)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['5']}
                      onChange={(event) => handleChange3(event, index, '5', row.year, 5)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['6']}
                      onChange={(event) => handleChange3(event, index, '6', row.year, 6)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['7']}
                      onChange={(event) => handleChange3(event, index, '7', row.year, 7)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['8']}
                      onChange={(event) => handleChange3(event, index, '8', row.year, 8)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['9']}
                      onChange={(event) => handleChange3(event, index, '9', row.year, 9)}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      variant="standard"
                      type="number"
                      value={row['10']}
                      onChange={(event) => handleChange3(event, index, '10', row.year, 10)}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogActions>
        <Button onClick={() => navigate(-1)}>Back</Button>
        {/* <Button component={Link} to='/employment_preview' state={{ employment_data: employmentAndEconomicChange, city }}>
                    Preview
                </Button> */}
      </DialogActions>
      <DialogActions>
        <CsvDownloader
          filename={`gpm_emp_control_totals_ihs`}
          extension=".csv"
          separator=","
          columns={columns}
          datas={datas}
          text="DOWNLOAD"
        />
      </DialogActions>
    </>
  )
}

export default EmploymentProjectionsMultiple
