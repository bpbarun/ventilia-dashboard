import React, { useState } from "react";
import Select from 'react-select';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import './leadGeneration.scss';
function LeadGeneration() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const handleRefrenceChange = (e) => {
        setSelectedOption(e.target)
    };

    const [columnDefs, setColumnDeft] = useState([
        { headerName: "Name", field: "name" },
        { headerName: "Mobile", field: "mobile" },
        { headerName: "Address", field: "address" },
        { headerName: "Refrence", field: "refrence" },
        { headerName: "Site Stage", field: "sitestage" },
        { headerName: "Upload", field: "upload" }
    ]);

    const button =()=>{
        return (
            `<button>ABC</button>`
        );
    } 


    const [rowData, setRowData] = useState([
        { name: "Barun", mobile: "6260964301", address: "Vijay Nagar", refrence: "other",sitestage:"abc",upload:''},
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other",sitestage:"abc" ,upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Barun", mobile: "6260964301", address: "Vijay Nagar", refrence: "other",sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other",sitestage:"abc" ,upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" },
        { name: "Kunal", mobile: "098765439", address: "Patnipura", refrence: "other" ,sitestage:"abc",upload:"" }
    ]);
    
    return (
        <>
            <div class="content-wrapper leadGeneration-content">
                <section class="content">
                    <div class="row">
                        <div class="box">
                            <div class="box-header">
                                <h3 class="box-title">Lead Generation Detail</h3>
                            </div>
                            <div class="top-right-btn">
                                <button type="button" class="btn btn-block btn-primary" data-toggle="modal" data-target="#addLeadModal">Add Lead</button>
                            </div>
                            <div class="box-body">
                                <div
                                    className="ag-theme-alpine table"
                                    style={{
                                        height: '50rem',
                                        width: '100%'
                                    }}
                                >
                                    <AgGridReact
                                    defaultColDef={{
                                        sortable:true, 
                                        filter:true
                                    }}
                                        pagination
                                        paginationPageSize={10}
                                        columnDefs={columnDefs}
                                        rowData={rowData}>
                                    </AgGridReact>
                                    {/* <table id="example1" class="table table-bordered table-striped">
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
                                        <tr>
                                            <td>Trident</td>
                                            <td>Internet Explorer 7</td>
                                            <td>Win XP SP2+</td>
                                            <td>7</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Trident</td>
                                            <td>AOL browser (AOL desktop)</td>
                                            <td>Win XP</td>
                                            <td>6</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Gecko</td>
                                            <td>Firefox 1.0</td>
                                            <td>Win 98+ / OSX.2+</td>
                                            <td>1.7</td>
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
                <div class="modal fade" id="addLeadModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">Generate Lead</h4>
                            </div>
                            <div class="modal-body">
                                {/*  */}
                                <div class="box-body">
                                    <form role="form">
                                        <div class="form-group">
                                            <label>Name</label>
                                            <input type="text" class="form-control" placeholder="Client Name" />
                                        </div>
                                        <div class="form-group">
                                            <label>Mobile</label>
                                            <input type="text" class="form-control" pattern="\d*" placeholder="Mobile Number" maxLength="11" />
                                        </div>
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label>Refrence</label>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={handleRefrenceChange}
                                                options={options}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label>Site Stage</label>
                                            <Select
                                                defaultValue={selectedOption}
                                                onChange={handleRefrenceChange}
                                                options={options}
                                            />
                                        </div>
                                    </form>
                                </div>
                                {/*  */}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LeadGeneration;