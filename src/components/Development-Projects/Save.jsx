import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import config from '../../config.json'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import MyTextField from './MyTextField'
import SaveIcon from '@mui/icons-material/Save';

function Save({ group }) {
    const [details, set_details] = useState(group)

    const [openSaveDialog, setOpenSaveDialog] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleClose = () => {
        setOpenSaveDialog(false)
        set_details(group)
    }

    const handleChange = (event) => {
        set_details((details) => ({
            ...details,
            [event.target.name]: event.target.value,
        }))
    }

    const format_details = (details) => {
        return {
            ...details,
            name: details.name
                .trim()
                .toLowerCase()
                .replaceAll('-', '_')
                .replaceAll(' ', '_'),
        }
    }
    const submitHandler = async () => {
        try {
            const response = await axios.post(
                `${config.api_base_url}/builder/development_tool/development_project/save/${group.group_id}`,
                format_details(details)
            )
            console.log('response  ', response)
            if (response.status === 200) {
                setOpenSnackbar(true)
                setOpenSaveDialog(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Box>
            
                <Button
                    variant='text'
                    endIcon={<SaveIcon />}
                    onClick={() => setOpenSaveDialog(true)}>
                    Save File
                </Button>
            

            <Dialog
                open={openSaveDialog}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'sm'}>
                <DialogTitle>File Details</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        spacing={1}>
                        <Grid
                            item
                            xs={6}>
                            <Typography sx={{ mt: 2.2 }}>Name</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            <MyTextField
                                name={'name'}
                                value={details.name}
                                handleChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            <Typography sx={{}}>Description</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            <MyTextField
                                name={'description'}
                                value={details.description}
                                handleChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            <Typography sx={{}}>Geographic Extent</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            <MyTextField
                                name={'geographic_extent'}
                                value={details.geographic_extent}
                                handleChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={submitHandler}>Save</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                message='Save Successful.'
                onClose={() => setOpenSnackbar(false)}></Snackbar>
        </Box>
    )
}

export default Save
