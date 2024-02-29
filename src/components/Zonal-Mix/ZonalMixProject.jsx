import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { rows, columns } from './data'
import { Snackbar } from '@mui/material'

const getRowId = (params) => {
    return params.data.id
}

function ZonalMix() {
    // eslint-disable-next-line no-unused-vars
    const [rowData, setRowData] = useState(rows)
    // eslint-disable-next-line no-unused-vars
    const [colDefs, setColDefs] = useState(columns)
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(false)

    console.log('rowData 1    ', rowData[0])
    console.log('rowData 2   ', rowData[1])

    const onRowValueChanged = (event) => {
        const sum =
            Number(event.data['102_pcnt']) + 
            Number(event.data['201_pcnt']) + 
            Number(event.data['202_pcnt']) +
            Number(event.data['204_pcnt']) +
            Number(event.data['205_pcnt']) +
            Number(event.data['301_pcnt']) +
            Number(event.data['502_pcnt']) +
            Number(event.data['505_pcnt']) +
            Number(event.data['507_pcnt']) +
            Number(event.data['601_pcnt']) +
            Number(event.data['605_pcnt']) +
            Number(event.data['610_pcnt']) +
            Number(event.data['701_pcnt']) +
            Number(event.data['705_pcnt']) +
            Number(event.data['730_pcnt']) +
            Number(event.data['801_pcnt']) +
            Number(event.data['901_pcnt']) +
            Number(event.data['902_pcnt']) +
            Number(event.data['903_pcnt']) +
            Number(event.data['1001_pcnt']) +
            Number(event.data['1101_pcnt']) +
            Number(event.data['1201_pcnt']) 

        // console.log('event    ', event)
        if (sum >= 100) {
            // console.log('event   positive  ', event.node)
            event.node.updateData(event.data)
            console.log('event   positive  ', event.node)   
            // setRowData((rowData) => {
            //     return rowData.map((row) => {
            //         if (row.id === event.rowIndex) {
            //             return { ...row, far: sum }
            //         }
            //         return row
            //     })
            // })
        } else {
            console.log('event   before ', event.data)
            
            for (const key in event.data) {
                if (key !== 'id') {
                    event.data[key] = ""
                }
            }
            alert('Sum of 102 and 201 should be greater than or equal to 100')
            console.log('event   after ', event.data)
            event.node.updateData(event.data)
            //     setRowData((rowData) => {
            //         return rowData.map((row) => {
            //             if (row.id === event.rowIndex) {
            //                 for (const key in row) {
            //                     if (key !== 'id') {
            //                         row[key] = 0
            //                     }
            //                 }
            //             }
            //             return row
            //         })
            //     })
        }
    }

    return (
        <div
            style={{ height: '500px' }}
            className='ag-theme-quartz'>
            <AgGridReact
                columnDefs={colDefs}
                rowData={rowData}
                getRowId={getRowId}
                editType='fullRow'
                onRowValueChanged={onRowValueChanged}
            />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message='Note archived'
            />
        </div>
    )
}

export default ZonalMix
