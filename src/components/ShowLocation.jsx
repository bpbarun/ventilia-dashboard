import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import './leadGeneration.scss';
import { IP } from './Constant';
import { NavLink,useParams } from "react-router-dom";
import GraphAddress from './GraphAddress';
function ShowLocation() {
    let {id}  = useParams();
    const [rowData, setRowData] = useState([]);
    const [graphData, setGraphData] = useState('');
    const setSalesmanData = (id) => {
        localStorage.setItem('salesmanUserID', id)
    }
    const LinkComponent = (props) => {
        return (
            <NavLink to='/MyReport' onClick={() => { setSalesmanData(props.value) }} style={{ color: "black" }}><a>More Details</a>
            </NavLink>
        );

    }
   
    const columnDefs = [
        { headerName: "User", field: "user_id" },
        { headerName: "address", field: "address" },
        { headerName: "time", field: "created_on" }
    ]
    console.log('graphData is ==', graphData)
    useEffect(() => {
        let userId = id !== undefined ? id:localStorage.getItem("user_id");
        axios.get(IP + 'ventilia-api/api/user/location/'+userId, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            setRowData(response.data.data.map((reportData) => ({
                address: reportData.location,
                created_on: reportData.created_on,
                user_id:reportData.user_name
            })))
            setGraphData(response.data.data[0].location)
        }).catch(err => console.log('response catch', err));

    }, [])
    return (
        <>
            <div className="content-wrapper">
                {/* <section className="content">
                    <div className="row">
                        <section className="col-lg-12 connectedSortable">
                            <div className="nav-tabs-custom">
                                <div className="tab-content no-padding">
                                    <div className="chart tab-pane active" id="sales-chart">
                                        <div
                                            className="ag-theme-alpine table"
                                            style={{
                                                height: '60rem',
                                                width: '100%'
                                            }}
                                        >
                                            <AgGridReact
                                                defaultColDef={{
                                                    sortable: true,
                                                    filter: true,
                                                    resizable: true
                                                }}
                                                pagination
                                                paginationPageSize={10}
                                                suppressRowTransform={true}
                                                columnDefs={columnDefs}
                                                rowData={rowData}
                                                frameworkComponents={{
                                                    LinkComponent
                                                }}
                                            >
                                            </AgGridReact>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section> */}
                <GraphAddress address={graphData} />
            </div>
        </>
    )
}
export default ShowLocation;