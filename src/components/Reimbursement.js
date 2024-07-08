import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { IP } from './Constant';
import 'react-toastify/dist/ReactToastify.css';

function Reimbursement(props) {
  console.log(props.show)
  const [selectedFile, setSelectedFile] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [noOfPersion, setNoOfPersion] = useState('');
  const [clientName, setClientName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [travellingBill, setTravellingBill] = useState('');
  const [hotelBill, setHotelBill] = useState('');
  const [mealBill, setMealBill] = useState('');

  // const [date, setDate] = useState('');
  const notify = (msg, type) => {
    if (type === 'success') {
      toast.success(msg);
    } else if (type === 'error') {
      toast.error(msg);
    } else {
      toast(msg);
    }
  }
  const onChangeHandler = (event) => {
    console.log('aaaaaaaaaaaaaaaaaa==============',event)
    setSelectedFile(event.target.files[0]);
};
  const save = ()=>{
    console.log('saave is =========')
    const data1 = new FormData();
        data1.append("file", selectedFile);
        data1.append("location", location);
        data1.append("date", date);
        data1.append("no_of_person", noOfPersion);
        data1.append("client_name", clientName);
        data1.append("purpose", purpose);
    const data = {
      'location': location,
      'date': date,
      'no_of_person': noOfPersion,
      'client_name	': clientName,
      'purpose': purpose,
      'user_id': localStorage.getItem("user_id"),
      'traveing_fare': travellingBill,
      'hotel_bill': hotelBill,
      'meal_expeness': mealBill,
  }
      axios.post(IP + 'ventilia-api/index.php/api/user/reimbursement/', data1, {
        headers: {
            'token_code': localStorage.getItem("token_code"),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }).then((response) => {
        notify('Comment saved successfullly.', 'success')
        // fetchData();
    }).catch(err => {
        notify('Something got wrong please try again later.', 'error')
        console.log(err);
    });
    props.close();
  }
  return (
    <>
      <div className="modal" id="rModal">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.close}>
                          <span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">Choose Type</h4>
                  </div>
                  <div className="modal-body">
                    <div className="box-body">
                        <form role="form">

                          <div className="form-group">
                              <label>Location</label>
                              <input type="text" value={location} onChange={(e)=>{setLocation(e.target.value)}} className="form-control" placeholder="Location" />
                          </div>
                            <div className="form-group">
                              <label>Date</label>
                              <div>
                                  <input className="form-control" type="date" value={date}
                                      onChange={(e) => { setDate(e.target.value) }} />
                              </div>
                            </div>
                            <div className="form-group">
                                <label>No. of person:</label>
                                <input className="form-control" type="number" value={noOfPersion}
                                        onChange={(e) => { setNoOfPersion(e.target.value) }} />
                            </div>
                            <div className="form-group">
                              <label>Client</label>
                              <input type="text" value={clientName} onChange={(e) => { setClientName(e.target.value) }} className="form-control"  placeholder="Client Name"/>
                            </div>
                            <div className="form-group">
                              <label>Purpose</label>
                              <input type="text" value={purpose} onChange={(e) => { setPurpose(e.target.value) }} className="form-control"  placeholder="Purpose" />
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-sm-6 col-md-6 col-xl-6">
                                <label>Travelling Fare</label>
                                <input type="text" value={travellingBill} onChange={(e) => { setTravellingBill(e.target.value) }} className="form-control"  placeholder="Emter the amount" />
                                </div>
                                <div className="col-sm-6 col-md-6 col-xl-6">
                                <label>Upload proof</label>
                                <input type="file"  onChange={onChangeHandler} className="form-control"/>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-sm-6 col-md-6 col-xl-6">
                                <label>Lodging(Hotel Bill)</label>
                                <input type="text" value={hotelBill} onChange={(e) => { setHotelBill(e.target.value) }} className="form-control"  placeholder="Emter the amount" />
                                </div>
                                <div className="col-sm-6 col-md-6 col-xl-6">
                                <label>Upload proof</label>
                                <input type="file"  onChange={(e) => { setPurpose  (e.target.value) }} className="form-control"/>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-sm-6 col-md-6 col-xl-6">
                                <label>Meal Expenses</label>
                                <input type="text" value={mealBill} onChange={(e) => { setMealBill(e.target.value) }} className="form-control"  placeholder="Emter the amount" />
                                </div>
                                <div className="col-sm-6 col-md-6 col-xl-6">
                                <label>Upload proof</label>
                                <input type="file"  onChange={(e) => { setPurpose  (e.target.value) }} className="form-control"/>
                                </div>
                              </div>
                            </div>
                      </form>
                    </div>
                  </div>
                  <div className="modal-footer">
                      <button onClick={props.close} type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                      <button onClick={save} type="button" className="btn btn-primary" data-dismiss="modal">Update</button>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}
export default Reimbursement;