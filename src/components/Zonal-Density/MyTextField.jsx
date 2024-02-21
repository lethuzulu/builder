import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

export default function MyTextField({ name, value, handleChange }) {
    const [disabled, setDisabled] = useState(true)
    return (
        <TextField
            fullWidth
            name={name}
            type='text'
            variant='standard'
            value={value}
            onChange={handleChange}
            disabled={disabled}
            InputProps={{
                endAdornment: (
                    <InputAdornment
                        sx={{ minHeight: '100%' }}
                        position='end'>
                        {' '}
                        <IconButton
                            onClick={() =>
                                setDisabled((disabled) => !disabled)
                            }>
                            <ModeEditIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}
