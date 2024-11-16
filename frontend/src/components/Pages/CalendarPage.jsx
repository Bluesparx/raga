import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Vortex } from '../ui/vortex';
import { Navbar2 } from '../Navbar2';
import MoodCalendar from '../MoodCalendar';
import SleepCalendar from '../SleepCalendar';
const CalendarPage = () => {

    return (
        <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Vortex>
        {/* <Navbar2 /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "7rem",
            paddingBottom: "4rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "60%",
              padding: "40px",
              backgroundColor: "black",
              borderRadius: "12px",
              boxShadow: "0 1px 10px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
               
            }}
          >
           
           <MoodCalendar/>
           <SleepCalendar/>
        </div>
        </div>
        </Vortex>
        </div>
    );
};

export default CalendarPage;
