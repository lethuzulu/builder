import { useState } from 'react'
import config from '../../config.json'
import axios from 'axios'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import React from 'react'

function DeleteProject({ project: { project_id }, set_projects }) {
    const [open, set_open] = useState(false)

    const handleClose = () => {
        set_open(false)
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `${config.api_base_url}/builder/development_tool/development_project/${project_id}`
            )
            if (
                Object.keys(response.data).length > 0 &&
                response.status === 200
            ) {
                set_projects((projects) =>
                    projects.filter(
                        (project) =>
                            project.project_id !== response.data.project_id
                    )
                )
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <IconButton onClick={() => set_open(true)}>
                <DeleteIcon />
            </IconButton>

            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}>
                <DialogTitle>Are You Sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Action Irreversible!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteProject
