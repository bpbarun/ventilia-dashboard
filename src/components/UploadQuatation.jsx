import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import './leadGeneration.scss';
// import LeadGeneration from './components/LeadGeneration';
import { useNavigate } from "react-router-dom";

function UploadQuatation() {
    const [selectedFile, setSelectedFile] = useState('');
    const [getQuotation, setGetQuotationValue] = useState('');
    const navigate = useNavigate();
const ImageRenderer = (params)=>{
    return (<img src={params.rendererImage }alt="not found" />);
}
    const [columnDefs, setColumnDeft] = useState([
        { headerName: "Name", field: "name" },
        { headerName: "Mobile", field: "mobile" },
        { headerName: "Address", field: "address" },
        { headerName: "Refrence", field: "refrence" },
        { headerName: "Site Stage", field: "sitestage" },
        { headerName: "View Document", field: "viewDocument",
        cellRenderer: ImageRenderer,
        cellRendererParams: { rendererImage: 'sun.png' },},
        {
            headerName: "Upload Quotation", field: "uploadQuotation", cellRenderer: (params) =>
                <div>
                    <i className="fa fa-cloud-upload" data-toggle="modal" data-target="#uploadQuotationModal" aria-hidden="true"></i>
                </div>
        }
    ]);

    const [rowData, setRowData] = useState([
        { name: "Barun", mobile: "6260964301", address: "Vijay Nagar", refrence: "other", sitestage: "abc", upload: '' },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other", sitestage: "abc", upload: "" },
    ]);

    const fetchData = () => {
        axios.get('http://192.168.29.237/ventilia-api/api/leadGeneration/leadGeneration/getQuotationLead', {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            setGetQuotationValue(response.data.data);
            setRowData(response.data.data.map((leadData) => ({
                name: leadData.client_name,
                mobile: leadData.mobile,
                address: leadData.address,
                refrence: leadData.refrence,
                sitestage: leadData.site_stage,
                viewDocument:''
            })))
            console.log('rowData==', rowData)
        }).catch(err => {
            console.log(err);
            navigate('/login');
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onChangeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const onClickHandler = (file) => {
        console.log('selectedFile', selectedFile.File)
        const data = new FormData();
        data.append("file", selectedFile);
        console.log('data=', data)
        for (var key of data.entries()) {
            console.log(key[0] + ", " + key[1]);
        }
        console.log('aaa',data)
        axios
            .post("http://192.168.29.237/ventilia-api/api/quotationUpload/quotationUpload/", data, {
                headers: {
                    'token_code': localStorage.getItem("token_code"),
                    'content-type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Headers': '*'
                }
            })
            .then(res => {
                console.log(res.statusText);
            })
            .catch(err => {
                localStorage.clear();
                console.log(err);
                // navigate('/login');
            });
    };
    return (
        <>
            <div className="content-wrapper leadGeneration-content">
                <section className="content">
                    <div className="row">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">Upload Quatation</h3>
                            </div>
                            <div className="box-body">
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
                                        columnDefs={columnDefs}
                                        rowData={rowData}>
                                    </AgGridReact>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="modal fade" id="uploadQuotationModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Upload Document</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box-body">
                                    <form role="form">
                                        <div className="form-group">
                                            <label>Upload</label>
                                            <input type="file" onChange={onChangeHandler} className="form-control" />
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" onClick={onClickHandler} className="btn btn-primary">Share</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default UploadQuatation;