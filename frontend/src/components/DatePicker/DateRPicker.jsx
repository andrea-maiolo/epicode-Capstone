import { useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const DateRPicker = function () {
  const [range, setRange] = useState([new Date(), new Date()]);

  return <DateRangePicker value={range} onChange={setRange} />;
};

export default DateRPicker;
