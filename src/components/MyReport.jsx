import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import './leadGeneration.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { IP } from './Constant';

ChartJS.register(ArcElement, Tooltip, Legend);

function MyReport() {
    const [rowData, setRowData] = useState([]);
    const [graphData, setGraphData] = useState();
    const [totalLead, setTotalLead] = useState();
    const [activeLead, setActiveLead] = useState();
    const [completedLead, setCompletedLead] = useState();
    const [cancelLead, setCancelLead] = useState();
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
        { headerName: "Name", field: "name" },
        { headerName: "Lead Persentage", field: "lead_persentage" },
        { headerName: "Mobile", field: "mobile" },
        { headerName: "Address", field: "address" },
        { headerName: "Refrence", field: "refrence" },
        { headerName: "Meeting Date", field: "meeting_date" },
        { headerName: "Site Stage", field: "sitestage" },
        { headerName: "Created Date", field: "created_date" },
        // {
        //     headerName: "Upload", field: "upload",
        //     cellRenderer: "LinkComponent",
        // }
    ];
    const fetchData = () => {
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getUseLeadData/' + localStorage.getItem('salesmanUserID'), {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            setRowData(response.data.data.map((leadData) => ({
                name: leadData.client_name,
                lead_persentage: leadData.lead_progress,
                mobile: leadData.mobile,
                address: leadData.address,
                refrence: leadData.refrence,
                meeting_date: leadData.meeting_date,
                sitestage: leadData.site_stage,
                created_date: leadData.created_on,
                upload: leadData.lead_id,
            })))
        }).catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        axios.get(IP + 'ventilia-api/api/leadGeneration/leadGeneration/getGrapgData/' + localStorage.getItem('salesmanUserID'), {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            setGraphData(response.data.data.graph)
            setTotalLead(response.data.data.tiles.total_lead)
            setActiveLead(response.data.data.tiles.active_lead)
            setCompletedLead(response.data.data.tiles.completed_lead)
            setCancelLead(response.data.data.tiles.cancel_lead)
        }).catch(err => console.log('response catch', err));

    }, [])
    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Reports
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

                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-green"></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Completed Lead</span>
                                    <span className="info-box-number">{completedLead}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
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
                                    <div className="chart tab-pane active" id="sales-chart" style={{ position: "relative", height: "300px" }}>
                                        <div
                                            className="ag-theme-alpine table"
                                            style={{
                                                height: '100rem',
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
            </div>
        </>
    )
}
export default MyReport;