import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { toast } from 'react-toastify';
import { IP } from './Constant'
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import 'react-toastify/dist/ReactToastify.css';
import './leadGeneration.scss';

function LeadGeneration() {
    const [refrencrOption, setResrenceOption] = useState(null);
    const [siteOption, setSiteOption] = useState(null);
    const [clientName, setClientName] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    // const [email, setEmail] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [uploadId, setUploadId] = useState(0);
    const [offerPrice, setOfferPrice] = useState('');
    const [gst, setGst] = useState('');
    const [freight, setFreight] = useState('');
    const [comment, setComment] = useState('');
    const [rowData, setRowData] = useState([]);
    const [rowData1, setRowData1] = useState([]);
    const [commentRow, setCommentRow] = useState([]);
    const [quotationRow, setQuotationRow] = useState([]);
    const [leadCompleteComment, setLeadCompleteComment] = useState([]);
    const [leadCancelComment, setLeadCancelComment] = useState([]);


    const notify = (msg, type) => {
        if (type === 'success') {
            toast.success(msg);
        } else if (type === 'error') {
            toast.error(msg);
        } else {
            toast(msg);
        }
    }
    const refrenceOptions = [
        { value: 'architect/interior designer', label: 'Architect/Interior designer' },
        { value: 'contractor', label: 'Contractor' },
        { value: 'dealer', label: 'Dealer' },
        { value: 'old cilent', label: 'Old cilent' },
        { value: 'others', label: 'others' }
    ];
    const siteOptions = [
        { value: 'brick-work', label: 'Brick work' },
        { value: 'plaster', label: 'Plaster' },
        { value: 'granite work', label: 'Granite work' },
        { value: 'ready', label: 'Ready' }
    ]

    const handleRefrenceChange = (e) => {
        console.log('aaaa', e);
        setResrenceOption(e.value)
    };

    const handleSiteChange = (e) => {
        console.log('bbbbb', e);
        setSiteOption(e.value)
    };
    function LinkComponent(props) {
        return (
            <div>
                <i className="fa fa-cloud-upload" id={props.value} onClick={() => setUploadId(props.value)} data-toggle="modal" data-target="#uploadModal" aria-hidden="true"></i>
            </div>
        );
    }
    function LinkComponentImage(props) {
        return (
            <a onClick={() => getQuotationData(props.value)} data-toggle="modal" data-target="#showQuotation">Show Quotation</a>
        );
    }
    function CreateOffer(props) {
        return (
            <a data-toggle="modal" onClick={() => getOfferData(props.value)} data-target="#addOffer">Create Offer</a>
        );
    }
    function showComment(props) {
        return (
            <a onClick={() => getCommentData(props.value)} data-toggle="modal" data-target="#showComment">Add/Show Comment</a>
        );
    }
    function CreateMoreAction(props) {
        return (
            <>
                <div>
                    <ul className="nav">
                        <li className="dropdown" id={props.value} onClick={() => moreLinkBtnClick(props.value)}>
                            <i className="fa fa-ellipsis-v" aria-hidden="true" ></i>
                            <ul className="dropdown-menu">
                                <li role="presentation"><a data-toggle="modal" onClick={() => setUploadId(props.value)} data-target="#completeLead">Complete Lead</a></li>
                                <li role="presentation"><a data-toggle="modal" onClick={() => setUploadId(props.value)} data-target="#cancelLead">Cancel Lead</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
    function quotationImage(props) {
        return (
            (props.value !== '--') ? <a href={props.value} download target="_blank">View</a> : 'No Quotation'

        )
    }
    const completeLead = () => {
        console.log('complete the lead');
        const data = {
            'is_active': 3,
            'complete_lead_comment': leadCompleteComment
        }
        axios.put(IP + 'ventilia-api/api/leadGeneration/leadGeneration/' + uploadId, data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Lead completed successfullly.', 'success');
            fetchData();
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error');
            console.log(err);
        });
    }
    const cancelLead = () => {
        console.log('complete the lead');
        const data = {
            'is_active': 2,
            'cancel_lead_comment': leadCancelComment
        }
        axios.put(IP + 'ventilia-api/api/leadGeneration/leadGeneration/' + uploadId, data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Lead cancel successfullly.', 'success');
            fetchData();
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error');
            console.log(err);
        });
    }
    const getOfferData = (id) => {
        setUploadId(id);
        axios.get(IP + 'ventilia-api/api/leadGeneration/offerDetails/' + id, {
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
        axios.get(IP + 'ventilia-api/api/leadGeneration/comment/' + id, {
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
                    created_by: commentData.created_by,

                }))) : setCommentRow([])


        }).catch(err => {
            console.log(err);
        });
    }

    const getQuotationData = (id) => {
        setUploadId(id);
        axios.get(IP + 'ventilia-api/api/quotationUpload/quotationUpload/' + id, {
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
                    quotation: IP + 'lead/' + quotationData.asset_name,
                    created_on: quotationData.created_on,
                    active: quotationData.is_active === '1' ? 'Yes' : 'No',
                    totalarea: quotationData.total_area ? quotationData.total_area : '--',
                    totalunit: quotationData.total_unit ? quotationData.total_unit : '--',
                    averageprice: quotationData.average_price ? quotationData.average_price : '--',

                }))) : setQuotationRow([])


        }).catch(err => {
            console.log(err);
        });
    }
    const [columnDefs, setColumnDeft] = useState([
        { headerName: "Name", field: "name" },
        { headerName: "Mobile", field: "mobile" },
        { headerName: "Address", field: "address" },
        { headerName: "Refrence", field: "refrence" },
        { headerName: "Site Stage", field: "sitestage" },
        { headerName: "Created Date", field: "created_date" },

        {
            headerName: "Upload", field: "upload",
            cellRenderer: "LinkComponent",
        },
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

        {
            headerName: "Create Offer", field: "createoffer",
            cellRenderer: "CreateOffer",
        },
        {
            headerName: "Lead Comment", field: "leadcomment",
            cellRenderer: "showComment",
        },
        {
            headerName: "More Action",
            field: "moreaction",
            cellRenderer: "CreateMoreAction",
            cellStyle: { 'height': '20rem' },
        },


    ]);
    const handleClientName = (e) => {
        setClientName(e.target.value);
    }
    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleMobile = (e) => {
        setMobile(e.target.value);
    }
    // const handleEmail = (e) => {
    //     setEmail(e.target.value);
    // }
    const handleOfferPrice = (e) => {
        setOfferPrice(e.target.value);
    }
    const handleGst = (e) => {
        setGst(e.target.value);
    }
    const handleFreight = (e) => {
        setFreight(e.target.value)
    }
    const handleLeadCompleteComment = (e) => {
        setLeadCompleteComment(e.target.value)
    }
    const handleLeadCancelComment = (e) => {
        setLeadCancelComment(e.target.value)
    }
    const handlecomment = (e) => {
        setComment(e.target.value)
    }

    const saveLead = () => {
        const data = {
            'client_name': clientName,
            'address': address,
            'mobile': mobile,
            'refrence': refrencrOption,
            'site_stage': siteOption,
            'is_active': 1,
            'lead_progress': 1
        }
        axios.post(IP + 'ventilia-api/api/leadGeneration/leadGeneration/', data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Lead saved successfullly.', 'success')
            fetchData();
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error')
            console.log(err);
        });

    }
    const saveOffer = () => {
        const data = {
            'offer_price': offerPrice,
            'gst': gst,
            'freight': freight,
            'is_active': 1,
            //uploadId is lead_id
            'lead_id': uploadId
        }
        axios.post(IP + 'ventilia-api/api/leadGeneration/offerDetails/', data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Offer saved successfullly.', 'success')
            fetchData();
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error')
            console.log(err);
        });

    }
    const fetchData = () => {
        axios.get(IP + 'ventilia-api/api/leadGeneration/leadGeneration/', {
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
                created_date: leadData.created_on,
                upload: leadData.lead_id,
                totalarea: leadData.total_area ? leadData.total_area : '--',
                totalunit: leadData.total_unit ? leadData.total_unit : '--',
                averageprice: leadData.average_price ? leadData.average_price : '--',
                viewquotation: leadData.lead_id,
                offerprice: leadData.offer_price ? leadData.offer_price : '--',
                gst: leadData.gst ? leadData.gst : '--',
                freight: leadData.freight ? leadData.freight : '--',
                createoffer: leadData.lead_id,
                leadcomment: leadData.lead_id,
                moreaction: leadData.lead_id

            })))
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
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("lead_id", uploadId);
        data.append("is_active", 1);
        axios
            .post(IP + "ventilia-api/api/leadGeneration/leadGeneration/upload", data, {
                headers: {
                    'token_code': localStorage.getItem("token_code"),
                    'content-type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Headers': '*'
                }
            })
            .then(res => {
                notify('Document uploaded successfullu.', 'success')
                console.log(res.statusText);
            })
            .catch(err => {
                notify('Failed to upload the document,please try again later', 'error')
                console.log(err);
            });
    };
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
            { headerName: "Created On", field: "created_on" },
            { headerName: "Created by", field: "created_by" }]
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
            {
                headerName: "View", field: "quotation",
                cellRenderer: "quotationImage",
            },
            { headerName: "Created On", field: "created_on" },
            { headerName: "Active", field: "active" },
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
                            quotationImage
                        }}
                    >
                    </AgGridReact>
                </div>
            </>
        )
    }
    const moreLinkBtnClick = (id) => {
        let element = document.getElementById(id);
        element.classList.toggle('open');
    }
    const showOfferData = () => {
        let display = document.getElementById('offerTable').style.display;
        document.getElementById('offerTable').style.display = (display === 'none') ? 'block' : 'none';
    }
    const addComment = () => {
        const data = {
            'lead_id': uploadId,
            'comment': comment,
            'is_active': 1
        }
        axios.post(IP + 'ventilia-api/api/leadGeneration/comment/', data, {
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
                                <h3 className="box-title">Lead Generation Detail</h3>
                            </div>
                            <div className="top-right-btn">
                                <button type="button" className="btn btn-block btn-primary" data-toggle="modal" data-target="#addLeadModal">Add Lead</button>
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
                                            resizable: true
                                        }}
                                        pagination
                                        paginationPageSize={10}
                                        suppressRowTransform={true}
                                        columnDefs={columnDefs}
                                        rowData={rowData}
                                        frameworkComponents={{
                                            LinkComponent,
                                            LinkComponentImage,
                                            CreateOffer,
                                            CreateMoreAction,
                                            showComment
                                        }}
                                    >
                                    </AgGridReact>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <div className="modal fade" id="addLeadModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Generate Lead</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box-body">
                                    <form role="form">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" value={clientName} onChange={handleClientName} className="form-control" placeholder="Client Name" />
                                        </div>
                                        <div className="form-group">
                                            <label>Mobile</label>
                                            <input type="text" value={mobile} onChange={handleMobile} className="form-control" pattern="\d*" placeholder="Mobile Number" maxLength="11" />
                                        </div>
                                        <div className="form-group">
                                            <label>Address</label>
                                            <textarea value={address} onChange={handleAddress} className="form-control" rows="3" placeholder="Enter ..."></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Refrence</label>
                                            <Select
                                                defaultValue={refrencrOption}
                                                onChange={handleRefrenceChange}
                                                options={refrenceOptions}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Site Stage</label>
                                            <Select
                                                defaultValue={siteOption}
                                                onChange={handleSiteChange}
                                                options={siteOptions}
                                            />
                                        </div>
                                    </form>
                                </div>
                                {/*  */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" onClick={saveLead} className="btn btn-primary" data-dismiss="modal">Save</button>
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
                                        <a className="cursor-pointer" onClick={showOfferData}>Click here to show previous created offer</a>
                                        <div id="offerTable" style={{ display: 'none' }}>
                                            {offerDataDisplay()}
                                        </div>
                                        <hr></hr>
                                        {/* <label center>Create New Offer:</label> */}

                                        <div className="form-group">
                                            <label>Offer Price</label>
                                            <input type="text" value={offerPrice} onChange={handleOfferPrice} className="form-control" placeholder="Price" />
                                        </div>
                                        <div className="form-group">
                                            <label>GST</label>
                                            <input type="text" value={gst} onChange={handleGst} className="form-control" placeholder="GST" />
                                        </div>
                                        <div className="form-group">
                                            <label>Freight</label>
                                            <input type="text" value={freight} onChange={handleFreight} className="form-control" placeholder="Freight Amount" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" onClick={saveOffer} className="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="uploadModal">
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
                                        {/* <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="text" value={email} onChange={handleEmail} className="form-control" placeholder="Email Address" />
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" onClick={onClickHandler} className="btn btn-primary" data-dismiss="modal">Share</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="completeLead">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Complete the Lead</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box-body">
                                    <h4>Are you sure want to complete this lead?</h4>
                                </div>
                                <div className="form-group">
                                    <textarea value={leadCompleteComment} onChange={handleLeadCompleteComment} className="form-control" rows="3" placeholder="Enter any comment"></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Cancel</button>
                                <button type="button" onClick={completeLead} className="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="cancelLead">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Cancel the Lead</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box-body">
                                    <h4>Are you sure want to cancel this lead?</h4>
                                </div>
                                <div className="form-group">
                                    <textarea value={leadCancelComment} onChange={handleLeadCancelComment} className="form-control" rows="3" placeholder="Enter any comment"></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Cancel</button>
                                <button type="button" onClick={cancelLead} className="btn btn-primary" data-dismiss="modal">Save</button>
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
                                {/* <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Cancel</button> */}
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LeadGeneration;