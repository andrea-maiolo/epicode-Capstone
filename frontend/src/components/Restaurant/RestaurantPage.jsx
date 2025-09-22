import { Navbar, Container, Nav, Card, Button, Row, Col } from "react-bootstrap";
import Footer from "../Footer/Footer";
import MyNav from "../Navbar/MyNav";
import "./Restaurant.scss";
import restaurant from "../../assets/restaurant.jpg";

const RestaurantPage = () => {
  //   const navBarStyle = {
  //     backgroundColor: "#060609",
  //     color: "#f5f5f5",
  //   };

  //   const footerStyle = {
  //     backgroundColor: "#060609",
  //     color: "#f5f5f5",
  //     padding: "2rem 0",
  //   };

  //   const sectionStyle = {
  //     padding: "4rem 0",
  //     backgroundColor: "#f5f5f5",
  //   };

  //   const cardStyle = {
  //     backgroundColor: "#562692",
  //     color: "#f5f5f5",
  //     border: "none",
  //   };

  //   const titleStyle = {
  //     color: "#562692",
  //   };

  //   const buttonStyle = {
  //     backgroundColor: "#8fccc1",
  //     borderColor: "#8fccc1",
  //     color: "#060609",
  //   };

  return (
    <div className="vh-100 d-flex flex-column">
      {/* Navbar */}
      <MyNav />

      {/* Main Section */}
      <main className="flex-grow-1">
        {/* Hero Section */}
        <div className="vh-100  overflow-hidden position-relative">
          <img src={restaurant} alt="Elegant restaurant interior" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {/* <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(6, 6, 9, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          > */}
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="text-center text-white">
              {/* <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}></h1> */}
              <h1 className="fs-1 fw-bold">An Exquisite Culinary Journey</h1>
              <p className="lead">Experience dining refined to an art form. </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <Container className="section">
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h2 className="mb-4 title">The Aurelia's Table Experience</h2>
              <p className="lead">
                Located within the heart of the city's most exclusive hotel, Aurelia's Table offers a curated, seasonal menu crafted by our Michelin-starred
                chef. Our commitment to sustainable, local ingredients ensures every dish is a celebration of flavor and artistry.
              </p>
            </Col>
          </Row>
        </Container>

        {/* Menu Preview */}
        <Container fluid className="bg-black py-5">
          {/* style={{ backgroundColor: "#060609", color: "#f5f5f5", padding: "4rem 0" }}> */}
          <Row className="justify-content-center">
            <Col md={10} className="text-center">
              <h2 className="mb-4 text-secondary">A Taste of Our Menu</h2>
            </Col>
          </Row>
          <Row className="justify-content-center g-4">
            <Col md={4}>
              <Card className="text-center card">
                <Card.Body>
                  <Card.Title>Heirloom Tomato Tartar</Card.Title>
                  <Card.Text>With burrata foam, basil essence, and a balsamic reduction.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center card">
                <Card.Body>
                  <Card.Title>Wagyu Beef Filet</Card.Title>
                  <Card.Text>Served with black truffle potato gratin and asparagus.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default RestaurantPage;
