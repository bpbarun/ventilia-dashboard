import React, { useState,useEffect } from "react";
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { IP } from './Constant';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.scss';
import Reimbursement from "./Reimbursement";
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const customEventStyleGetter = (event, start, end, isSelected) => {
  const backgroundColor = event.attendanceColor || '#3174ad'; // Default color or specify a color
  return {
    style: {
      backgroundColor,
    },
  };
};

const AttendenceCalendar = () => {
  const [eventDatas,setEventData] = useState([]);
  const[showReimbursment,setShowReimbursment] = useState(false);
  const fetchData = () => {
    // let allLeave = [];
    axios.get(IP + 'ventilia-api/index.php/api/user/attendence/' + localStorage.getItem("user_id"), {
        headers: {
            'token_code': localStorage.getItem("token_code"),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }).then((response) => {
      let leaveData = response.data.data.map((attendence) => ({
        title: attendence.attendence,
        start: attendence.date,
        end:attendence.date,
        id:attendence.id,
        attendanceColor:attendence.attendence ==='p'?"#00FF00":"#ff0000"
    }))
        axios.get(IP + 'ventilia-api/index.php/api/user/officialLeave/', {
          headers: {
              'token_code': localStorage.getItem("token_code"),
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'Access-Control-Allow-Headers': '*'
          }
      }).then((res) => {
          console.log('response of official leave is =========',res.data.data)
          console.log('allLeave is========= before is=====',leaveData)
  
          let officialLeave = res.data.data.map((leave) => (
            {
            title: leave.reason,
            start: leave.date,
            end:leave.date,
            }
        ))
        leaveData = leaveData.concat(officialLeave);
        setEventData(leaveData);
      }).catch(err => {
          console.log(err);
      });
    }).catch(err => {
        console.log(err);
    });
  }

  //   const officialLeave = () => {
  //   axios.get(IP + 'ventilia-api/index.php/api/user/officialLeave/', {
  //       headers: {
  //           'token_code': localStorage.getItem("token_code"),
  //           'Content-Type': 'application/json',
  //           'Access-Control-Allow-Origin': '*',
  //           'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //           'Access-Control-Allow-Headers': '*'
  //       }
  //   }).then((response) => {
  //       console.log('response of official leave is =========',response)

  //       let allLeave = [...eventDatas];
  //       console.log('allLeave is========= before is=====',allLeave)

  //       let officialLeave = response.data.data.map((leave) => ({
  //         title: leave.reason,
  //         start: leave.date,
  //         end:leave.date,
  //     }))
  //     allLeave.push(officialLeave);

  //     console.log('allLeave is=========',allLeave)
  //     setEventData(allLeave);
  //   }).catch(err => {
  //       console.log(err);
  //   });
  // }
  useEffect(()=>{
    fetchData();
  },[])
  const handleSelectedEvent = (event) => {
    setShowReimbursment(true);
    let modal = document.getElementById('rModal');
      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
      modal.style.marginTop = '1rem';
      modal.style.display = 'block';
      modal.style.overflow='auto'
      setTimeout(() => { modal.style.opacity = 1; }); //FOR TRANSITION 
  
  };
let closeStyle = () => { //MODAL HIDE
  let modal = document.getElementById('rModal');

    modal.style.display = 'none';
    modal.style.opacity = 0;
};
  return (
    <>
    <div className="content-wrapper">
      <Reimbursement show={showReimbursment} close={closeStyle}/>
      <div className='attendence-calender'>
        <Calendar
          localizer={localizer}
          events={eventDatas}
          views={['month']} 
         // onSelectEvent={(event) => handleSelectedEvent(event)}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={customEventStyleGetter}
          style={{ padding: '10px' }}
        />
    </div>
  </div>

  </>
  )
  } 


export default AttendenceCalendar;
