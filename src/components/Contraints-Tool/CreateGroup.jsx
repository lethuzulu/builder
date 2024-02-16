import React, { Fragment } from 'react'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    MenuItem,
    TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import axios from 'axios'
import config from '../../config.json'
import { useForm } from 'react-hook-form'

const geographic_extents = [
    'Gauteng',
    'Johannesburg',
    'Tshwane',
    'Ekurhuleni',
    'Sedibeng',
    'WestRand',
]

export default function CreateGroup({ set_groups }) {
    const [open, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            geographic_extent: '',
        },
    })

    const handleClose = () => {
        reset()
        setOpen(false)
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `${config.api_base_url}/builder/constraint_tool/constraint_group`,
                data
            )
            if (response.status === 200) {
                set_groups((groups) => [...groups, response.data])
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Fragment>
            <Box
                display='flex'
                width={'100%'}
                height={15}
                alignItems='center'
                justifyContent='center'>
                <Fab
                    size='small'
                    color={'primary'}
                    onClick={() => setOpen(true)}>
                    <AddIcon />
                </Fab>
            </Box>

            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}>
                <DialogTitle>Create a Project</DialogTitle>

                <DialogContent dividers>
                    <DialogContentText>
                        To create a new project, please enter the basic project
                        information to start the process.
                    </DialogContentText>

                    <form
                        id='constraint_group_form'
                        onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            label='Constraint Group Name'
                            type='text'
                            margin='dense'
                            variant='standard'
                            {...register('name', {
                                required: '*Required',
                            })}
                            error={errors.name ? true : false}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            fullWidth
                            label='Description'
                            type='text'
                            margin='dense'
                            variant='standard'
                            {...register('description', {
                                required: '*Required',
                            })}
                            error={errors.description ? true : false}
                            helperText={errors.description?.message}
                        />

                        <TextField
                            fullWidth
                            select
                            label='Geographic Extent'
                            type='text'
                            margin='dense'
                            variant='standard'
                            defaultValue=''
                            {...register('geographic_extent', {
                                required: '*Required',
                            })}
                            error={errors.geographic_extent ? true : false}
                            helperText={errors.geographic_extent?.message}>
                            {geographic_extents.map((option, index) => (
                                <MenuItem
                                    key={index}
                                    value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        type='submit'
                        form='constraint_group_form'>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
