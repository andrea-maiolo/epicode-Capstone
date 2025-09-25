import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Alert, Card, Table } from "react-bootstrap";
import AdminNav from "./AdmnNav/AdminNav";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Admin.scss"; // Ensure this file is imported for your custom styles

// --- Helper Functions (usually placed outside the component or in a separate file) ---

// Gets the start of the week (Sunday or Monday, depending on locale)
const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to start on Monday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Formats a date to YYYY-MM-DD
const formatDateKey = (date) => date.toISOString().split("T")[0];

// Generates an array of 7 dates for the current week
const getWeekDates = (startDate) => {
  const dates = [];
  let current = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

// --- Main Component ---

const AdminBookingCalendar = function () {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStart(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3001";

  // Fetch Rooms and Bookings
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchAdminData = async () => {
      try {
        const roomsResponse = await fetch(`${API_URL}/rooms`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookingsResponse = await fetch(`${API_URL}/booking`, {
          // ASSUMPTION: You have an admin endpoint for all bookings
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!roomsResponse.ok || !bookingsResponse.ok) {
          throw new Error("Failed to fetch admin data.");
        }

        const roomsData = await roomsResponse.json();
        const bookingsData = await bookingsResponse.json();

        setRooms(roomsData.content || roomsData); // Adjust based on your API response structure (e.g., if you use content)
        setBookings(bookingsData.content || bookingsData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const weekDates = getWeekDates(currentWeekStart);

  const getBookingForDay = (roomId, date) => {
    const dateKey = formatDateKey(date);
    return bookings.find((booking) => booking.roomId === roomId && dateKey >= booking.checkin && dateKey <= booking.checkout);
  };

  const handleWeekChange = (direction) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  const getDayName = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AdminNav />
        <Container fluid className="manager-main pt-5">
          <Alert variant="danger" className="mt-4">
            Error: {error.message}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="admin-calendar-page">
      <AdminNav />
      <Container fluid className="py-4 px-md-5">
        <h2 className="display-5 mb-4 admin-calendar-heading">Booking Calendar View</h2>

        <div className="d-flex justify-content-between align-items-center mb-3 p-3 calendar-controls shadow-sm">
          <Button variant="secondary" onClick={() => handleWeekChange("prev")}>
            <FaChevronLeft className="me-2" /> Previous Week
          </Button>
          <h5 className="mb-0 text-primary">
            {getDayName(weekDates[0])} - {getDayName(weekDates[6])}
          </h5>
          <Button variant="secondary" onClick={() => handleWeekChange("next")}>
            Next Week <FaChevronRight className="ms-2" />
          </Button>
        </div>

        {/* The Calendar Grid */}
        <Card className="calendar-grid-card">
          <Table responsive bordered className="booking-table mb-0">
            <thead>
              <tr>
                <th className="room-header sticky-col">Room</th>
                {weekDates.map((date, index) => (
                  <th key={index} className={formatDateKey(date) === formatDateKey(new Date()) ? "today" : ""}>
                    {getDayName(date)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="room-label sticky-col">
                    {room.description} (Cap: {room.capacity})
                  </td>
                  {weekDates.map((date, index) => {
                    const booking = getBookingForDay(room.id, date);
                    return (
                      <td key={index} className={`calendar-cell ${booking ? "booked" : "available"}`}>
                        {booking ? (
                          <div className="booking-info" title={`Booked by User ID: ${booking.userId}`}>
                            B. {booking.userId}
                          </div>
                        ) : (
                          // Optional: Add an action here, e.g., a small "Quick Book" button
                          <span className="available-label">Available</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default AdminBookingCalendar;
