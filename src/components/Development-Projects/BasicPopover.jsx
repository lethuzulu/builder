import * as React from 'react'
import Popover from '@mui/material/Popover'
import { IconButton, Chip, Stack } from '@mui/material/'
import ListIcon from '@mui/icons-material/List'

export default function BasicPopover({ array }) {
    console.log('array  ', array)
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
                {/* <ZoomOutMapIcon /> */}
                <ListIcon />
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
                    {array.length > 0
                        ? array.map((zone, index) => {
                              return (
                                  <Chip
                                      variant='outlined'
                                      sx={{ minWidth: '100px' }}
                                      label={`${zone}`}
                                      key={index}
                                  />
                              )
                          })
                        : null}
                </Stack>
            </Popover>
        </div>
    )
}
