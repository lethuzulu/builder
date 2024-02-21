import { useLocation } from 'react-router-dom'

export default function Preview() {
    const { state: {updatedEconomicGrowth} } = useLocation()
    console.log('updatedEconomicGrowth    ', updatedEconomicGrowth)
    //     <Box sx={{ flexGrow: 1 }} >
    //     <Plot style={{ width: '100%' }}
    //     //   data={new_data}

    //       layout={
    //         { title: 'No. of Households Per Income Quantile', xaxis: { title: 'Year(s)',  }, yaxis: { title: 'No. of Households' } }
    //       }
    //     >
    //     </Plot>
    //   </Box>
}
