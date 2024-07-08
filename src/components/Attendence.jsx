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
function Attendence() {
    let {id}  = useParams();
    const [rowData, setRowData] = useState([]);
    const [dailyUpdateData, setDailyUpdateData] = useState('');
    const[dailyUpdateId,setDailyUpdateId] = useState('');
    const [gridApi, setgridApi] = useState([]);
    const notify = (msg, type) => {
        if (type === 'success') {
            toast.success(msg);
        } else if (type === 'error') {
            toast.error(msg);
        } else {
            toast(msg);
        }
    }
    const saveDailyTask = ()=>{
        const data = {
            "daily_task":dailyUpdateData,
            'is_active': 1,
        }
        axios.put(IP + 'ventilia-api/index.php/api/user/attendence/'+dailyUpdateId, data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            if(!response.data.status){
                notify(response.data.error, 'error')
            }else{
                notify('Task updated successfullly.', 'success')
                fetchData();
            }
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error')
            console.log(err);
        });
    }
    const dailyUpdate = (props)=>{
        console.log('props ===',props)
        return(
            <>
                {props.data.attendence === 'p' && 
                <i  className="fa fa-pencil" onClick={()=>{setDailyUpdateId(props.value)}} id={props.value}  data-toggle="modal" data-target="#updateTask" aria-hidden="true"></i>}
            </>
        )    
    }
    const todayAttendence = async ()=>{
        const data = {
            'user_id':localStorage.getItem("user_id"),
            "attendence":"p",
            'is_active': 1,
            'location':''
        }
        axios.post(IP + 'ventilia-api/index.php/api/user/attendence', data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            if(!response.data.status){
                notify(response.data.error, 'error')
            }else{
                notify('Today attendence has applied successfullly.', 'success')
                fetchData();
            }
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error')
            console.log(err);
        });
    }
    const fetchData = ()=>{
       let url = id !== undefined ? `ventilia-api/index.php/api/user/attendence/` + id : 'ventilia-api/index.php/api/user/attendence/'+localStorage.getItem("user_id")
       console.log('attendence of idd==',id);
       axios.get(IP + url, {
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
            attendence: attendenceData.attendence,
            date:attendenceData.date,
            created_on: attendenceData.created_on,
            daily_task:attendenceData.daily_task,
            daily_update:attendenceData.id,
        })))
    }).catch(err => {
        // notify('Something got wrong please try again later.', 'error')
        console.log(err);
    });
    }
    useEffect(()=>{
        fetchData();
    },[])
    const tableColumn = [
        { headerName: "User Id", field: "user_name" },
        { headerName: "Attendence", field: "attendence" },
        { headerName: "Date", field: "date" },
        { headerName: "Created On", field: "created_on" },
        { headerName: "Task Details", field: "daily_task" },
        {
            headerName: "Daily Update", field: "daily_update",
            cellRenderer: "dailyUpdate",
        },
    ]

    const defaultColDef={sortable:true,editable:true,flex:1,filter:true,floatingFilter:true}
    const onGridReady=(params)=>{
    // gridApi=params.api
    setgridApi(params.api)
    }
    const onExportClick=()=>{
    gridApi.exportDataAsCsv();
    // gridApi.exportDataAsExcel()
    }
    const onExportClickXl=()=>{
        // gridApi.exportDataAsCsv();
        gridApi.exportDataAsExcel()
        }
    return (
        <>
            <div className="content-wrapper">
                <button onClick={todayAttendence}>Apply for today Attendence</button>
            <button
            onClick={()=>{onExportClick()}}
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Export to CSV
          </button>
            <section className="content">
                    <div className="row">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">Attendence Detail</h3>
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
                                            dailyUpdate
                                        }}
                                    >
                                    </AgGridReact>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" keyboard={false} id="updateTask">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Update Task</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea onChange={(e)=>{setDailyUpdateData(e.target.value)}} className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" onClick={saveDailyTask}className="btn btn-primary" data-dismiss="modal">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
                </div>
        </>
    )
}
export default Attendence;