import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles//ag-grid.css';
// import 'ag-grid-community/styles//ag-theme-alpine.css';
import '../../node_modules/ag-grid-community/styles/ag-grid.css';
import '../../node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import './leadGeneration.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { IP } from './Constant';
import { NavLink } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function TeamReports() {
    const [rowData, setRowData] = useState([]);
    const [graphData, setGraphData] = useState();
    const [totalLead, setTotalLead] = useState();
    const [activeLead, setActiveLead] = useState();
    const [completedLead, setCompletedLead] = useState();
    const [cancelLead, setCancelLead] = useState();
    const [cancelLeadRow, setCancelLeadRow] = useState([]);
    const [completedLeadRow, setCompletedLeadRow] = useState([]);


    const setSalesmanData = (id) => {
        localStorage.setItem('salesmanUserID', id)
    }
    const LinkComponent = (props) => {
        return (
            <NavLink to='/MyReport' onClick={() => { setSalesmanData(props.value) }} style={{ color: "black" }}><a>More Details</a>
            </NavLink>
        );

    }
    const data = {
        labels: ['10%', '20%', '40%', '60%', '80%'],
        datasets: [
            {
                label: 'count of lead',
                data: graphData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const columnDefs = [
        {
            headerName: "#", field: "id",
            cellRenderer: "LinkComponent"
        },
        { headerName: "SalesMan Name", field: "sealsman" },
        { headerName: "Lead", field: "total_lead" },
        { headerName: "Progress", field: "active_lead" },
        { headerName: "10%", field: "ten" },
        { headerName: "20%", field: "twenty" },
        { headerName: "40%", field: "forty" },
        { headerName: "60%", field: "sixty" },
        { headerName: "80%", field: "eighty" }
    ]
    console.log('graphData is ==', graphData)
    useEffect(() => {
        axios.get(IP + 'ventilia-api/api/leadGeneration/leadGeneration/getReport/'+localStorage.getItem("user_id"), {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            setRowData(response.data.data.map((reportData) => ({
                id: reportData.user_id,
                sealsman: reportData.user_name,
                total_lead: reportData.total_lead,
                active_lead: reportData.active_lead,
                ten: reportData.tenPer,
                twenty: reportData.twentyPer,
                forty: reportData.fortyPer,
                sixty: reportData.sixtyPer,
                eighty: reportData.eightyPer,
            })))
        }).catch(err => console.log('response catch', err));

    }, [])

    useEffect(() => {
        axios.get(IP + 'ventilia-api/api/leadGeneration/leadGeneration/getGrapgData/'+localStorage.getItem("user_id"), {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            console.log('response.data.data.graph ====', response.data.data.graph.toString())
            setGraphData(response.data.data.graph)
            setTotalLead(response.data.data.tiles.total_lead)
            setActiveLead(response.data.data.tiles.active_lead)
            setCompletedLead(response.data.data.tiles.completed_lead)
            setCancelLead(response.data.data.tiles.cancel_lead)


        }).catch(err => console.log('response catch', err));

    }, [])
    const completeLeadData = () => {
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getCompletedLead', {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            (response.data.status) ?
                setCompletedLeadRow(response.data.data.map((lead) => ({
                    client_name: lead.client_name,
                    mobile: lead.mobile,
                    address: lead.address,
                    complete_lead_comment: lead.complete_lead_comment,
                    created_on: lead.created_on,
                    created_by: lead.user_name,
                }))) : setCompletedLeadRow([])
        }).catch(err => {
            console.log(err);
        });
    }
    const showCompletedLead = () => {
        const columnDefs1 = [
            { headerName: "Client Name", field: "client_name" },
            { headerName: "Mobile", field: "mobile" },
            { headerName: "Address", field: "address" },
            { headerName: "Comment", field: "complete_lead_comment" },
            { headerName: "Created On", field: "created_on" },
            { headerName: "Created By", field: "created_by" }
        ]
        return (
            <>
                <div
                    className="ag-theme-alpine"
                    style={{
                        height: '40rem',
                        width: '100%',
                    }}
                >
                    <AgGridReact
                        defaultColDef={{
                            sortable: true,
                            filter: true,
                            resizable: true
                        }}

                        columnDefs={columnDefs1}
                        rowData={completedLeadRow}
                    >
                    </AgGridReact>
                </div>
            </>
        )
    }
    const cancelLeadData = () => {
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getCancelLead', {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            (response.data.status) ?
                setCancelLeadRow(response.data.data.map((lead) => ({
                    client_name: lead.client_name,
                    mobile: lead.mobile,
                    address: lead.address,
                    cancel_lead_comment: lead.cancel_lead_comment,
                    created_on: lead.created_on,
                    created_by: lead.user_name,
                }))) : setCancelLeadRow([])
        }).catch(err => {
            console.log(err);
        });
    }
    const showCancelLead = () => {
        const columnDefs1 = [
            { headerName: "Client Name", field: "client_name" },
            { headerName: "Mobile", field: "mobile" },
            { headerName: "Address", field: "address" },
            { headerName: "Comment", field: "cancel_lead_comment" },
            { headerName: "Created On", field: "created_on" },
            { headerName: "Created By", field: "created_by" }
        ]
        return (
            <>
                <div
                    className="ag-theme-alpine"
                    style={{
                        height: '40rem',
                        width: '100%',
                    }}
                >
                    <AgGridReact
                        defaultColDef={{
                            sortable: true,
                            filter: true,
                            resizable: true
                        }}

                        columnDefs={columnDefs1}
                        rowData={cancelLeadRow}
                    >
                    </AgGridReact>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Team Repots
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                        <li className="active">Dashboard</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-aqua"></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Total Lead</span>
                                    <span className="info-box-number">{totalLead}<small></small></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-yellow"></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Active Lead </span>
                                    <span className="info-box-number">{activeLead}</span>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix visible-sm-block"></div>

                        <div className="col-md-3 col-sm-6 col-xs-12" onClick={() => { completeLeadData() }} data-toggle="modal" data-target="#showCompletedLead">
                            <div className="info-box">
                                <span className="info-box-icon bg-green"></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Completed Lead</span>
                                    <span className="info-box-number">{completedLead}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12" onClick={() => { cancelLeadData() }} data-toggle="modal" data-target="#showCancelLead">
                            <div className="info-box">
                                <span className="info-box-icon bg-red "></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Cancel Lead</span>
                                    <span className="info-box-number">{cancelLead}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <section className="col-lg-7 connectedSortable">
                            <div className="nav-tabs-custom">
                                <div className="tab-content no-padding">
                                    <div className="chart tab-pane active" id="sales-chart">
                                        <div
                                            className="ag-theme-alpine table"
                                            style={{
                                                height: '40rem',
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
                        <section className="col-lg-5 connectedSortable">
                            <div className="box box-solid">
                                <div className="box-header">
                                    <i className="fa fa-map-marker"></i>
                                    <h3 className="box-title">
                                        Graph
                                    </h3>
                                </div>
                                <Pie data={data} />
                            </div>
                        </section>
                    </div>

                </section>
                <div className="modal fade" id="showCancelLead">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Cancel Lead</h4>
                            </div>
                            <div className="modal-body">
                                {showCancelLead()}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="showCompletedLead">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Completed Lead</h4>
                            </div>
                            <div className="modal-body">
                                {showCompletedLead()}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TeamReports;