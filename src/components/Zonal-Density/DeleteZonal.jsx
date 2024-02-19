import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Grid,
    IconButton,
    Typography,
} from '@mui/material'
import React, { Fragment, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import config from '../../config.json'

export default function Deletegroup({ set_groups, group }) {
    const [open, set_open] = useState(false)

    const handleClose = () => {
        set_open(false)
    }

    const onDelete = async () => {
        try {
            const response = await axios.delete(
                `${config.api_base_url}/builder/zonal_tool/zonal_group/${group.group_id}`
            )
            if (
                Object.keys(response.data).length > 0 &&
                response.status === 200
            ) {
                set_groups((groups) =>
                    groups.filter(
                        (group) => group.group_id !== response.data.group_id
                    )
                )
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Fragment>
            <IconButton onClick={() => set_open(true)}>
                <DeleteIcon fontSize={'small'} />
            </IconButton>
            
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}>
                <DialogTitle>Are You Sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Click Delete to confirm the delete of this group Density
                        Group. Please be aware that the Group will not be
                        recoverable.
                    </DialogContentText>
                    <Grid
                        container
                        spacing={1}>
                        <Grid
                            item
                            xs={6}>
                            <Typography>Name</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            <Typography>{group.name}</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            <Typography>Short Description</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            <Typography>{group.description}</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            <Typography>Geographic Extent</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            <Typography>{group.geographic_extent}</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
