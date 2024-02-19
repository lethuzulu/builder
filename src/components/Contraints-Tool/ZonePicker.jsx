import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material'
import React, { Fragment, useState } from 'react'
import '../../../src/index.css'
import MapView from './MapView'
import ZoneIDViewer from './ZoneIDViewer'

function ZonePicker(props) {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        props.reset({ zone_id: [] }, { keepDefaultValues: false })
        setOpen(false)
    }

    return (
        <Fragment>
            <Button
                sx={{ width: '100%' }}
                variant='contained'
                onClick={() => setOpen(true)}>
                Select Zones
            </Button>
                <Dialog
                    open={open}
                    fullWidth={true}
                    maxWidth={'md'}
                    onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText>
                            CLICK ON A REGION TO SELECT ITS ZONE ID.
                        </DialogContentText>
                        <MapView {...props} />
                    </DialogContent>
                    <ZoneIDViewer getValues={props.getValues} />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => setOpen(false)}>Save</Button>
                    </DialogActions>
                </Dialog>
        </Fragment>
    )
}

export default ZonePicker
