import { Button, Container, Image } from "react-bootstrap";
import DateRangePicker from "daterangepicker";
import React from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./daterangepicker.css";

const DetailsPage = function () {
  //  return (
  // <>
  //   <Container>
  //     <h1>titolo stanza</h1>
  //     <Image src="https://picsum.photos/200/300"></Image>
  //     <p>descrizione della stanza</p>
  //     <p>prezzo</p>
  //     <Button>Prenota ora</Button>
  //   </Container>
  // </>

  const handleEvent = (event, picker) => {
    console.log("Start:", picker.startDate.format("YYYY-MM-DD"));
    console.log("End:", picker.endDate.format("YYYY-MM-DD"));
  };

  return (
    <DateRangePicker
      startDate={moment().subtract(7, "days")}
      endDate={moment()}
      ranges={{
        Today: [moment(), moment()],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
      }}
      onApply={handleEvent}
    >
      <button className="btn btn-default">Select Date Range</button>
    </DateRangePicker>
  );
};

export default DetailsPage;
