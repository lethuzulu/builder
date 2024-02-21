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
    MenuItem,
    TextField,
    FormControlLabel,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Fragment, useState } from 'react'
import produce_label from './Tooltips/produce_tooltip'
import ZonePicker from './ZonePicker'
import config from '../../config.json'
import axios from 'axios'
import {
    avg_unit_m2_html,
    building_type_html,
    buildings_count_html,
    duration_html,
    m2_per_job_html,
    non_res_html,
    notes_html,
    project_area_html,
    project_name_html,
    redevelopment_html,
    residential_units_html,
    status_html,
    tags_html,
} from './Tooltips/tooltip_html'
import ZoneIDViewer from './ZoneIDViewer'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import DevSwitch from './DevSwitch'
import React from 'react'

export default function CreateProject({ group_id, set_projects }) {
    const [inputValue, setInputValue] = useState('')

    const [open, setOpen] = useState(false)

    const [non_res_disable, set_non_res_disable] = useState(false)
    const [res_disable, set_res_disable] = useState(false)

    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            project_name: '',
            area_meters: '',
            building_count: '',
            duration: '',
            tags: [],
            building_type: '',
            building_type_id: '',
            start_year: '',
            notes: '',
            residential_units: '',
            non_res_m2: '',
            avg_unit_m2: '',
            m2_per_job: '',
            redevelopment: 0,
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
                `${config.api_base_url}/builder/development_tool/development_project/`,
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
                        tags: JSON.parse(response.data.tags),
                    },
                ])
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handle_focus = () => {
        set_non_res_disable(true)
    }
    
    const handle_blur = (event) => {
        const { value } = event.target
        if (!value) {
            set_non_res_disable(false)
        }
    }

    const handle_focus_non_res = () => {
        set_res_disable(true)
    }

    const handle_blur_non_res = (event) => {
        const { value } = event.target
        if (!value) {
            set_res_disable(false)
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
                <DialogTitle>Create Project</DialogTitle>

                <DialogContent dividers>
                    <DialogContentText>
                        Enter Project Details.
                    </DialogContentText>

                    <form
                        id='development-project-form'
                        onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin='dense'
                            label={produce_label(
                                'Project Name',
                                project_name_html
                            )}
                            type='text'
                            fullWidth
                            variant='standard'
                            {...register('project_name', {
                                required: '*Required',
                            })}
                            error={errors.project_name ? true : false}
                            helperText={errors.project_name?.message}
                        />

                        <TextField
                            label={produce_label(
                                'Project Area (in meters)',
                                project_area_html
                            )}
                            variant='standard'
                            type={'number'}
                            fullWidth
                            margin='dense'
                            InputProps={{ inputProps: { min: 0 } }}
                            {...register('area_meters', {
                                required: '*Required',
                            })}
                            error={errors.area_meters ? true : false}
                            helperText={errors.area_meters?.message}
                        />

                        <TextField
                            variant='standard'
                            type={'number'}
                            fullWidth
                            margin='dense'
                            label={produce_label(
                                'Buildings Count (number of buildings)',
                                buildings_count_html
                            )}
                            InputProps={{ inputProps: { min: 0 } }}
                            {...register('building_count', {
                                required: '*Required',
                            })}
                            error={errors.building_count ? true : false}
                            helperText={errors.building_count?.message}
                        />

                        <TextField
                            variant='standard'
                            fullWidth
                            label={produce_label(
                                'Building Type',
                                building_type_html
                            )}
                            margin='dense'
                            select
                            onChange={(e) => {
                                const value = buildingTypes.find(
                                    (building) =>
                                        building.value === e.target.value
                                ).id
                                setValue('building_type_id', value, {
                                    shouldValidate: true,
                                })
                            }}
                            defaultValue={''}
                            {...register('building_type', {required: '*Required'})}
                            error={errors.building_type ? true : false}
                            helperText={errors.building_type?.message}>
                            {buildingTypes.map((building_type) => {
                                return (
                                    <MenuItem
                                        value={building_type.value}
                                        key={building_type.value}>
                                        {building_type.label}
                                    </MenuItem>
                                )
                            })}
                        </TextField>

                        <TextField
                            InputLabelProps={{ shrink: true }}
                            variant='standard'
                            type={'number'}
                            fullWidth
                            label='Building Type ID'
                            margin='dense'
                            disabled={true}
                            {...register('building_type_id', {
                                required: '*Required',
                            })}
                            error={errors.duration ? true : false}
                            helperText={errors.duration?.message}
                        />

                        {/* <DatePicker
                            {...register('start_year', {
                                required: '*Required',
                            })}
                            onChange={(year) =>
                                setValue(
                                    'start_year',
                                    new Date(year).getFullYear(),
                                    { shouldValidate: true }
                                )
                            }
                            label={produce_label('Start Year', start_year_html)}
                            views={['year']}
                            slotProps={{
                                textField: {
                                    name: 'start_year',
                                    variant: 'standard',
                                    fullWidth: true,
                                    margin: 'dense',
                                    error: errors.start_year ? true : false,
                                    helperText: errors.start_year?.message,
                                },
                            }}
                        /> */}

                        <TextField
                            name='duration'
                            variant='standard'
                            type={'number'}
                            fullWidth
                            label={produce_label(
                                'Duration (in months)',
                                duration_html
                            )}
                            margin='dense'
                            InputProps={{ inputProps: { min: 0 } }}
                            {...register('duration', { required: '*Required' })}
                            error={errors.duration ? true : false}
                            helperText={errors.duration?.message}
                        />

                        <TextField
                            select
                            variant='standard'
                            fullWidth
                            label={produce_label('Status', status_html)}
                            margin='dense'
                            defaultValue={''}
                            inputProps={register('status', {
                                required: '*Required',
                            })}
                            error={errors.status ? true : false}
                            helperText={errors.status?.message}>
                            {status.map((status) => {
                                return (
                                    <MenuItem
                                        value={status.value}
                                        key={status.value}>
                                        {status.label}
                                    </MenuItem>
                                )
                            })}
                        </TextField>

                        <FormControlLabel
                            label={produce_label(
                                'Redevelopment',
                                redevelopment_html
                            )}
                            labelPlacement='end'
                            sx={{ ml: '0px' }}
                            name='redevelopment'
                            control={
                                <Controller
                                    render={({
                                        field: { value },
                                        fieldState: { error },
                                    }) => (
                                        <DevSwitch
                                            error={error}
                                            checked={value}
                                            onChange={(e) => {
                                                setValue(
                                                    'redevelopment',
                                                    Number(e.target.checked),
                                                    { shouldValidate: true }
                                                )
                                            }}
                                        />
                                    )}
                                    name='redevelopment'
                                    rules={{ required: '*Required' }}
                                    control={control}
                                    defaultValue={0}></Controller>
                            }
                        />

                        <Controller
                            render={(props) => (
                                <Autocomplete
                                    //freesolo
                                    multiple
                                    options={tags}
                                    getOptionLabel={(option) => option.label}
                                    filterSelectedOptions
                                    value={props.value}
                                    onChange={(e, values) =>
                                        setValue(
                                            'tags',
                                            values.map((v) => v.value)
                                        )
                                    }
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue)
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant='standard'
                                            label={produce_label(
                                                'Tags',
                                                tags_html
                                            )}
                                            fullWidth
                                        />
                                    )}
                                />
                            )}
                            control={control}
                            name='tags'
                            defaultValue={[]}
                            >
                        </Controller>


                        <TextField
                            variant='standard'
                            fullWidth
                            label={produce_label('Notes', notes_html)}
                            margin='dense'
                            {...register('notes')}
                        />

                        <TextField
                            variant='standard'
                            type={'number'}
                            fullWidth
                            label={produce_label(
                                'Number of Residential Units',
                                residential_units_html
                            )}
                            margin='dense'
                            InputProps={{ inputProps: { min: 0 } }}
                            {...register('residential_units')}
                            disabled={res_disable}
                            onFocus={handle_focus}
                            onBlur={handle_blur}    
                        />

                        <TextField
                            name='non_res_m2'
                            variant='standard'
                            type={'number'}
                            fullWidth
                            label={produce_label('Number of Non-Residential Units', non_res_html) }
                            margin='dense'
                            InputProps={{ inputProps: { min: 0 } }}
                            {...register('non_res_m2')}
                            disabled={non_res_disable}
                            onFocus={handle_focus_non_res}
                            onBlur={handle_blur_non_res}
                        />

                        <TextField
                            variant='standard'
                            type={'number'}
                            fullWidth
                            label={produce_label(
                                'Average Unit Area',
                                avg_unit_m2_html
                            )}
                            margin='dense'
                            InputProps={{ inputProps: { min: 0 } }}
                            {...register('avg_unit_m2')}
                            disabled={res_disable}
                        />

                        <TextField
                            variant='standard'
                            type={'number'}
                            fullWidth
                            label={produce_label(
                                'Square Meters per Job',
                                m2_per_job_html
                            )}
                            margin='dense'
                            InputProps={{ inputProps: { min: 0 } }}
                            {...register('m2_per_job')}
                            disabled = {non_res_disable}
                        />

                        {getValues('zone_id').length > 0 && (
                            <ZoneIDViewer getValues={getValues} />
                        )}
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
                        form='development-project-form'>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

const buildingTypes = [
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
    { id: 720, label: 'Transport', value: 'transport' },
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

const status = [
    { label: 'Committed', value: 'committed' },
    { label: 'Proposed', value: 'proposed' },
]

const tags = [
    { value: '798_HSS_PRE2018', label: '798_HSS_PRE2018' },
    { value: '798_DEV_PRE2018', label: '798_DEV_PRE2018' },
    { value: '798_DEV_FUT', label: '798_DEV_FUT' },
    { value: '798_HLA', label: '798_HLA' },
    { value: '798_HLA_PRE2018', label: '798_HLA_PRE2018' },
    { value: '798_HSS_FUT', label: '798_HSS_FUT' },
    { value: '798_HLA_FUT', label: '798_HLA_FUT' },
]
