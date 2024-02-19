// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react'
import axios from 'axios'
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
// import DeleteBuilding from './DeleteBuilding'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
// import EditIcon from '@mui/icons-material/Edit'


export default function BuildingTypeGroup() {
    const [groups, set_groups] = React.useState([
        {
            group_id:1,
            name:'Group 1',
            description:'Group 1 Desc',
            geographic_extent:'Gauteng'
        }
    ])

    // useEffect(() => {
    //     axios
    //         .get(
    //             `${config.api_base_url}/builder/building_tool/building_group/all`
    //         )
    //         .then((response) => {
    //             set_groups(response.data)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }, [])

    const duplicate = async (group) => {
        try {
            const { group_id } = group
            const response = await axios.post(
                `${config.api_base_url}/builder/building_tool/building_group/duplicate`,
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
                <Table size='small'>
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
                                              <IconButton disabled={true}>
                                                  <MapIcon />
                                              </IconButton>
                                          </TableCell>
                                          <TableCell align='center'>
                                              <IconButton
                                                  component={Link}
                                                  to={`/building_type/${group.group_id}`}
                                                  state={{ group }}>
                                                  <AddCircleIcon 
                                                      fontSize={'medium'}
                                                  />
                                              </IconButton>
                                          </TableCell>
                                          <TableCell align='center'>
                                              {/* <DeleteBuilding
                                                  set_groups={set_groups}
                                                  group={group}
                                              /> */}
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
            {/* <CreateBuildingTypesGroup set_groups={set_groups} /> */}
        </Fragment>
    )
}
