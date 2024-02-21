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

function EmploymentProjections() {
  const navigate = useNavigate()

  const { state } = useLocation()

  let { pop_cityGrowthRate, employmentData, city } = state

  if(city === 'Johannesburg'){
    var cityFile = 'coj'
  }
  if(city === 'Ekurhuleni'){
    cityFile = 'coe'
  }
  if(city === 'Tshwane'){
    cityFile = 'cot'
  }

  let [percentageChange, setPercentageChange] = useState(initial_changes) //initial employment data(constant for all cities)

  employmentData.forEach((employment_row) => {
    const { year, sector_id } = employment_row
    const index = percentageChange.findIndex((perc_change_row) => perc_change_row.year === year)
    employment_row.change = parseFloat(percentageChange[index][sector_id])
  })

  employmentData.forEach((employment_row) => {
    const { year } = employment_row
    const index = pop_cityGrowthRate.findIndex((pop_city_growth_rate_row) => pop_city_growth_rate_row.year === year)
    employment_row.economic_change = parseFloat(pop_cityGrowthRate[index].change_economic)
    employment_row.predicted_economic_growth = parseFloat(pop_cityGrowthRate[index].predicted_economic_growth)
  })

  const years = [...new Set(employmentData.map((entry) => entry.year))];
  
  // Iterate over each year
  let previousYearJobs = {};
  let previousYearGVAPerc = {};
  
  for (const year of years) {
    const yearData = employmentData.filter((entry) => entry.year === year);
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
  
          previousYearJobs[sector] = sectorTotalJobs;
          previousYearGVAPerc[sector] = newGvaPerc;
          entry.total_number_of_jobs = sectorTotalJobs;
        }
      }
    } else {
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          econ = entry.economic_change +entry.predicted_economic_growth
          yearSum += previousYearJobs[sector] + (previousYearJobs[sector] * entry.relationship_variable * (econ / 100));
        }
      }
  
      for (const sector of sectors) {
        const sectorData = yearData.filter((entry) => entry.sector_id === sector);
        for (const entry of sectorData) {
          const newGvaPerc = previousYearGVAPerc[sector] + entry.change / 100;
          const sectorTotalJobs = yearSum * newGvaPerc;
  
          previousYearJobs[sector] = sectorTotalJobs;
          previousYearGVAPerc[sector] = newGvaPerc;
          entry.total_number_of_jobs = sectorTotalJobs;
          // console.log("SECTOR DATA == ", sectorData)
        }
      }
    }
  
  }
  


//   let employmentAndEconomicChange = updateEmploymentEconomic(employmentData)

  const handleChange = (event, index, column) => {
    const value = event.target.value
    setPercentageChange((currentRows) => {
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

  const datas = employmentData.map((element) => {
    return {
      year: element.year,
      sector_id: element.sector_id,
      total_number_of_jobs: element.total_number_of_jobs,
    }
  })

  return (
    <>
    <Typography variant="h6" fontWeight="bold">{city} Employment Projections</Typography>
      <TableContainer component={Paper} sx={{ height: '74vh' }}>
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
            {percentageChange.map((row, index) => {
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

      <DialogActions>
        <Button onClick={() => navigate(-1)}>Back</Button>
        {/* <Button component={Link} to='/employment_preview' state={{ employment_data: employmentAndEconomicChange, city }}>
                    Preview
                </Button> */}
      </DialogActions>
      <DialogActions>
        <CsvDownloader
          filename={`${cityFile}_emp_control_totals_ihs`}
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

export default EmploymentProjections
