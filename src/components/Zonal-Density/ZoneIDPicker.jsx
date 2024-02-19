import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React from 'react'
import MapView from './MapView'


export default function ZoneIDPicker(props) {
    const { open, set_open } = props
    const handleClose = () => {
        set_open(false)
    }

    return (
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth={'md'}
            onClose={handleClose}>
            <DialogContent>
                <MapView {...props} />
            </DialogContent>
            
            <DialogActions>
                <Button>Cancel</Button>
                <Button onClick={() => set_open(false)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}