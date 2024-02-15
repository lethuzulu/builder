import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css' // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css' // Theme


function BuildingType() {
    const [rowData, setRowData] = useState([
        {
            id: 101,
            building_type_name: 'farmstead',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 102,
            building_type_name: 'high_end_house',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 201,
            building_type_name: 'high_end_house',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 202,
            building_type_name: 'entry_to_medium_house',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 204,
            building_type_name: 'low_cost_house',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 205,
            building_type_name: 'low_cost_house_with_byshacks',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 209,
            building_type_name: 'formal_rooms_flatlets_in_backyard',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 301,
            building_type_name: 'rdp_house',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 401,
            building_type_name: 'informal_in_settlement',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 402,
            building_type_name: 'informal_upgrade_in_settlement',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 409,
            building_type_name: 'informal_in_backyard',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 501,
            building_type_name: 'workers_hostels_farmworker_housing',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 502,
            building_type_name: 'retirement_home',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 503,
            building_type_name: 'other_residential_institution',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 505,
            building_type_name: 'medium_to_high_income_flats',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 507,
            building_type_name: 'low_cost_high_rise',
            unit_name: 'residential_units',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 601,
            building_type_name: 'retail',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 605,
            building_type_name: 'commerce',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 610,
            building_type_name: 'informal_trade',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 701,
            building_type_name: 'light_industry',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 705,
            building_type_name: 'heavy_industry',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 710,
            building_type_name: 'mining',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 720,
            building_type_name: 'transport',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 730,
            building_type_name: 'utilities',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 801,
            building_type_name: 'health_services',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 901,
            building_type_name: 'schools',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 902,
            building_type_name: 'tertiary_education',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 903,
            building_type_name: 'other_education',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 1001,
            building_type_name: 'government_and_institutions',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 1010,
            building_type_name: 'police',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 1020,
            building_type_name: 'emergency_services',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 1101,
            building_type_name: 'recreation_and_leisure',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
        {
            id: 1201,
            building_type_name: 'tourism',
            unit_name: 'building_sqm',
            to_develop: '0',
            residential: '1',
            low_cost: '0',
            govt_supply: '0',
            informal: '0',
            backyard: '0',
            scenario: '0',
            prop_by_f: '0',
            prop_by_inf: '0',
            non_residential_sqm: '0',
            area_per_job: '0',
            land_sqm_per_unit: '0',
        },
    ])

    const [colDefs, setColDefs] = useState([
        { field: 'id', pinned: 'left' },
        { field: 'building_type_name', pinned: 'left' },
        { field: 'unit_name' },
        { field: 'to_develop' },
        { field: 'residential' },
        { field: 'low_cost' },
        { field: 'govt_supply' },
        { field: 'informal' },
        { field: 'backyard' },
        { field: 'scenario' },
        { field: 'prop_by_f', editable: true },
        {
            field: 'prop_by_inf',
            editable: true,
        },
        {
            field: 'non_residential_sqm',
            editable: true,
        },
        { field: 'area_per_job', editable: true },
        {
            field: 'land_sqm_per_unit',
            editable: true,
        },
    ])

    const getRowId = (params) => {
        /**Wrap in a Memo Function Later, to Memoize the vlaue. */
        return params.data.id
    }

    const onCellValueChanged = (event) => {
        console.log('onCellValueChanged: ', event.data)
    }
    return (
        <div
            className='ag-theme-quartz'
            style={{
                height: '500px',
            }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                getRowId={getRowId}
                onCellValueChanged={onCellValueChanged}
                editType='fullRow'
            />
        </div>
    )
}

export default BuildingType
