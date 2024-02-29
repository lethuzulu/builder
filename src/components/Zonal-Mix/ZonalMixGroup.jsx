// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react'
// eslint-disable-next-line
import axios from 'axios'
// eslint-disable-next-line
import config from '../../config.json'
// import CreateBuildingTypesGroup from './CreateBuildingGroup'
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import MapIcon from '@mui/icons-material/Map'
// import CreateZonalMixGroup from './CreateZonalMixGroup'
import Delete from '@mui/icons-material/Delete'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import CreateZonalMixGroup from './CreateZonalMixGroup'

export default function ZonalMixGroup() {
    // eslint-disable-next-line
    const [groups, set_groups] = React.useState([{name:'Test', description:'Instance to test on', geographic_extent:'Johannesburg'}])

    // useEffect(() => {
    //     axios
    //         .get(
    //             `${config.api_base_url}/builder/zonalmix_tool/zonalmix_group/all`
    //         )
    //         .then((response) => {
    //             set_groups(response.data)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }, [])

    return (
        <Fragment>
            <TableContainer
                component={Paper}
                sx={{ mx: '5px' }}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Description</TableCell>
                            <TableCell align='center'>
                                Geographic Extent
                            </TableCell>
                            <TableCell align='center'>View</TableCell>
                            <TableCell align='center'>Add</TableCell>
                            <TableCell align='center'>Delete</TableCell>
                            <TableCell align='center'>Duplicate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.length > 0
                            ? groups.map((group, index) => {
                                  return (
                                      <TableRow
                                          key={index}
                                          sx={{
                                              '&:last-child td, &:last-child th':
                                                  { border: 0 },
                                          }}>
                                          <TableCell align='center'>
                                              {group.name}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {group.description}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {group.geographic_extent}
                                          </TableCell>
                                          <TableCell align='center'>
                                              <IconButton
                                                  disabled={true}
                                                  //   component={Link}
                                                  //   to={`/zonal/zoneview/${zonal.zonal_pk}`}
                                                  //   state={zonal}
                                              >
                                                  <MapIcon />
                                              </IconButton>
                                          </TableCell>
                                          <TableCell align='center'>
                                              <IconButton
                                                  component={Link}
                                                  to={`/zonalmix/${group.group_id}`}
                                                  state={{ group }}>
                                                  <AddCircleIcon
                                                      fontSize={'medium'}
                                                  />
                                              </IconButton>
                                          </TableCell>
                                          <TableCell align='center'>
                                              <IconButton>
                                                  <Delete />
                                              </IconButton>
                                          </TableCell>
                                          <TableCell align='center'>
                                              <IconButton>
                                                  <ContentCopyTwoToneIcon/>
                                              </IconButton>
                                          </TableCell>
                                      </TableRow>
                                  )
                              })
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateZonalMixGroup set_groups={set_groups} />
        </Fragment>
    )
}
