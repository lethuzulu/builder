import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material'
import React, { useState } from 'react'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import config from '../../config.json'
import BasicPopover from './BasicPopOver'
import CreateConstraint from './CreateConstraint'
// import EditProject from './EditProject'

function ConstraintProject() {
  const { group_id } = useParams()
  const [projects, set_projects] = useState([])

  const duplicate = async (project) => {
    try {
        const { project_id } = project
        const response = await axios.post(
            `${config.api_base_url}/builder/constraint_tool/constraint_project/duplicate`,
            { project_id }
        )
        set_projects((projects) => [
            ...projects,
            {
                ...response.data,
                zone_id: JSON.parse(response.data.zone_id),
                allowed_building_types: JSON.parse(
                    response.data.allowed_building_types
                ),
            },
        ])
    } catch (error) {
        console.log(error)
    }
}



    return (
        <Box sx={{ mt: '0px', mx: '5px' }}>
            <TableContainer component={Paper}>
                <Table size='small'>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#F0F0F0' }}>
                            <TableCell align='center'>Zone ID</TableCell>
                            <TableCell align='center'>
                                Constraint Name
                            </TableCell>
                            <TableCell align='center'>Start Year</TableCell>
                            <TableCell align='center'>
                                Allowed Building Types
                            </TableCell>
                            <TableCell align='center'>
                                Residential Unit Capacity
                            </TableCell>
                            <TableCell align='center'>
                                Employment Capacity
                            </TableCell>
                            <TableCell align='center'>Edit</TableCell>
                            <TableCell align='center'>Delete</TableCell>
                            <TableCell align='center'>Duplicate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {projects.length > 0
                            ? projects.map((project, ) => {
                                  return (
                                      <TableRow key={project.project_id}>
                                          <TableCell align='center'>
                                              <BasicPopover
                                                  array={project.zone_id}
                                              />
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.name}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.start_year}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.allowed_building_types.join(
                                                  ', '
                                              )}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {
                                                  project.residential_unit_capacity
                                              }
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.employment_capacity}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {/* <EditProject
                                                  project={project}
                                                  set_projects={set_projects}
                                                  group_id={group_id}
                                              /> */}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {/* <DeleteConstraint
                                                  project={project}
                                                  set_projects={set_projects}
                                              /> */}
                                          </TableCell>
                                          <TableCell align='center'>
                                              <IconButton
                                                  onClick={() =>
                                                      duplicate(project)
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
            <CreateConstraint
                group_id={group_id}
                set_projects={set_projects}
            />
        </Box>
    )
}

export default ConstraintProject
