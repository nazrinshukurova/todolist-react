import React, { useState } from "react";
import { DatePicker, Radio, Space } from "antd";
const { RangePicker } = DatePicker;

const Calendar = () => {
  return (
    <div
      className="calendar"
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <RangePicker size={"middle"} style={{width:'300px',height:'40px'}} />
    </div>
  );
};

export default Calendar;
