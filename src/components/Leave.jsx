import React, { useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import axios from 'axios';
import './leadGeneration.scss';
import { IP } from './Constant'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useParams,
} from "react-router-dom";
function Leave() {
    let {id}  = useParams();
    const [rowData, setRowData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [estartDate, setEStartDate] = useState('');
    const [eendDate, setEEndDate] = useState('');
    const [leaaveId, setLeaaveId] = useState('');
    const [gridApi, setgridApi] = useState([]);
    const [textArea, setTextArea] = useState([]);
    const [officialLeaveRow,setOfficialLeaveRow] = useState([]);
    const notify = (msg, type) => {
        if (type === 'success') {
            toast.success(msg);
        } else if (type === 'error') {
            toast.error(msg);
        } else {
            toast(msg);
        }
    }
    function editLeave(props) {
        return (
            <div>
                <i onClick={() => getLeaveDetail(props.value)} className="fa fa-cloud-upload" id={props.value}  data-toggle="modal" data-target="#EditLeaveModal" aria-hidden="true"></i>
            </div>
        );
    }
    const getLeaveDetail = (id) => {
        setLeaaveId(id)
        axios.get(IP + 'ventilia-api/index.php/api/user/leave/' + id, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
           setEStartDate(response.data.data.start_date)
           setEEndDate(response.data.data.end_date)
        }).catch(err => {
            console.log(err);
        });
    }
    const fetchData = ()=>{
        let idData = id !== undefined ? id:localStorage.getItem("user_id");
        console.log('attendence of is==',idData);
       axios.get(IP + 'ventilia-api/index.php/api/user/leave/'+idData, {
        headers: {
            'token_code': localStorage.getItem("token_code"),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }).then((response) => {
        setRowData(response.data.data.map((attendenceData) => ({
            user_name: attendenceData.user_name,
            status: (attendenceData.status === '3')?'Approved':
            (attendenceData.status === '2')?'Denied':(attendenceData.status === '1')?'Pending':attendenceData.status,
            approval_comment:attendenceData.approval_comment,
            start_date: attendenceData.start_date,
            end_date: attendenceData.end_date,
            text_message:attendenceData.text_message,
            created_on: attendenceData.created_on,
            editLeave: attendenceData.id,

        })))
    }).catch(err => {
        // notify('Something got wrong please try again later123.', 'error')
        console.log(err);
    });
    }
    useEffect(()=>{
        fetchData();
        officialLeave();
    },[])
    const tableColumn = [
        { headerName: "User Id", field: "user_name" },
        { headerName: "Status", field: "status" },
        { headerName: "Approval Comment", field: "approval_comment" },
        { headerName: "Start Date", field: "start_date" },
        { headerName: "End Date", field: "end_date" },
        { headerName: "Employee Comment", field: "text_message" },
        { headerName: "Requested On", field: "created_on" },
        {
            headerName: "Edit", field: "editLeave",
            cellRenderer: "editLeave",
        },
    ]
    const onGridReady=(params)=>{
        setgridApi(params.api)
    }
    const onExportClick=()=>{
        gridApi.exportDataAsCsv();
    }
    const leaveApply = ()=>{
        const data = {
            'user_id':  localStorage.getItem("user_id"),
            'start_date': startDate,
            'end_date': endDate,
            'text_message':textArea,
            'status':1
        }
        axios.post(IP + 'ventilia-api/index.php/api/user/leave',data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Leave apply successfully.', 'success')
            fetchData();
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error')
            console.log(err);
        });
    }
   const updateLeaveApply = ()=>{
    const data = {
        'user_id':  localStorage.getItem("user_id"),
        'start_date': estartDate,
        'end_date': eendDate,
        'status':1
    }
    axios.put(IP + 'ventilia-api/index.php/api/user/leave/'+leaaveId,data, {
        headers: {
            'token_code': localStorage.getItem("token_code"),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }).then((response) => {
        notify('Leave apply successfully.', 'success')
        fetchData();
    }).catch(err => {
        notify('Something got wrong please try again later.', 'error')
        console.log(err);
    });
   }
   function getDayName(dateString) {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date.getDay();
    const dayName = days[dayIndex];
    return dayName;
}
   const officialLeave = () =>{
    axios.get(IP + 'ventilia-api/index.php/api/user/officialLeave/', {
        headers: {
            'token_code': localStorage.getItem("token_code"),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }).then((res) => {
        console.log('response of official leave is =========',res.data.data)

         setOfficialLeaveRow(res.data.data.map((leave,index) => (
          {
          sno:index + 1,
          title: leave.reason,
          date: leave.date,
          day: getDayName(leave.date)
          }
      )))
    })
   }
   const officialLeavecolumnDefs = [
    { headerName: "#", field: "sno",width:70 },
    { headerName: "Title", field: "title" },
    { headerName: "Date", field: "date" },
    { headerName: "Day", field: "day"},

]
    return (
        <>
            <div className="content-wrapper">
                <button data-toggle="modal" data-target="#applyLeaveModal">Apply Leave</button>
            <button
            onClick={()=>{onExportClick()}}
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Export to CSV
          </button>
          <button data-toggle="modal" data-target="#holidayListModal">Holiday List</button>
            {/* {attendenceTable} */}
            <section className="content">
                    <div className="row">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">Leave Detail</h3>
                            </div>
                            <div className="box-body">
                                <div
                                    className="ag-theme-alpine table"
                                    style={{
                                        height: '50rem',
                                        width: '100%',
                                    }}
                                >
                                    <AgGridReact
                                        defaultColDef={{
                                            sortable: true,
                                            filter: true,
                                            resizable: true,
                                            // floatingFilter:true

                                        }}
                                        pagination
                                        paginationPageSize={10}
                                        suppressRowTransform={true}
                                        columnDefs={tableColumn}
                                        rowData={rowData}
                                        onGridReady={onGridReady}
                                        frameworkComponents={{
                                            editLeave
                                        }}
                                    >
                                    </AgGridReact>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <div className="modal fade" keyboard={false} id="applyLeaveModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Apply Leave</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box-body">
                                    <form role="form"> 
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input type="date" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <input type="date" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Message</label>
                                            <textarea onChange={(e)=>{setTextArea(e.target.value)}} className="form-control"></textarea>
                                            {/* <input type="text" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}} className="form-control" /> */}
                                        </div>
                                    </form>
                                </div>
                                {/*  */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" onClick={leaveApply} className="btn btn-primary" data-dismiss="modal">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" keyboard={false} id="EditLeaveModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Apply Leave</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box-body">
                                    <form role="form">
                                       
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input type="date" value={estartDate} onChange={(e)=>{setEStartDate(e.target.value)}} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <input type="date" value={eendDate} onChange={(e)=>{setEEndDate(e.target.value)}} className="form-control" />
                                        </div>
                                    </form>
                                </div>
                                {/*  */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" onClick={updateLeaveApply} className="btn btn-primary" data-dismiss="modal">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" keyboard={false} id="holidayListModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Holiday List</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box-body">
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
                                                columnDefs={officialLeavecolumnDefs}
                                                rowData={officialLeaveRow}
                                            >
                                            </AgGridReact>
                                        </div>
                                </div>
                                {/*  */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </>
    )
}
export default Leave;