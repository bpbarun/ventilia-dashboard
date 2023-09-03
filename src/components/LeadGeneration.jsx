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
    const [selectedFile, setSelectedFile] = useState('');
    const [uploadId, setUploadId] = useState(0);
    const [rowData, setRowData] = useState([]);
    const [quotationRow, setQuotationRow] = useState([]);
    const [meetingDate, setMeetingDate] = useState('');
    const [opportunity, setOpportunity] = useState('');

    const [erefrencrOption, seteResrenceOption] = useState(null);
    const [esiteOption, seteSiteOption] = useState(null);
    const [eclientName, seteClientName] = useState('');
    const [eaddress, seteAddress] = useState('');
    const [emobile, seteMobile] = useState('');
    const [emeetingDate, seteMeetingDate] = useState('');

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
    function selectOpportunity(props) {
        return (
            <input type="radio" id={props.value} onChange={() => { setOpportunity(props.value) }} name="opportunity" />
        )
    }
    function LinkComponentEditLead(props) {
        return (
            <a onClick={() => { fetchLeadData(props.value) }} data-toggle="modal" data-target="#EditModal">Edit</a>
        );
    }
    const saveForOpportunity = () => {
        const data = {
            'set_opportunity': 1,
            'is_active': 1,
            lead_id: uploadId
        }
        axios
            .put(IP + "ventilia-api/index.php/api/quotationUpload/quotationUpload/" + opportunity, data, {
                headers: {
                    'token_code': localStorage.getItem("token_code"),
                    'content-type': 'application/json',
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
            });

    }
    function quotationImage(props) {
        return (
            (props.value !== '--') ? <a href={props.value} download target="_blank">View</a> : 'No Quotation'
        )
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
        { headerName: "Meeting Date", field: "meeting_date" },
        { headerName: "Site Stage", field: "sitestage" },
        { headerName: "Created Date", field: "created_date" },
        {
            headerName: "Upload", field: "upload",
            cellRenderer: "LinkComponent",
        },
        {
            headerName: "View Quotation", field: "viewquotation",
            cellRenderer: "LinkComponentImage",
        },
        {
            headerName: "Action", field: "edit_lead",
            cellRenderer: "LinkComponentEditLead",
        },
    ];
    const handleClientName = (e) => {
        setClientName(e.target.value);
    }
    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleMobile = (e) => {
        setMobile(e.target.value);
    }

    const handleEClientName = (e) => {
        seteClientName(e.target.value);
    }
    const handleEAddress = (e) => {
        seteAddress(e.target.value);
    }
    const handleEMobile = (e) => {
        seteMobile(e.target.value);
    }
    const handleERefrenceChange = (e) => {
        seteResrenceOption(e.value)
    };

    const handleESiteChange = (e) => {
        seteSiteOption(e.value)
    };

    const updateLead = () => {
        if (eclientName === '') {
            notify('Name is required parameter', 'error');
            return;

        } else if (emobile === '') {
            notify('Mobile no. is required parameter', 'error')
            return;
        }
        const data = {
            'client_name': eclientName,
            'address': eaddress,
            'mobile': emobile,
            'refrence': erefrencrOption,
            'site_stage': esiteOption,
            'is_active': 1,
            'meeting_date': emeetingDate
        }
        axios.put(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/' + uploadId, data, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            notify('Lead updated successfullly.', 'success')
            fetchData();
        }).catch(err => {
            notify('Something got wrong please try again later.', 'error')
            console.log(err);
        });

    }
    const saveLead = () => {
        if (clientName === '') {
            notify('Name is required parameter', 'error');
            return;

        } else if (mobile === '') {
            notify('Mobile no. is required parameter', 'error')
            return;
        }
        const data = {
            'client_name': clientName,
            'address': address,
            'mobile': mobile,
            'refrence': refrencrOption,
            'site_stage': siteOption,
            'is_active': 1,
            'meeting_date': meetingDate
        }
        axios.post(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration', data, {
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
    const fetchData = () => {
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/', {
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
                meeting_date: leadData.meeting_date,
                sitestage: leadData.site_stage,
                created_date: leadData.created_on,
                upload: leadData.lead_id,
                viewquotation: leadData.lead_id,
                edit_lead: leadData.lead_id,
            })))
        }).catch(err => {
            console.log(err);
        });
    }
    const fetchLeadData = (id) => {
        setUploadId(id)
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/' + id, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            seteClientName(response.data.data.client_name)
            seteAddress(response.data.data.address)
            seteMobile(response.data.data.mobile)
            seteResrenceOption(response.data.data.refrence)
            seteSiteOption(response.data.data.site_stage)
            seteMeetingDate(response.data.data.meeting_date)
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
            .post(IP + "ventilia-api/index.php/api/leadGeneration/leadGeneration/upload", data, {
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
    const quotationDataDisplay = () => {
        const quotationColumn = [
            {
                headerName: "Select", field: "select",
                cellRenderer: "selectOpportunity",
            },
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
                            selectOpportunity
                        }}
                    >
                    </AgGridReact>
                </div>
            </>
        )
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
                                            LinkComponentEditLead
                                        }}
                                    >
                                    </AgGridReact>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <div className="modal fade" keyboard={false} id="addLeadModal">
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
                                                value={refrenceOptions.filter(function (option) {
                                                    return option.value === refrencrOption;
                                                })}
                                                onChange={handleRefrenceChange}
                                                options={refrenceOptions}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Site Stage</label>
                                            <Select
                                                value={siteOptions.filter(function (option) {
                                                    return option.value === siteOption;
                                                })}
                                                defaultValue={siteOption}
                                                onChange={handleSiteChange}
                                                options={siteOptions}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Next Meeting Date</label>
                                            <div>
                                                <input className="form-control" type="date" value={meetingDate}
                                                    onChange={(e) => { setMeetingDate(e.target.value) }} />
                                            </div>
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
                <div className="modal fade" id="EditModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Update Lead</h4>
                            </div>
                            <div className="modal-body">
                                <div className="box-body">
                                    <form role="form">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" value={eclientName} onChange={handleEClientName} className="form-control" placeholder="Client Name" />
                                        </div>
                                        <div className="form-group">
                                            <label>Mobile</label>
                                            <input type="text" value={emobile} onChange={handleEMobile} className="form-control" pattern="\d*" placeholder="Mobile Number" maxLength="11" />
                                        </div>
                                        <div className="form-group">
                                            <label>Address</label>
                                            <textarea value={eaddress} onChange={handleEAddress} className="form-control" rows="3" placeholder="Enter ..."></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Refrence</label>
                                            <Select
                                                value={refrenceOptions.filter(function (option) {
                                                    return option.value === erefrencrOption;
                                                })}
                                                onChange={handleERefrenceChange}
                                                options={refrenceOptions}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Site Stage</label>
                                            <Select
                                                value={siteOptions.filter(function (option) {
                                                    return option.value === esiteOption;
                                                })}
                                                defaultValue={siteOption}
                                                onChange={handleESiteChange}
                                                options={siteOptions}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Next Meeting Date</label>
                                            <div>
                                                <input className="form-control" type="date" value={emeetingDate}
                                                    onChange={(e) => { seteMeetingDate(e.target.value) }} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/*  */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" onClick={updateLead} className="btn btn-primary" data-dismiss="modal">Update</button>
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
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={saveForOpportunity} data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LeadGeneration;