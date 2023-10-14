import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Dropzone, FileMosaic } from "@files-ui/react";
import { toast, ToastContainer } from 'react-toastify';
import { IP } from './Constant';
import 'react-toastify/dist/ReactToastify.css';

function UploadFiles(props) {
  const [files, setFiles] = useState([]);

  const updateFiles = (incommingFiles) => {
    if (incommingFiles.length > 10) {
      notify('Max 10 files are allowed','error');
      return;
    }
    setFiles(incommingFiles);
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const uploadMedia = () => {
    var randomData = 100000 + Math.floor(Math.random() * 900000);
    files.forEach((data) => {
      onClickHandler(data, randomData)
    })
  }
  const notify = (msg, type) => {
    if (type === 'success') {
      toast.success(msg);
    } else if (type === 'error') {
      toast.error(msg);
    } else {
      toast(msg);
    }
  }
  const onClickHandler = (filedata, ramdom) => {
    const data = new FormData();
    data.append("file", filedata['file']);
    data.append("lead_id", props.leadId);
    data.append("is_active", 1);
    data.append("random_no", ramdom);

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
        console.log('successsssss');
      })
      .catch(err => {
        notify('Failed to upload the document,please try again later', 'error')
        console.log(err);
      });
  };
  useEffect(() => {
    setFiles([]);
  }, [props.leadId]);
  return (
    <>
      <ToastContainer />
      <Dropzone
        onChange={updateFiles}
        value={files}
        accept="image/*"
        maxFileSize={20 * 1024 * 1024}
        maxFiles={10}
      >
        {files.map((file) => (
          <FileMosaic key={file.id} {...file} onDelete={removeFile} info preview />
        ))}
      </Dropzone>
      {files.length > 0 && <button className="btn btn-primary uploadBtn" onClick={uploadMedia}>Share</button>}
    </>
  )
}
export default UploadFiles;