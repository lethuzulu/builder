export const updateEmploymentSpecific = (employmentData, growthRates) => {
    // console.log('IN UPDATE EMP Specific')
  
    const specificChangeImplemented = employmentData.map((element) => {
      element.new_total_per_sector_p_y = (element.total_number_of_jobs * (100 + element.change)) / 100
      return element
    })
  
    specificChangeImplemented.map((element) => {
      const { year } = element
      const populationIndex = growthRates.findIndex((populationRow) => {
        return populationRow.year === year
      })
      element.economic_change = growthRates[populationIndex].change_economic
      return element
    })
  
    return specificChangeImplemented
  }
  
  export const updateEmploymentEconomic = (emp_data) => {
      const years = [...new Set(emp_data.map((entry) => entry.year))]
    
      // Iterate over each year
      for (const year of years) {
        const yearData = emp_data.filter((entry) => entry.year === year)
        const sectors = [...new Set(yearData.map((entry) => entry.sector_id))]
      // var YearTotalJobs =  sum(item["total_number_of_jobs"] for item in yearData)
          const YearTotalJobs = yearData.reduce((acc, item) => acc + (item.total_number_of_jobs +(item.total_number_of_jobs *item.relationship_variable* (item.economic_change/100))) , 0);
          // console.log( "YEAR ==" , YearTotalJobs)
  
          for (const sector of sectors) {
              const sectorData = yearData.filter((entry) => entry.sector_id === sector)
              for (const entry of sectorData) {
                  var sectorTotalJobs = YearTotalJobs * (entry.perc_of_total_gva + entry.change / 100)
                  entry.total_number_of_jobs = sectorTotalJobs
  
              }
          }
      }
      // console.log(emp_data)
    return emp_data
  }
  
  
  export const updatePopulationGrowth = (geodata, growthRate) => {
    const updatedPopulationGrowth = geodata.map((element) => {
      const index = growthRate.findIndex((row) => {
        return row.year === element.year
      })
      const row = growthRate[index]
      element.population_growth = parseFloat(row.predicted_population_growth) + parseFloat(row.change)
      return element
    })
    return updatedPopulationGrowth
  }
  
  export const updateEconomicGrowth = (data, growthRate) => {
    // console.log("DATA ====", data)
    // console.log('GROWTH RATE = ' , growthRate)
    data.map((element) => {
      const index = growthRate.findIndex((row) => {
        return row.year === element.year
      })
      const row = growthRate[index]
      element.economic_growth = parseFloat(row.predicted_economic_growth) + parseFloat(row.change_economic)
      // console.log("ECON = ",element)
      return element
    })
    return data
  }
  