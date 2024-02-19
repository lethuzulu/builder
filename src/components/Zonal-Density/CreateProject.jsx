import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    TextField,
} from '@mui/material'
import React, { Fragment, useState } from 'react'
import axios from 'axios'
import config from '../../config.json'
import AddIcon from '@mui/icons-material/Add'
import { useForm, useFieldArray } from 'react-hook-form'
import ZoneIDPicker from './ZoneIDPicker'

export default function CreateProject({ group_id, set_projects }) {
    const [open, set_open] = useState(false)
    const [open_zone_picker, set_open_zone_picker] = useState(false)

    const {
        register,
        control,
        getValues,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            min_density: '',
            max_density: '',
            zone_id: [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        name: 'zone_id',
        control,
    })

    const handleClose = () => {
        reset()
        set_open(false)
    }

    const onSubmit = async () => {
        set_open_zone_picker(true)
    }

    const handleClick = async () => {
        const postData = createPostForm(getValues())
        try {
            const response = await axios.post(
                `${config.api_base_url}/builder/zonal_tool/zonal_project`,
                postData
            )
            if (
                Object.keys(response.data).length > 0 &&
                response.status === 200
            ) {
                set_projects((projects) => [
                    ...projects,
                    {
                        ...response.data,
                        zone_id: JSON.parse(response.data.zone_id),
                    },
                ])
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createPostForm = (data) => {
        const postData = new FormData()
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                postData.append(key, JSON.stringify(data[key]))
            } else {
                postData.append(key, data[key])
            }
        })
        postData.append('group_id', group_id)
        return postData
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
                    onClick={() => set_open(true)}
                    size='small'
                    color='primary'
                    aria-label='add'>
                    <AddIcon />
                </Fab>
            </Box>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={open}
                onClose={handleClose}>
                <DialogTitle>Create Project</DialogTitle>
                <DialogContent dividers>
                    <form
                        id='zonal-project-form'
                        onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            type='number'
                            margin='dense'
                            fullWidth
                            {...register('min_density', {
                                required: '*Required',
                            })}
                            error={errors.min_density ? true : false}
                            helperText={errors.min_density?.message}
                            variant='standard'
                            label='Minimum Density'
                        />
                        <TextField
                            type='number'
                            margin='dense'
                            fullWidth
                            {...register('max_density', {
                                required: '*Required',
                            })}
                            error={errors.max_density ? true : false}
                            helperText={errors.max_density?.message}
                            variant='standard'
                            label='Maximum Density'
                        />
                        {/* {getValues('zone_id').length > 0 && (
                            <ZoneIDViewer getValues={getValues} />
                        )} */}
                        <Button
                            sx={{ width: '100%' }}
                            variant='contained'
                            type='submit'
                            form='zonal-project-form'>
                            Select Zones
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClick}>Submit</Button>
                </DialogActions>
            </Dialog>
            <ZoneIDPicker
                open={open_zone_picker}
                set_open={set_open_zone_picker}
                fields={fields}
                append={append}
                remove={remove}
                getValues={getValues}
                reset={reset}
            />
        </Fragment>
    )
}
