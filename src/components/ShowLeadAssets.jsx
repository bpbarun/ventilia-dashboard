import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { IP } from './Constant';

function ShowLeadAssets(props) {
  const [LeadRow, setLeadRow] = useState([]);
  const [uploadId, setUploadId] = useState(0);

  function LeadImage(props) {
    return (
      (props.value !== '--') ? <a href={props.value} download target="_blank">View</a> : '--'
    )
  }
  const getQuotationData = (id) => {
    setUploadId(id);
    axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/leadGeneration/getLeadAssets/' + id, {
      headers: {
        'token_code': localStorage.getItem("token_code"),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': '*'
      }
    }).then((response) => {
      (response.data.status) ?
        setLeadRow(response.data.data.map((leadAssetsData) => ({
          file_name: leadAssetsData.asset_name,
          view: IP + 'lead/' + leadAssetsData.asset_name,

        }))) : setLeadRow([])


    }).catch(err => {
      console.log(err);
    });
  }
  const leadAssetsColumn = [
    { headerName: "File name", field: "file_name" },
    {
      headerName: "View", field: "view",
      cellRenderer: "LeadImage",
    }
  ]

  useEffect(() => {
    getQuotationData(props.lead_id);
  }, [props.lead_id]);
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
          columnDefs={leadAssetsColumn}
          rowData={LeadRow}
          frameworkComponents={{
            LeadImage
          }}
        >
        </AgGridReact>
      </div>
    </>
  )
}
export default ShowLeadAssets;