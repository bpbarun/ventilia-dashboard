import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { toast } from 'react-toastify';
// import 'ag-grid-community/styles//ag-grid.css';
// import 'ag-grid-community/styles//ag-theme-alpine.css';
import '../../node_modules/ag-grid-community/styles/ag-grid.css';
import '../../node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import 'react-toastify/dist/ReactToastify.css';
import './leadGeneration.scss';
import { IP } from './Constant';
import ShowLeadAssets from './ShowLeadAssets';

function UploadQuatation() {
    const [selectedFile, setSelectedFile] = useState('');
    const [uploadId, setUploadId] = useState(0);
    const [totalPrice, setTotalPrice] = useState('');
    const [totalUnit, setTotalUnit] = useState('');
    const [totalArea, setTotalArea] = useState('');
    const [comment, setComment] = useState('');
    const [commentRow, setCommentRow] = useState([]);
    const [quotationRow, setQuotationRow] = useState([]);
    const { id } = useParams();
    const notify = (msg, type) => {
        if (type === 'success') {
            toast.success(msg);
        } else if (type === 'error') {
            toast.error(msg);
        } else {
            toast(msg);
        }
    }
    const handlecomment = (e) => {
        setComment(e.target.value)
    }
    function LinkComponent(props) {
        return (
            <div>
                <a onClick={() => setUploadId(props.value)} data-toggle="modal" data-target="#downloadDocument">Download Document</a>
            </div>
        );
    }
    function linkUploadQuotation(props) {
        return (
            <div>
                <i className="fa fa-cloud-upload" id={props.value} onClick={() => setUploadId(props.value)} data-toggle="modal" data-target="#uploadQuotationModal" aria-hidden="true"></i>
            </div>

        );
    }
    function showComment(props) {
        return (
            <a onClick={() => getCommentData(props.value)} data-toggle="modal" data-target="#showComment">Show Chat</a>
        );
    }
    function linkViewUploadQuotation(props) {
        return (
            <a onClick={() => getQuotationData(props.value)} data-toggle="modal" data-target="#showQuotation">Show Quotation</a>
        );
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
                    created_on: commentData.created_on,
                    user_name: commentData.user_name,

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
                    select: quotationData.quotation_asset_id,
                    active: quotationData.is_active === '1' ? 'Yes' : 'No',
                    quotation: IP + 'lead/' + quotationData.asset_name,
                    created_on: quotationData.created_on,
                    totalarea: quotationData.total_area ? quotationData.total_area : '--',
                    totalunit: quotationData.total_unit ? quotationData.total_unit : '--',
                    averageprice: quotationData.average_price ? quotationData.average_price : '--',
                    delete: quotationData.quotation_asset_id,

                }))) : setQuotationRow([])


        }).catch(err => {
            console.log(err);
        });
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
        },
        {
            headerName: "Lead Comment", field: "leadcomment",
            cellRenderer: "showComment",
        },
        {
            headerName: "View Uploaded Quotation", field: "viewuploadQuotation",
            cellRenderer: "linkViewUploadQuotation"
        }
    ];
    const [rowData, setRowData] = useState([]);
    const fetchData = () => {
        let url = id !== undefined ? 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getQuotationLead/' + id : 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getQuotationLead'
        axios.get(IP + url, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            if (response.data.status) {
                setRowData(response.data.data.map((leadData) => ({
                    name: leadData.client_name,
                    mobile: leadData.mobile,
                    address: leadData.address,
                    refrence: leadData.refrence,
                    sitestage: leadData.site_stage,
                    uploadQuotation: leadData.lead_id,
                    viewDocument: leadData.lead_id,
                    leadcomment: leadData.lead_id,
                    viewuploadQuotation: leadData.lead_id
                })))
            } else {
                setRowData([]);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [id]);


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
    function quotationImage(props) {
        return (
            (props.value !== '--') ? <a href={props.value} download target="_blank">View</a> : 'No Quotation'
        )
    }
    function deleteQuotation(props){
        return (
             <span data-dismiss="modal" onClick={()=>{deleteQuuotationData(props.value)}}>
                <i className="fa fa-trash" aria-hidden="true"></i>
             </span> 
        )
    }
    const deleteQuuotationData = (id)=>{
        console.log('deleting quotation data is ===',id);
        axios
            .delete(IP + "ventilia-api/index.php/api/quotationUpload/quotationUpload/"+id, {
                headers: {
                    'token_code': localStorage.getItem("token_code"),
                    'content-type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Headers': '*'
                }
            })
            .then(res => {
                notify('Quotation deleted successfullly.', 'success')
            })
            .catch(err => {
                notify('Getting error in uploading the Quotation.', 'error')
                console.log(err);
            });
    }
    function commentDataDisplay() {
        const commentColumn = [
            { headerName: "Comment", field: "comment" },
            { headerName: "Created On", field: "created_on" },
            { headerName: "User Name", field: "user_name" } 
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
            { headerName: "Delete", field: "delete",
                cellRenderer:"deleteQuotation" },

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
                            deleteQuotation
                        }}
                    >
                    </AgGridReact>
                </div>
            </>
        )
    }
    const addComment = () => {
        const data = {
            'lead_id': uploadId,
            'comment': comment,
            'is_active': 1
        }
        axios.post(IP + 'ventilia-api/index.php/api/leadGeneration/comment/', data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Comment saved successfullly.', 'success')
            fetchData();
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error')
            console.log(err);
        });
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
                                            linkUploadQuotation,
                                            showComment,
                                            linkViewUploadQuotation
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
                                <button type="button" className="btn btn-default" data-dismiss="modal">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="downloadDocument">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Download Document</h4>
                            </div>
                            <div className="modal-body">
                                {uploadId && <ShowLeadAssets lead_id={uploadId} />}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Ok</button>
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
                            <div className="modal-body">
                                <label>Comment</label>
                                <div className="form-group">
                                    <textarea value={comment} onChange={handlecomment} className="form-control" rows="3" placeholder="Enter any comment"></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Cancel</button>
                                <button type="button" onClick={addComment} className="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UploadQuatation;