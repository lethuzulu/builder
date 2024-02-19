import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import React from 'react'
const produce_label = (label, html) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ marginRight: '5px' }}>{label}</span>
      <Tooltip title={html}>
        <HelpOutlineIcon fontSize="small" />
      </Tooltip>
    </div>
  )
}

export default produce_label
