import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import MapIcon from '@mui/icons-material/Map'
import axios from 'axios'
import config from '../../config.json'
import EditIcon from '@mui/icons-material/Edit'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
import DeleteDevelopment from './DeleteDevelopment'
import CreateDevelopment from './CreateDevelopment'




function DevelopmentGroup() {

    const [groups, set_groups] = useState([{name:'Deve', description:'Dev Desc.', geographic_extent:'Gauteng'}])


    const duplicate = async (group) => {
        try {
            const { group_id } = group
            const response = await axios.post(
                `${config.api_base_url}/builder/development_tool/development_group/duplicate`,
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
        <Table size={'small'}>
            <TableHead>
                <TableRow style={{ backgroundColor: '#F0F0F0' }}>
                    <TableCell align='center'>Name</TableCell>
                    <TableCell align='center'>Description</TableCell>
                    <TableCell align='center'>
                        Geographic Extent
                    </TableCell>
                    <TableCell align='center'>Map</TableCell>
                    <TableCell align='center'>Edit</TableCell>
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
                                  '&:hover': {
                                      backgroundColor:
                                          'rgba(1, 54, 106, 0.1)',
                                  },
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
                                      to={`/development/zoneview/${group.group_id}`}
                                      state={group}>
                                      <MapIcon fontSize={'medium'} />
                                  </IconButton>
                              </TableCell>
                              <TableCell align='center'>
                                  <IconButton
                                      component={Link}
                                      to={`/development/${group.group_id}`}
                                      state={{ group }}>
                                      <EditIcon fontSize={'medium'} />
                                  </IconButton>
                              </TableCell>
                              <TableCell align='center'>
                                  <IconButton
                                      onClick={() => duplicate(group)}>
                                      <ContentCopyTwoToneIcon />
                                  </IconButton>
                              </TableCell>
                              <TableCell align='center'>
                                  <DeleteDevelopment
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
    <CreateDevelopment set_groups={set_groups} />
</Fragment>
  )
}

export default DevelopmentGroup