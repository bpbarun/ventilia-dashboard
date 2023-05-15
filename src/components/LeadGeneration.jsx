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

    const refrenceOptions = [
        { value: 'brick-work', label: 'Brick work' },
        { value: 'plaster', label: 'Plaster' },
        { value: 'granite-work', label: 'Granite work' }
    ];
    const siteOptions = [
        { value: 'brick-work1', label: 'Brick work1' },
        { value: 'plaster1', label: 'Plaster1' },
        { value: 'granite-work1', label: 'Granite work1' },
    ]
    const handleRefrenceChange = (e) => {
        setResrenceOption(e.target)
    };

    const handleSiteChange = (e) => {
        setSiteOption(e.target)
    };

    const [columnDefs, setColumnDeft] = useState([
        { headerName: "Name", field: "name" },
        { headerName: "Mobile", field: "mobile" },
        { headerName: "Address", field: "address" },
        { headerName: "Refrence", field: "refrence" },
        { headerName: "Site Stage", field: "sitestage" },
        { headerName: "Upload", field: "upload" }
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

    const button = () => {
        return (
            `<button>ABC</button>`
        );
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
            'mobile': mobile

        }
        axios.post('http://localhost/ventilia-api/api/leadGeneration/leadGeneration/', data, {
            headers: {
                'token_code': '54070e8cba76f55b',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            fetchData();
        }).catch(err => console.log('response catch', err));

    }
    const fetchData = () => {
        axios.get('http://localhost/ventilia-api/api/leadGeneration/leadGeneration/', {
            headers: {
                'token_code': '54070e8cba76f55b',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            console.log('data is ==', response.data.data)
            // setRowData(response.data.data.map((leadData) => {
            //     name: leadData.client_name
            // }))
        }).catch(err => console.log('response catch', err));
    }

    useEffect(() => {
        fetchData();
    }, []);
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
                                            filter: true
                                        }}
                                        pagination
                                        paginationPageSize={10}
                                        columnDefs={columnDefs}
                                        rowData={rowData}>
                                    </AgGridReact>
                                    {/* <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Rendering engine</th>
                                            <th>Browser</th>
                                            <th>Platform(s)</th>
                                            <th>Engine version</th>
                                            <th>CSS grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Trident</td>
                                            <td>Internet
                                                Explorer 4.0
                                            </td>
                                            <td>Win 95+</td>
                                            <td> 4</td>
                                            <td>X</td>
                                        </tr>
                                        <tr>
                                            <td>Trident</td>
                                            <td>Internet
                                                Explorer 5.0
                                            </td>
                                            <td>Win 95+</td>
                                            <td>5</td>
                                            <td>C</td>
                                        </tr>
                                        <tr>
                                            <td>Trident</td>
                                            <td>Internet
                                                Explorer 5.5
                                            </td>
                                            <td>Win 95+</td>
                                            <td>5.5</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Trident</td>
                                            <td>Internet
                                                Explorer 6
                                            </td>
                                            <td>Win 98+</td>
                                            <td>6</td>
                                            <td>A</td>
                                        </tr>
handleSiteChange
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Gecko</td>
                                            <td>Firefox 1.5</td>
                                            <td>Win 98+ / OSX.2+</td>
                                            <td>1.8</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Gecko</td>
                                            <td>Firefox 2.0</td>
                                            <td>Win 98+ / OSX.2+</td>
                                            <td>1.8</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Gecko</td>
                                            <td>Firefox 3.0</td>
                                            <td>Win 2k+ / OSX.3+</td>
                                            <td>1.9</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Gecko</td>
                                            <td>Camino 1.0</td>
                                            <td>OSX.2+</td>
                                            <td>1.8</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Gecko</td>
                                            <td>Camino 1.5</td>
                                            <td>OSX.3+</td>
                                            <td>1.8</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Gecko</td>
                                            <td>Netscape 7.2</td>
                                            <td>Win 95+ / Mac OS 8.6-9.2</td>
                                            <td>1.7</td>
                                            <td>A</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Rendering engine</th>
                                            <th>Browser</th>
                                            <th>Platform(s)</th>
                                            <th>Engine version</th>
                                            <th>CSS grade</th>
                                        </tr>
                                    </tfoot>
                                </table> */}
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
                                {/*  */}
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
            </div>
        </>
    )
}
export default LeadGeneration;