import * as React from 'react'
import Popover from '@mui/material/Popover'
import { IconButton, Chip, Stack } from '@mui/material/'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'

export default function BasicPopover({ zone_id }) {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <div>
            <IconButton
                aria-describedby={id}
                variant='contained'
                onClick={handleClick}>
                <ZoomOutMapIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Stack
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                    spacing={1}
                    sx={{ p: 1 }}>
                    {zone_id.map((zone, index) => {
                        return (
                            <Chip
                                variant='outlined'
                                sx={{ minWidth: '100px' }}
                                label={`${zone}`}
                                key={index}
                            />
                        )
                    })}
                </Stack>
            </Popover>
        </div>
    )
}
