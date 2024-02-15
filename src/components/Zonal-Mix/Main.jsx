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

    const [rowData, setRowData] = useState(rows)
    // eslint-disable-next-line no-unused-vars
    const [colDefs, setColDefs] = useState(columns)
// eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(false)

    const onRowValueChanged = (event) => {
        const sum = Number(event.data.column1 + event.data.column2)
        if (sum >= 100) {
            setRowData((rowData)=>{
                return rowData.map((row)=>{
                    if(row.id === event.rowIndex){
                        return {...row, column3:sum}
                    }
                    return row
                })
            })
        } else {
            setRowData((rowData)=>{
                return rowData.map((row)=>{
                    if(row.id === event.rowIndex){
 
                        for (const key in row) {
                            if(key !== 'id'){
                                row[key] = 0
                            }
                        }
                    }
                    return row
                })
            })

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
