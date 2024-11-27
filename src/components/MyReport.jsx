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

function MyReport() {
    const [rowData, setRowData] = useState([]);
    const [graphData, setGraphData] = useState();
    const [totalLead, setTotalLead] = useState();
    const [activeLead, setActiveLead] = useState();
    const [completedLead, setCompletedLead] = useState();
    const [cancelLead, setCancelLead] = useState();
    const [uploadId, setUploadId] = useState(0);
    const [rowData1, setRowData1] = useState([]);
    const [commentRow, setCommentRow] = useState([]);
    const [quotationRow, setQuotationRow] = useState([]);
    const [cancelLeadRow, setCancelLeadRow] = useState([]);
    const [completedLeadRow, setCompletedLeadRow] = useState([]);

        
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
        { headerName: "Total Area", field: "totalarea" },
        { headerName: "Total Unit", field: "totalunit" },
        { headerName: "Average Price", field: "averageprice" },
        {
            headerName: "View Quotation", field: "viewquotation",
            cellRenderer: "LinkComponentImage",
        },
        { headerName: "Offer Price", field: "offerprice" },
        { headerName: "GST", field: "gst" },
        { headerName: "Freight", field: "freight" },
        { headerName: "Close Date", field: "close_date" },
        {
            headerName: "Create Offer", field: "createoffer",
            cellRenderer: "CreateOffer",
        },
        {
            headerName: "Lead Comment", field: "leadcomment",
            cellRenderer: "showComment",
        }
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

                totalarea: leadData.total_area ? leadData.total_area : '--',
                totalunit: leadData.total_unit ? leadData.total_unit : '--',
                averageprice: leadData.average_price ? leadData.average_price : '--',
                viewquotation: leadData.lead_id,
                offerprice: leadData.offer_price ? leadData.offer_price : '--',
                gst: leadData.gst ? leadData.gst : '--',
                freight: leadData.freight ? leadData.freight : '--',
                close_date: leadData.close_date ? leadData.close_date : '--',
                createoffer: leadData.lead_id,
                leadcomment: leadData.lead_id,
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
    function LinkComponentImage(props) {
        return (
            <a onClick={() => getQuotationData(props.value)} data-toggle="modal" data-target="#showQuotation">Show Quotation</a>
        );
    }
    function CreateOffer(props) {
        return (
            <a data-toggle="modal" onClick={() => getOfferData(props.value)} data-target="#addOffer">Show Offer</a>
        );
    }
    function showComment(props) {
        return (
            <a onClick={() => getCommentData(props.value)} data-toggle="modal" data-target="#showComment">Show Comment</a>
        );
    }
    function quotationImage(props) {
        return (
            (props.value !== '--') ? <a href={props.value} download target="_blank">View</a> : 'No Quotation'
        )
    }
    const getOfferData = (id) => {
        setUploadId(id);
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/offerDetails/' + id, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            (response.data.status) ?
                setRowData1(response.data.data.map((offerData) => ({
                    offer_price: offerData.offer_price,
                    gst: offerData.gst,
                    freight: offerData.freight,

                }))) : setRowData1([])


        }).catch(err => {
            console.log(err);
        });
    }
    const getCommentData = (id) => {
        setUploadId(id);
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/comment/' + id, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            (response.data.status) ?
                setCommentRow(response.data.data.map((commentData) => ({
                    comment: commentData.comment,
                    created_on: commentData.created_on
                }))) : setCommentRow([])

        }).catch(err => {
            console.log(err);
        });
    }
    const getQuotationData = (id) => {
        setUploadId(id);
        axios.get(IP + 'ventilia-api/index.php/api/quotationUpload/quotationUpload/' + id, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            (response.data.status) ?
                setQuotationRow(response.data.data.map((quotationData) => ({
                    active: quotationData.is_active === '1' ? 'Yes' : 'No',
                    quotation: IP + 'lead/' + quotationData.asset_name,
                    created_on: quotationData.created_on,
                    totalarea: quotationData.total_area ? quotationData.total_area : '--',
                    totalunit: quotationData.total_unit ? quotationData.total_unit : '--',
                    averageprice: quotationData.average_price ? quotationData.average_price : '--',

                }))) : setQuotationRow([])


        }).catch(err => {
            console.log(err);
        });
    }
    const quotationDataDisplay = () => {
        const quotationColumn = [
            { headerName: "Active", field: "active" },
            {
                headerName: "View", field: "quotation",
                cellRenderer: "quotationImage",
            },
            { headerName: "Created On", field: "created_on" },
            { headerName: "Total Area", field: "totalarea" },
            { headerName: "Total Unit", field: "totalunit" },
            { headerName: "Average Price", field: "averageprice" },
        ]
        return (
            <>
                <div
                    className="ag-theme-alpine"
                    style={{
                        height: '30rem',
                        width: '100%',
                    }}
                >
                    <AgGridReact
                        defaultColDef={{
                            sortable: true,
                            filter: true,
                            resizable: true
                        }}
                        columnDefs={quotationColumn}
                        rowData={quotationRow}
                        frameworkComponents={{
                            quotationImage,
                            // selectOpportunity
                        }}
                    >
                    </AgGridReact>
                </div>
            </>
        )
    }
    function offerDataDisplay() {
        const columnDefs1 = [
            { headerName: "Offer Price", field: "offer_price" },
            { headerName: "GST", field: "gst" },
            { headerName: "Freight", field: "freight" }]
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
                        rowData={rowData1}
                    >
                    </AgGridReact>
                </div>
            </>
        )
    }
    function commentDataDisplay() {
        const commentColumn = [
            { headerName: "Comment", field: "comment" },
            { headerName: "Created On", field: "created_on" }
        ]
        return (
            <>
                <div
                    className="ag-theme-alpine"
                    style={{
                        height: '30rem',
                        width: '100%',
                    }}
                >
                    <AgGridReact
                        defaultColDef={{
                            sortable: true,
                            filter: true,
                            resizable: true
                        }}
                        columnDefs={commentColumn}
                        rowData={commentRow}
                        quotationImage
                    >
                    </AgGridReact>
                </div>
            </>
        )
    }
    const completeLeadData = () => {
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getCompletedLead/' + localStorage.getItem('salesmanUserID'), {
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
            { headerName: "Created On", field: "created_on" }
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
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getCancelLead/' + localStorage.getItem('salesmanUserID'), {
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
            { headerName: "Created On", field: "created_on" }
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
                        Reports
                    </h1>
                    <ol className="breadcrumb">
                        <NavLink to={`/Attendence/`+localStorage.getItem('salesmanUserID')}> <a>Attendence</a>
                        </NavLink>
                        <NavLink to={`/Leave/`+localStorage.getItem('salesmanUserID')}  style={{ color: "black" }}> <a>Leave Details</a>
                        </NavLink>
                        {localStorage.getItem('user_role') !== 'sealseman' &&
                        <NavLink to={`/showLocation/`+localStorage.getItem('salesmanUserID')}  style={{ color: "black" }}> <a>Show location</a>
                        </NavLink>
                        }
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
                                                height: '50rem',
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
                                                    LinkComponentImage,
                                                    CreateOffer,
                                                    showComment
                                                }}
                                            >
                                            </AgGridReact>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="showQuotation">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span></button>
                                                <h4 className="modal-title">Quotation</h4>
                                            </div>
                                            <div className="modal-body">
                                                {quotationDataDisplay()}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="addOffer">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span></button>
                                                <h4 className="modal-title">Offer Detail</h4>
                                            </div>
                                            <div className="modal-body">
                                                <div className="box-body">
                                                    <form role="form">
                                                        <div id="offerTable">
                                                            {offerDataDisplay()}
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="showComment">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span></button>
                                                <h4 className="modal-title">Comment</h4>
                                            </div>
                                            <div className="modal-body">

                                                {commentDataDisplay()}

                                            </div>

                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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