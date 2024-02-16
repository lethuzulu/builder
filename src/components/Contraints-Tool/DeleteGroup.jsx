import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
} from '@mui/material'
import React, { Fragment, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import config from '../../config.json'

function DeleteGroup({ set_groups, group }) {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `${config.api_base_url}/builder/constraint_tool/constraint_group/${group.group_id}`
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
            <IconButton onClick={() => setOpen(true)}>
                <DeleteIcon />
            </IconButton>

            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}>
                <DialogTitle>Are You Sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Click Delete to confirm the delete of this Constraint
                        Group. Please be aware that the Constraint Group will
                        not be recoverable.
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
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default DeleteGroup
