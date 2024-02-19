// eslint-disable-next-line
import React, { Fragment, useEffect, useState } from 'react'
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
import MapIcon from '@mui/icons-material/Map'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateZonal from './CreateZonal'
import axios from 'axios'
import config from '../../config.json'
import DeleteZonal from './DeleteZonal'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';


export default function ZonalGroup() {
    const [groups, set_groups] = useState([])

    // useEffect(() => {
    //     axios
    //         .get(`${config.api_base_url}/builder/zonal_tool/zonal_group/all`)
    //         .then((response) => {
    //             set_groups(response.data)
    //         })
    //         .catch((error) => console.log(error))
    // }, [])

    const duplicate = async (group) => {
        try {
            const { group_id } = group
            const response = await axios.post(
                `${config.api_base_url}/builder/zonal_tool/zonal_group/duplicate`,
                { group_id }
            )
            set_groups((groups) => [...groups, response.data])
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Fragment>
            <TableContainer
                component={Paper}
                sx={{ mx: '5px' }}>
                <Table size={'small'}>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#F0F0F0' }}>
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
                                              '&:hover': {
                                                  backgroundColor:
                                                      'rgba(1, 54, 106, 0.1)',
                                              },
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
                                              <IconButton>
                                                  <IconButton
                                                      component={Link}
                                                      to={`/zonal_density/zoneview/${group.group_id}`}
                                                      state={group}>
                                                      <MapIcon
                                                          fontSize={'small'}
                                                      />
                                                  </IconButton>
                                              </IconButton>
                                          </TableCell>
                                          <TableCell align='center'>
                                              <IconButton
                                                  component={Link}
                                                  to={`/zonal_density/${group.group_id}`}
                                                  state={{ group }}>
                                                  <AddCircleIcon
                                                      fontSize={'small'}
                                                  />
                                              </IconButton>
                                          </TableCell>
                                          <TableCell align='center'>
                                              <DeleteZonal
                                                  set_groups={set_groups}
                                                  group={group}
                                              />
                                          </TableCell>
                                          <TableCell align='center'>
                                              <IconButton
                                                  onClick={() =>
                                                      duplicate(group)
                                                  }>
                                                  <ContentCopyTwoToneIcon />
                                              </IconButton>
                                          </TableCell>
                                      </TableRow>
                                  )
                              })
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateZonal set_groups={set_groups} />
        </Fragment>
    )
}
