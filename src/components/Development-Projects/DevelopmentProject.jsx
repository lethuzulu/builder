import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import config from '../../config.json'
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone'
import CreateProject from './CreateProject'

function DevelopmentProject() {
    let { group_id } = useParams()

    const { state } = useLocation()
    // eslint-disable-next-line no-unused-vars
    const { group } = state

    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate()

    const [projects, set_projects] = useState([])

    useEffect(() => {
        axios
            .get(
                `${config.api_base_url}/builder/development_tool/development_project/${group_id}`
            )
            .then((response) => {
                set_projects(() =>
                    response.data.map((project) => ({
                        ...project,
                        zone_id: JSON.parse(project.zone_id),
                        tags: JSON.parse(project.tags),
                    }))
                )
            })
            .catch((error) => console.log(error))
    }, [group_id])

    const duplicate = async (project) => {
        try {
            const { project_id } = project
            let response = await axios.post(
                `${config.api_base_url}/builder/development_tool/development_project/duplicate`,
                { project_id }
            )
            set_projects((projects) => [
                ...projects,
                {
                    ...response.data,
                    zone_id: JSON.parse(response.data.zone_id),
                    tags: JSON.parse(response.data.tags),
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
                            <TableCell align='center'>Project Name</TableCell>
                            <TableCell align='center'>Area Meters</TableCell>
                            <TableCell align='center'>Building Count</TableCell>
                            <TableCell align='center'>Building Type</TableCell>
                            <TableCell align='center'>
                                Building Type ID
                            </TableCell>
                            <TableCell align='center'>Start Year</TableCell>
                            <TableCell align='center'>Duration</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell align='center'>Redevelopment</TableCell>
                            <TableCell align='center'>Tags</TableCell>
                            <TableCell align='center'>Notes</TableCell>
                            <TableCell align='center'>
                                Residential Units
                            </TableCell>
                            <TableCell align='center'>Avg Units</TableCell>
                            <TableCell align='center'>Non Res m2</TableCell>
                            <TableCell align='center'>Meters per Job</TableCell>
                            <TableCell align='center'>Edit</TableCell>
                            <TableCell align='center'>Delete</TableCell>
                            <TableCell align='center'>Duplicate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.length > 0
                            ? projects.map((project) => {
                                  return (
                                      <TableRow key={project.project_id}>
                                          <TableCell align='center'>
                                              {/* <BasicPopover
                                                  array={project.zone_id}
                                              /> */}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.project_name}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.area_meters}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.building_count}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.building_type}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.building_type_id}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.start_year}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.duration}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.status}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.redevelopment}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {/* <BasicPopover
                                                  array={project.tags}
                                              /> */}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.notes}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.residential_units}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.avg_unit_m2}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.non_res_m2}
                                          </TableCell>
                                          <TableCell align='center'>
                                              {project.m2_per_job}
                                          </TableCell>
                                          <TableCell>
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
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateProject
                group_id={group_id}
                set_projects={set_projects}
            />
        </Box>
    )
}

export default DevelopmentProject
