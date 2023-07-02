import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import './leadGeneration.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Reports() {
    const [rowData, setRowData] = useState([]);

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const columnDefs = [
        { headerName: "SealseMan Name", field: "offer_price" },
        { headerName: "Lead", field: "gst" },
        { headerName: "Progress", field: "freight" }]
    useEffect(() => {
        axios.get('http://192.168.29.237/ventilia-api/api/leadGeneration/offerDetails/', {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            (response.data.status) ?
            setRowData(response.data.data.map((offerData) => ({
                    offer_price: offerData.offer_price,
                    gst: offerData.gst,
                    freight: offerData.freight,

                }))) : setRowData([])


        }).catch(err => console.log('response catch', err));

    })
    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Dashboard
                        <small>Control panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                        <li className="active">Dashboard</li>
                    </ol>
                </section>
                <section className="content">
                    <div class="row">
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">Total Lead</span>
                                    <span class="info-box-number">90<small></small></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-yellow"><i class="fa fa-google-plus"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">Active Lead </span>
                                    <span class="info-box-number">40</span>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix visible-sm-block"></div>

                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-green"><i class="ion ion-ios-cart-outline"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">Completed Lead</span>
                                    <span class="info-box-number">30</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="info-box">
                                <span class="info-box-icon bg-red "><i class="ion ion-ios-people-outline"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">Cancel Lead</span>
                                    <span class="info-box-number">20</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <section className="col-lg-7 connectedSortable">
                            <div className="nav-tabs-custom">
                                <ul className="nav nav-tabs pull-right">
                                    <li className="active"><a href="#revenue-chart" data-toggle="tab">Area</a></li>
                                    <li><a href="#sales-chart" data-toggle="tab">Donut</a></li>
                                    <li className="pull-left header"><i className="fa fa-inbox"></i> Sales</li>
                                </ul>
                                <div className="tab-content no-padding">
                                    <div className="chart tab-pane active" id="revenue-chart" style={{ position: "relative", height: "300px" }}>
                                        Hello
                                    </div>
                                    <div className="chart tab-pane" id="sales-chart" style={{ position: "relative", height: "300px" }}>
                                        <div
                                            className="ag-theme-alpine table"
                                            style={{
                                                height: '20rem',
                                                width: '100%'
                                            }}
                                        >
                                            <AgGridReact
                                                defaultColDef={{
                                                    sortable: true,
                                                    filter: true,
                                                    resizable: true
                                                }}

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
export default Reports;