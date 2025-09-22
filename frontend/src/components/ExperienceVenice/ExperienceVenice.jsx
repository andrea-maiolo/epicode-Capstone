import React from "react";
import { Navbar, Container, Nav, Card, Row, Col } from "react-bootstrap";
import gondola from "../../assets/gondola.jpg";
import Footer from "../Footer/Footer";
import MyNav from "../Navbar/MyNav";
import "./Experience.scss";

const ExperienceVenice = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <MyNav />

      {/* Main Section */}
      <main style={{ flexGrow: 1 }}>
        <div className="text-center" style={{ position: "relative", height: "80vh", overflow: "hidden" }}>
          <img src={gondola} alt="Venice canals" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(6, 6, 9, 0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="text-center text-white">
              <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Unforgettable Experiences in Venice</h1>
              <p className="lead">Explore the magical city of canals and bridges.</p>
            </div>
          </div>
        </div>

        {/* Experiences Section */}
        <Container className="sectionStyle">
          <Row className="justify-content-center text-center mb-5">
            <Col md={8}>
              <h2 className="titleStyle">Discover the Magic of Venice</h2>
              <p className="lead">From romantic gondola rides to historical walking tours, Venice offers a unique adventure at every turn.</p>
            </Col>
          </Row>
          <Row className="g-4 ">
            <Col md={4}>
              <Card className="text-center h-100 cardStyle">
                <Card.Body>
                  <Card.Title>Gondola Rides</Card.Title>
                  <Card.Text>Glide through the Grand Canal and secret waterways on an authentic Venetian gondola.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center h-100 cardStyle">
                <Card.Body>
                  <Card.Title>Historical Tours</Card.Title>
                  <Card.Text>Explore St. Mark's Square, the Doge's Palace, and ancient bridges with a knowledgeable guide.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center h-100 cardStyle">
                <Card.Body>
                  <Card.Title>Venetian Cuisine</Card.Title>
                  <Card.Text>Indulge in authentic Italian food, from fresh seafood to traditional cicchetti and wine.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ExperienceVenice;
