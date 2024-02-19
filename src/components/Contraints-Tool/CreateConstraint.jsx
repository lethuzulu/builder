import React from 'react'
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import config from '../../config.json'
import axios from 'axios'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
// import ZoneIDViewer from './ZoneIDViewer'
import {
    building_type_html,
    project_name_html,
    start_year_html,
} from './Tooltips/tooltip_html'
import produce_label from './Tooltips/produce_tooltip'
import ZonePicker from './ZonePicker'

export default function CreateConstraint({ group_id, set_projects }) {
    const [open, setOpen] = useState(false)

    const {
        register,
        reset,
        handleSubmit,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            start_year: '',
            allowed_building_types: [],
            residential_unit_capacity: '',
            employment_capacity: '',
            zone_id: [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        name: 'zone_id',
        control,
    })

    const handleClose = () => {
        reset()
        setOpen(false)
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

    const onSubmit = async (data) => {
        const postData = createPostForm(data)
        try {
            const response = await axios.post(
                `${config.api_base_url}/builder/constraint_tool/constraint_project`,
                postData
            )
            if (
                Object.keys(response.data).length > 0 &&
                response.status === 200
            ) {
                set_projects((constraint_projects) => [
                    ...constraint_projects,
                    {
                        ...response.data,
                        allowed_building_types: JSON.parse(
                            response.data.allowed_building_types
                        ),
                        zone_id: JSON.parse(response.data.zone_id),
                    },
                ])
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Box
                display='flex'
                width={'100%'}
                height={15}
                alignItems='center'
                justifyContent='center'>
                <Fab
                    onClick={() => setOpen(true)}
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
                <DialogTitle>Create a Project</DialogTitle>

                <DialogContent dividers>
                    <DialogContentText>
                        Enter Project Details.
                    </DialogContentText>

                    <form
                        id='constraint-project-form'
                        onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin='dense'
                            label={produce_label(
                                'Constraint Name',
                                project_name_html
                            )}
                            type='text'
                            fullWidth
                            variant='standard'
                            {...register('name', {
                                required: '*Required',
                            })}
                            error={errors.name ? true : false}
                            helperText={errors.name?.message}
                        />

                        <TextField
                            label={produce_label('Year', start_year_html)}
                            variant='standard'
                            type={'number'}
                            fullWidth
                            margin='dense'
                            InputProps={{
                                inputProps: { min: 0 },
                            }}
                            {...register('start_year', {
                                required: '*Required',
                            })}
                            error={errors.start_year ? true : false}
                            helperText={errors.start_year?.message}
                        />

                        <Controller
                            name='allowed_building_types'
                            defaultValue={[]}
                            rules={{ required: '*Required' }}
                            control={control}
                            render={(props) => (
                                <Autocomplete
                                    //freesolo
                                    multiple
                                    options={building_types}
                                    getOptionLabel={(option) => option.label}
                                    filterSelectedOptions
                                    value={props.value}
                                    onChange={(e, values) =>
                                        setValue(
                                            'allowed_building_types',
                                            values.map((v) => v.value)
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant='standard'
                                            label={produce_label(
                                                'Allowed Building Types',
                                                building_type_html
                                            )}
                                            fullWidth
                                            error={
                                                errors.allowed_building_types
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors.allowed_building_types
                                                    ?.message
                                            }
                                        />
                                    )}></Autocomplete>
                            )}></Controller>

                        <TextField
                            variant='standard'
                            type={'number'}
                            fullWidth
                            label={produce_label('Residential Unit Capacity')}
                            margin='dense'
                            InputProps={{
                                inputProps: { min: 0 },
                            }}
                            {...register('residential_unit_capacity', {
                                required: '*Required',
                            })}
                            error={
                                errors.residential_unit_capacity ? true : false
                            }
                            helperText={
                                errors.residential_unit_capacity?.message
                            }
                        />

                        <TextField
                            variant='standard'
                            type={'number'}
                            fullWidth
                            label={produce_label('Employment Capacity')}
                            margin='dense'
                            InputProps={{
                                inputProps: { min: 0 },
                            }}
                            {...register('employment_capacity', {
                                required: '*Required',
                            })}
                            error={errors.employment_capacity ? true : false}
                            helperText={errors.employment_capacity?.message}
                        />

                        {/* {getValues('zone_id').length > 0 && (
                            <ZoneIDViewer getValues={getValues} />
                        )} */}
                        <ZonePicker
                            fields={fields}
                            append={append}
                            remove={remove}
                            getValues={getValues}
                            reset={reset}
                        />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        type='submit'
                        form='constraint-project-form'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const building_types = [
    { id: 101, label: 'Farmstead', value: 'farmstead' },
    { id: 102, label: 'Small Holding', value: 'small_holding' },
    { id: 201, label: 'High End House', value: 'high_end_house' },
    { id: 202, label: 'Entry to medium house', value: 'entry_to_medium_house' },
    { id: 204, label: 'Low Cost House', value: 'low_cost_house' },
    {
        id: 205,
        label: 'Low Cost House w/ Backyard Shack',
        value: 'low_cost_house_with_byshacks',
    },
    { id: 301, label: 'RDP House', value: 'rdp_house' },
    { id: 401, label: 'Informal Settlement', value: 'informal_settlement' },
    {
        id: 409,
        label: 'Informal Rooms/Flatlets In Backyard',
        value: 'informal_rooms_flatlets_in_backyard',
    },
    {
        id: 501,
        label: 'Worker Hostels / Farmworker Housing',
        value: 'worker_hostels_farmworker_housing',
    },
    { id: 502, label: 'Retirement Home', value: 'retirement_home' },
    {
        id: 505,
        label: 'Medium to High income Flats',
        value: 'medium_to_high_income_flats',
    },
    { id: 507, label: 'Low Cost High Rise', value: 'low_cost_high_rise' },
    { id: 601, label: 'Retail', value: 'retail' },
    { id: 605, label: 'Commerce', value: 'commerce' },
    { id: 610, label: 'Informal Trade', value: 'informal_trade' },
    { id: 701, label: 'Light Industry', value: 'light_industry' },
    { id: 705, label: 'Heavy Industry', value: 'heavy_industry' },
    { id: 710, label: 'Mining', value: 'mining' },
    { id: 720, label: 'Transport', value: 'trnasport' },
    { id: 730, label: 'Utility', value: 'utility' },
    { id: 801, label: 'Health Services', value: 'health_services' },
    { id: 901, label: 'School', value: 'school' },
    { id: 902, label: 'Tertiary Education', value: 'tertiary_education' },
    { id: 903, label: 'Other Education', value: 'other_education' },
    {
        id: 1001,
        label: 'Government and Institutions',
        value: 'government_and_institutions',
    },
    { id: 1010, label: 'Police', value: 'police' },
    { id: 1020, label: 'Emergency Services', value: 'emergency_services' },
    {
        id: 1101,
        label: 'Recreation and Leisure',
        value: 'recreation_and_leisure',
    },
    { id: 1201, label: 'Tourism', value: 'tourism' },
    { id: 503, label: 'Other', value: 'other' },
]
