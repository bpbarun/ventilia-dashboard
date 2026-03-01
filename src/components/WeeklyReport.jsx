import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './leadGeneration.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { IP } from './Constant';
import './weeklyReport.scss'
ChartJS.register(ArcElement, Tooltip, Legend);

const today = new Date().getDay(); 
const isMonday = today === 1;
// const isMonday = today === 0;

function WeeklyReport() {
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [opportunity, setOpportunityData] = useState([]);
    const [completedLeadRow, setCompletedLeadRow] = useState([]);
    const [promiseData, setPromiseData] = useState({
        newHunting: "",
        newQuotation: "",
        fallowUp: "",
        closing: ""
    });
    const [savedPromiseData, setSavedPromiseData] = useState([]);
    const [savedActualData, setSavedActualData] = useState([]);

    const [filters, setFilters] = useState({
        status: "",
        dateFrom: null,
        dateTo: null
      });
    const columnDefs = [
        { headerName: "Name", field: "name" },
        { headerName: "Mobile", field: "mobile" },
        { headerName: "Address", field: "address" },
        { headerName: "Refrence", field: "refrence" },
        { headerName: "Meeting Date", field: "meeting_date" },
        { headerName: "Site Stage", field: "sitestage" },
        { headerName: "Created Date", field: "created_date" }
    ]
    useEffect(() => {
        const week = getCurrentWeekRange();
        setFilters((prev) => ({
            ...prev,
            dateFrom: week.from,
            dateTo: week.to
        }));
        fetchLeadData(week.from, week.to);
        fetchOpportunityData(week.from, week.to);
        completeLeadData(week.from, week.to);
    }, []);
    const fetchLeadData = (fromDate = null, toDate = null) => {
        let postData={
            from: fromDate,
            to: toDate
        }
        axios.post(
            IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/weeklySalesReport/' + localStorage.getItem('salesmanUserID'),postData,
            {
                headers: {
                    token_code: localStorage.getItem("token_code"),
                    "Content-Type": "application/json"
                }
            }
        )
        .then((response) => {
            if (response.data.status) {
                const summary = response?.data?.summary;
                setSavedPromiseData(summary?.promise)
                setSavedActualData(summary?.actual)
                setRowData(response?.data?.leads.map((leadData) => ({
                    name: leadData.client_name,
                    mobile: leadData.mobile,
                    address: leadData.address,
                    refrence: leadData.refrence,
                    meeting_date: leadData.meeting_date,
                    sitestage: leadData.site_stage,
                    created_date: leadData.created_on
                })));
            } else {
                setRowData([]);
            }
        })
        .catch(err => console.log(err));
    };
    const opportunityColumn = [
        { headerName: "Name", field: "name" },
        { headerName: "Mobile", field: "mobile" },
        { headerName: "Address", field: "address" },
        { headerName: "Refrence", field: "refrence" },
        { headerName: "Meeting Date", field: "meeting_date" },
        { headerName: "Created Date", field: "created_date" },
        { headerName: "Total Area", field: "totalarea" },
        { headerName: "Total Unit", field: "totalunit" },
        { headerName: "Average Price", field: "averageprice" },
        { headerName: "Offer Price", field: "offerprice" },
    ];
    const fetchOpportunityData = (fromDate = null, toDate = null) => {
        let postData={
            from: fromDate,
            to: toDate
        }
        axios.post(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getWeeklyOpportunity/'+localStorage.getItem('salesmanUserID'), postData,{
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            setOpportunityData(response.data.data.map((leadData) => ({
                name: leadData.client_name,
                mobile: leadData.mobile,
                address: leadData.address,
                refrence: leadData.refrence,
                meeting_date: leadData.meeting_date,
                created_date: leadData.created_on,
                totalarea: leadData.total_area ? leadData.total_area : '--',
                totalunit: leadData.total_unit ? leadData.total_unit : '--',
                averageprice: leadData.average_price ? leadData.average_price : '--',
                offerprice: leadData.offer_price ? leadData.offer_price : '--',
                
            })))
        }).catch(err => {
            console.log(err);
        });
    }
    const completedLead = [
        { headerName: "Client Name", field: "client_name" },
        { headerName: "Mobile", field: "mobile" },
        { headerName: "Address", field: "address" },
        { headerName: "Comment", field: "complete_lead_comment" },
        { headerName: "Created On", field: "created_on" },
        { headerName: "Created By", field: "created_by" }
    ]
    const completeLeadData = (fromDate = null, toDate = null) => {
        let postData={
            from: fromDate,
            to: toDate
        }
        axios.post(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getWeeklyCompletedLead/'+localStorage.getItem('salesmanUserID'),postData, {
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
                    created_by:lead.user_name
                }))) : setCompletedLeadRow([])
        }).catch(err => {
            console.log(err);
        });
    }
    const savePromise = () => {
        if (!promiseData.newHunting || !promiseData.newQuotation) {
            alert("Please fill required fields");
            return;
        }
        axios
        .post(IP + "ventilia-api/index.php/api/leadGeneration/salesPromise/"+localStorage.getItem('salesmanUserID'), promiseData, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        })
        .then((response) => {
            if (response.data.status) {
                alert("Promise Saved Successfully");
                setPromiseData({
                    newHunting: "",
                    newQuotation: "",
                    fallowUp: "",
                    closing: ""
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getCurrentWeekRange = () => {
        const today = new Date();
        const day = today.getDay(); // 0-6
        const diffToMonday = day === 0 ? -6 : 1 - day;
        const monday = new Date(today);
        monday.setDate(today.getDate() + diffToMonday);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        const format = (date) => date.toISOString().split("T")[0];
        return {
            from: format(monday),
            to: format(sunday)
        };
    };
    const formatDateRangeLabel = (from, to) => {
        if (!from || !to) return "";
        const options = { day: "2-digit", month: "short", year: "numeric" };
        const fromDate = new Date(from).toLocaleDateString("en-GB", options);
        const toDate = new Date(to).toLocaleDateString("en-GB", options);
        return `${fromDate} - ${toDate}`;
    };
    const fetchWeeklyPromise = () => {
        const week = getCurrentWeekRange();
        let postData= {
            from:week.from,
            to:week.to
        }
        axios.post(
            IP + 'ventilia-api/index.php/api/leadGeneration/salesPromise/fetchWeeklyPromise/'+localStorage.getItem('salesmanUserID'),postData,
            {
                headers: {
                    token_code: localStorage.getItem("token_code"),
                }
            }
        )
        .then((res) => {
            if (res.data.status && res.data.data.length > 0) {
                const data = res.data.data[0];
                setPromiseData({
                    newHunting: data.newHunting,
                    newQuotation: data.newQuotation,
                    fallowUp: data.fallowUp,
                    closing: data.closing
                });
            } else {
                setPromiseData({
                    newHunting: "",
                    newQuotation: "",
                    fallowUp: "",
                    closing: ""
                });
            }
        })
        .catch(err => console.log(err));
    };
    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                <h3>
                    Weekly Meeting Reports
                    {filters.dateFrom && filters.dateTo && (
                        <span style={{ fontSize: "14px", fontWeight: "normal", marginLeft: "10px", color: "#666" }}>
                            ({formatDateRangeLabel(filters.dateFrom, filters.dateTo)})
                        </span>
                    )}
                </h3>
                <div className="weekly-result-bar">
                    <div className="kpi-item">
                        <div className="kpi-title">New Hunting</div>
                        <div className="kpi-value">
                            {savedActualData?.lead_generated || 0}
                            <span className="kpi-total">
                                / {savedPromiseData?.newHunting || 0}
                            </span>
                        </div>
                    </div>

                    <div className="kpi-divider"></div>

                    <div className="kpi-item">
                        <div className="kpi-title">New Quotation</div>
                        <div className="kpi-value">
                            {savedActualData?.quotation_generated || 0}
                            <span className="kpi-total">
                                / {savedPromiseData?.newQuotation || 0}
                            </span>
                        </div>
                    </div>

                    <div className="kpi-divider"></div>

                    <div className="kpi-item">
                        <div className="kpi-title">Closing</div>
                        <div className="kpi-value">
                            {savedActualData?.closed_count || 0}
                            <span className="kpi-total">
                                / {savedPromiseData?.closing || 0}
                            </span>
                        </div>
                    </div>
                </div>
                <span style={{marginTop:'1rem'}}>
                    <button className="btn weekly-report-btn" onClick={() => setOpen(true)}>Filters</button>
                    <button
                        className="btn weekly-report-btn"
                        data-toggle="modal"
                        data-target="#addSalesPromise"
                        onClick={fetchWeeklyPromise}
                    >
                        Add Data
                    </button>
                </span>
                </section>
                <section className="content">
                {open && (
                <div
                    className="custom-drawer-overlay"
                    onClick={() => setOpen(false)}
                />
                )}
                {/* Drawer */}
                <div className={`custom-drawer ${open ? "open" : ""}`}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h4>Filters</h4>
                    <button onClick={() => setOpen(false)}>X</button>
                </div>

                <hr />
                <div style={{ marginBottom: "15px" }}>
                <label>From Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={filters.dateFrom || ""}
                    onChange={(e) =>
                    setFilters({ ...filters, dateFrom: e.target.value })
                    }
                />
                </div>

                <div style={{ marginBottom: "15px" }}>
                <label>To Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={filters.dateTo || ""}
                    onChange={(e) =>
                    setFilters({ ...filters, dateTo: e.target.value })
                    }
                />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                <button
                        className="btn btn-default"
                        onClick={() => {
                            const week = getCurrentWeekRange();
                            setFilters({
                                status: "",
                                dateFrom: week.from,
                                dateTo: week.to
                            });
                            fetchLeadData(week.from, week.to)
                            fetchOpportunityData(week.from, week.to)
                            completeLeadData(week.from, week.to);

                        }}
                    >
                        Reset
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            fetchLeadData(filters.dateFrom, filters.dateTo);
                            fetchOpportunityData(filters.dateFrom, filters.dateTo)
                            completeLeadData(filters.dateFrom, filters.dateTo);
                            setOpen(false);
                        }}
                    >
                        Apply
                    </button>
                </div>
                </div>
                     <div className="row">
                        <div className="col-md-6">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                            <h3 className="box-title">New Hunting</h3>
                            </div>
                            <div className="box-body chart-responsive">
                            <div className="chart" id="revenue-chart" style={{height: '300px'}}>
                            <div
                                className="ag-theme-alpine table"
                                style={{
                                    height: '31rem',
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
                                    // frameworkComponents={{
                                    //     LinkComponent
                                    // }}
                                >
                                </AgGridReact>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className="box box-danger">
                            <div className="box-header with-border">
                            <h3 className="box-title">Follow up</h3>
                            </div>
                            <div className="box-body chart-responsive">
                            <div className="chart" id="sales-chart" style={{height: '300px',position:'relative'}} >
                            <div
                                className="ag-theme-alpine table"
                                style={{
                                    height: '31rem',
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
                                    columnDefs={[]}
                                    rowData={[]}
                                    // frameworkComponents={{
                                    //     LinkComponent
                                    // }}
                                >
                                </AgGridReact>
                            </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="box box-info">
                            <div className="box-header with-border">
                            <h3 className="box-title">New Quotation</h3>
                            </div>
                            <div className="box-body chart-responsive">
                            <div className="chart" id="line-chart" style={{height: '300px'}}>
                            <div
                                className="ag-theme-alpine table"
                                style={{
                                    height: '31rem',
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
                                    columnDefs={opportunityColumn}
                                    rowData={opportunity}
                                >
                                </AgGridReact>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className="box box-success">
                            <div className="box-header with-border">
                            <h3 className="box-title">Closed</h3>
                            </div>
                            <div className="box-body chart-responsive">
                            <div className="chart" id="bar-chart" style={{height: '300px'}}>
                            <div
                                className="ag-theme-alpine table"
                                style={{
                                    height: '31rem',
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
                                    columnDefs={completedLead}
                                    rowData={completedLeadRow}
                                >
                                </AgGridReact>
                            </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="modal fade" keyboard={false} id="addSalesPromise">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Generate Lead</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box-body">
                                <div className="box-body">
                                    <div className="form-group">
                                        <label>New Hunting</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={promiseData.newHunting}
                                            onChange={(e) =>
                                                setPromiseData({ ...promiseData, newHunting: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Name Quotation</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={promiseData.newQuotation}
                                            onChange={(e) =>
                                                setPromiseData({ ...promiseData, newQuotation: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Follow Up</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={promiseData.fallowUp}
                                            onChange={(e) =>
                                                setPromiseData({ ...promiseData, fallowUp: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Closing</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={promiseData.closing}
                                            onChange={(e) =>
                                                setPromiseData({ ...promiseData, closing: e.target.value })
                                            }
                                        />
                                    </div>

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                {isMonday && (
                                <button type="button" onClick={savePromise} className="btn btn-primary" data-dismiss="modal">Save</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                </section>
            </div>
        </>
    )
}
export default WeeklyReport;