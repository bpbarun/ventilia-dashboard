import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import './leadGeneration.scss';

function LeadGeneration() {
    const [refrencrOption, setResrenceOption] = useState(null);
    const [siteOption, setSiteOption] = useState(null);
    const [clientName, setClientName] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

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

    const [columnDefs, setColumnDeft] = useState([
        { headerName: "Name", field: "name" },
        { headerName: "Mobile", field: "mobile" },
        { headerName: "Address", field: "address" },
        { headerName: "Refrence", field: "refrence" },
        { headerName: "Site Stage", field: "sitestage" },
        {
            headerName: "Upload", field: "upload", cellRendererFramework: (params) =>
                <div>
                    <i className="fa fa-cloud-upload" data-toggle="modal" data-target="#uploadModal" aria-hidden="true"></i>
                </div>
        }
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
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const [rowData, setRowData] = useState([
        { name: "Barun", mobile: "6260964301", address: "Vijay Nagar", refrence: "other", sitestage: "abc", upload: '' },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other", sitestage: "abc", upload: "" },
    ]);
    const saveLead = () => {
        console.log(clientName);
        console.log(address);
        console.log(mobile);
        const data = {
            'client_name': clientName,
            'address': address,
            'mobile': mobile,
            'refrence': refrencrOption,
            'site_stage': siteOption

        }
        axios.post('http://192.168.29.237/ventilia-api/api/leadGeneration/leadGeneration/', data, {
            headers: {
                'token_code':localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            fetchData();
            // $('#addLeadModal').modal('hide');

        }).catch(err => console.log('response catch', err));

    }
    const fetchData = () => {
        axios.get('http://192.168.29.237/ventilia-api/api/leadGeneration/leadGeneration/', {
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
                sitestage: leadData.site_stage
            })))
            console.log('rowData==', rowData)
        }).catch(err => console.log('response catch', err));
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
        axios
            .post("http://192.168.29.237/ventilia-api/api/leadGeneration/leadGeneration/upload", data, {
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
                console.log(err);
            });
    };
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
                                <button type="button" onClick={saveLead} className="btn btn-primary">Save</button>
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
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="text" value={email} onChange={handleEmail} className="form-control" placeholder="Email Address" />
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
export default LeadGeneration;