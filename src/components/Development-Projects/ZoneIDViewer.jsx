import React from 'react'
import { Box, Chip } from '@mui/material'

export default function ZoneIDViewer({ getValues }) {
    return (
        <Box sx={{ pl: '20px', py: '10px' }}>
            {getValues('zone_id').map((id, index) => {
                return (
                    <Chip
                        sx={{ mx: 0.3 }}
                        key={index}
                        variant='outlined'
                        color='primary'
                        label={id}
                    />
                )
            })}
        </Box>
    )
}
