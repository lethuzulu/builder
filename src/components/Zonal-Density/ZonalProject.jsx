import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import config from '../../config.json'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CreateProject from './CreateProject'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Save from './Save'


function ZonalProject() {


    const { group_id } = useParams()
    const { state } = useLocation()
        // eslint-disable-next-line no-unused-vars
    const { group } = state
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate()

    const [projects, set_projects] = useState([])

    const duplicate = async (project) => {
        try {
            const { project_id } = project
            let response = await axios.post(
                `${config.api_base_url}/builder/zonal_tool/zonal_project/duplicate`,
                { project_id }
            )
            console.log('response  ', response)
            set_projects((projects) => [
                ...projects,
                {
                    ...response.data,
                    zone_id: JSON.parse(response.data.zone_id),
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
                            <TableCell align='center'>Min Density</TableCell>
                            <TableCell align='center'>Max Density</TableCell>
                            <TableCell align='center'>Edit</TableCell>
                            <TableCell align='center'>Delete</TableCell>
                            <TableCell align='center'>Duplicate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            projects.map((project, index) => {
                                  return (
                                      <TableRow key={index}>
                                          <TableCell></TableCell>
                                          <TableCell align='center'>
                                              {project.min_density}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.max_density}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {/* <EditProject
                                                  project={project}
                                                  set_projects={set_projects}
                                                  group_id={group_id}
                                              /> */}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {/* <DeleteProject
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
                            }
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateProject
                group_id={group_id}
                set_projects={set_projects}
            />
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='baseline'
                spacing={2}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Save group={group} />
            </Stack>
        </Box>
    )
}

export default ZonalProject