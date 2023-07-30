import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { toast } from 'react-toastify';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import 'react-toastify/dist/ReactToastify.css';
import './leadGeneration.scss';
import { IP } from './Constant';

function UploadQuatation() {
    const [selectedFile, setSelectedFile] = useState('');
    const [uploadId, setUploadId] = useState(0);
    const [totalPrice, setTotalPrice] = useState('');
    const [totalUnit, setTotalUnit] = useState('');
    const [totalArea, setTotalArea] = useState('');


    const notify = (msg, type) => {
        if (type === 'success') {
            toast.success(msg);
        } else if (type === 'error') {
            toast.error(msg);
        } else {
            toast(msg);
        }
    }
    function LinkComponent(props) {
        return (
            <a href={props.value} download target="_blank">
                Download Document
            </a>
        );
    }
    function linkUploadQuotation(props) {
        return (
            <div>
                <i className="fa fa-cloud-upload" id={props.value} onClick={() => setUploadId(props.value)} data-toggle="modal" data-target="#uploadQuotationModal" aria-hidden="true"></i>
            </div>

        );
    }
    const columnDefs = [
        { headerName: "Name", field: "name" },
        { headerName: "Mobile", field: "mobile" },
        { headerName: "Address", field: "address" },
        { headerName: "Refrence", field: "refrence" },
        { headerName: "Site Stage", field: "sitestage" },
        {
            headerName: "View Document", field: "viewDocument",
            cellRenderer: "LinkComponent",
        },
        {
            headerName: "Upload Quotation", field: "uploadQuotation",
            cellRenderer: "linkUploadQuotation"
        }
    ];

    const [rowData, setRowData] = useState([]);

    const fetchData = () => {
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getQuotationLead', {
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
                mobile: leadData.mobile,
                address: leadData.address,
                refrence: leadData.refrence,
                sitestage: leadData.site_stage,
                uploadQuotation: leadData.lead_id,
                viewDocument: IP + 'lead/' + leadData.asset_name
            })))
            console.log('rowData==', rowData)
        }).catch(err => {
            console.log(err);

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
        data.append("lead_id", uploadId);
        data.append("is_active", 1);
        data.append("total_area", totalArea);
        data.append("total_unit", totalUnit);
        data.append("average_price", totalPrice);
        axios
            .post(IP + "ventilia-api/index.php/api/quotationUpload/quotationUpload/", data, {
                headers: {
                    'token_code': localStorage.getItem("token_code"),
                    'content-type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Headers': '*'
                }
            })
            .then(res => {
                notify('Quotation uploaded successfullly.', 'success')
                console.log(res.statusText);
            })
            .catch(err => {
                notify('Getting error in uploading the Quotation.', 'error')
                console.log(err);
                // navigate('/login');
            });
    };
    const handleTotalArea = (e) => {
        setTotalArea(e.target.value);
    }
    const handleTotalUnit = (e) => {
        setTotalUnit(e.target.value);
    }
    const handleTotalPrice = (e) => {
        setTotalPrice(e.target.value);
    }
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
                                        rowData={rowData}
                                        frameworkComponents={{
                                            LinkComponent,
                                            linkUploadQuotation
                                        }}
                                    >
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
                                        <div className="form-group">
                                            <label>Total Area</label>
                                            <input type="text" onChange={handleTotalArea} id="totalArea" placeholder="Area" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Total Unit </label>
                                            <input type="text" onChange={handleTotalUnit} id="totalUnit" placeholder="Unit" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Average Price </label>
                                            <input type="text" onChange={handleTotalPrice} id="totalPrice" placeholder="Price" className="form-control" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" onClick={onClickHandler} className="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default UploadQuatation;