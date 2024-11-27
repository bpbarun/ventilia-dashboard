import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles//ag-grid.css';
// import 'ag-grid-community/styles//ag-theme-alpine.css';
import '../../node_modules/ag-grid-community/styles/ag-grid.css';
import '../../node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import axios from 'axios';import { IP } from './Constant'
import { toast } from 'react-toastify';

function RequestForApproval(props){
    const [rowData, setRowData] = useState([]);
    const [actionId,setActionId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [textArea, setTextArea] = useState('');
    const notify = (msg, type) => {
        if (type === 'success') {
            toast.success(msg);
        } else if (type === 'error') {
            toast.error(msg);
        } else {
            toast(msg);
        }
    }
    function requestAction(props) {
        return (
            <div>
                <i  className="fa fa-check" aria-hidden="true" onClick= {()=>{showApprovalData(props.value)}}  title="approveed"  data-toggle="modal" data-target="#actionModal"></i>
                 &nbsp;&nbsp;&nbsp;&nbsp;
                <i  className="fa fa-times" aria-hidden="true" onClick= {()=>{denied(props.value)}} title="denied" id={props.value} ></i>

            </div>
        );
    }
    const showApprovalData = (id)=>{
        setActionId(id)
        axios.get(IP + 'ventilia-api/index.php/api/user/leave/getSingleData/'+id, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            setStartDate(response.data.data[0].start_date);
            setEndDate(response.data.data[0].end_date)
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error')
            console.log(err);
        });
    }
    const approved=()=>{
        const data = {
            'status':3,
            'start_date':startDate,
            'end_date':endDate,
            'approval_comment':textArea
        }
        axios.put(IP + 'ventilia-api/index.php/api/user/leave/'+actionId,data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Leave Approved successfully.', 'success')
            fetchData();
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error')
            console.log(err);
        });
    }
    const denied=(id)=>{
        const data = {
            'status':2
        }
        axios.put(IP + 'ventilia-api/index.php/api/user/leave/'+id,data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Leave Denied successfully.', 'success')
            fetchData();
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error')
            console.log(err);
        });
    }
    const fetchData = ()=>{
        axios.get(IP + 'ventilia-api/index.php/api/user/leave/requestForApproval', {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            console.log('response.data.data is=',response.data.data)
            if(response.data.data !== undefined){
                setRowData(response.data.data.map((leave) => ({
                    user_name: leave.user_name,
                    comment: leave.text_message,
                    start_date: leave.start_date,
                    end_date: leave.end_date,
                    created_on: leave.created_on,
                    requestAction: leave.id,
                })))
                props.noOfRequestData(response.data.data.length)
            }else{
                setRowData([])
                props.noOfRequestData(0)
            }
           
        }).catch(err => {
            console.log('Something got wrong please try again later.', 'error')
            console.log(err);
        });
       }
       useEffect(()=>{
        fetchData();
       },[])
       const tableColumn = [
        { headerName: "User Id", field: "user_name" },
        { headerName: "Comment", field: "comment" },
        { headerName: "Start Date", field: "start_date" },
        { headerName: "End Date", field: "end_date" },
        { headerName: "Requested On", field: "created_on" },
        { headerName: "Action", field: "requestAction",
        cellRenderer: "requestAction" },
    ]
    return(
        <div className="content-wrapper">
            {/* <ToastContainer /> */}
            
             <section className="content">
                    <div className="row">
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
                                        frameworkComponents={{
                                            requestAction
                                        }}
                                    >
                                    </AgGridReact>
                                </div>
                            </div>
                    </div>
                </section>
                <div className="modal fade" id="actionModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Approval</h4>
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={approved} className="btn btn-default" data-dismiss="modal">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>    
        </div>
    )
}
export default RequestForApproval