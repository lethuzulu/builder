import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
// eslint-disable-next-line
import React, { Fragment,  useEffect,  useState } from 'react'
import axios from 'axios'
import config from '../../config.json'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import MapIcon from '@mui/icons-material/Map'
import { Link } from 'react-router-dom'
import DeleteGroup from './DeleteGroup'
import CreateGroup from './CreateGroup'

function ConstraintGroup() {
    const [groups, set_groups] = useState([])

    useEffect(() => {
        axios
            .get(
                `${config.api_base_url}/builder/constraint_tool/constraint_group/all`
            )
            .then((response) => {
                set_groups(response.data)
            })
            .catch((error) => console.log(error))
    }, [])


    const duplicate = async (group) => {
        try {
            const { group_id } = group
            const response = await axios.post(
                `${config.api_base_url}/builder/constraint_tool/constraint_group/duplicate`,
                { group_id }
            )
            set_groups((groups)=>[...groups, response.data])
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
                    <TableCell align='center'>Map</TableCell>
                    <TableCell align='center'>Add</TableCell>
                    <TableCell align='center'>Duplicate</TableCell>
                    <TableCell align='center'>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {groups.length > 0
                    ? groups.map((group, index) => (
                          <TableRow
                              key={index}
                              sx={{
                                  '&:last-child td, &:last-child th': {
                                      border: 0,
                                  },
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
                                      component={Link}
                                      to={`/constraint/zoneview/${group.group_id}`}
                                      state={group}>
                                      <MapIcon fontSize={'medium'} />
                                  </IconButton>
                              </TableCell>
                              <TableCell align='center'>
                                  <IconButton
                                      component={Link}
                                      to={`/constraint/${group.group_id}`}
                                      state={{ group }}>
                                      <AddCircleIcon fontSize='medium' />
                                  </IconButton>
                              </TableCell>
                              <TableCell align='center'>
                              <IconButton
                                      onClick={() => duplicate(group)}>
                                      <ContentCopyTwoToneIcon />
                                  </IconButton>
                              </TableCell>
                              <TableCell align='center'>
                                  <DeleteGroup
                                      set_groups={set_groups}
                                      group={group}
                                  />
                              </TableCell>
                          </TableRow>
                      ))
                    : null}
            </TableBody>
        </Table>
    </TableContainer>
    <CreateGroup set_groups={set_groups} />
</Fragment>
  )
}

export default ConstraintGroup