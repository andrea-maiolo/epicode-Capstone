import { Button, Card, Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import "./MainPage.scss";
import logo from "../../assets/logo.png";
import magicRoom from "../../assets/magicRoom.jpg";
import gondola from "../../assets/gondola.jpg";
import restaurant from "../../assets/restaurant.jpg";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import MyNav from "../Navbar/MyNav";

const MainPage = function () {
  const navigate = useNavigate();

  const navigateRooms = function () {
    navigate("/home");
  };
  const navigateExperience = function () {
    navigate("/experiences");
  };
  const navigateRestaurant = function () {
    navigate("/restaurant");
  };

  return (
    <>
      <MyNav />

      {/* <header className="header">
        <Container className="d-flex align-items-center justify-content-between">
          <Link href="*" className="d-flex align-items-center text-decoration text-white">
            <Image src={logo} width="20px" height="20px" />
            <span className="ms-2 fs-4 fw-bold text-white tracking-wide">Domus</span>
          </Link>
          <Link href="*" className="text-white text-decoration-none opacity-75 d-none d-sm-block">
            Rooms
          </Link>
          <Link href="*" className="text-white text-decoration-none opacity-75 d-none d-sm-block">
            Restaurant
          </Link>
          <Link href="*" className="text-white text-decoration-none opacity-75 d-none d-sm-block">
            Experiences
          </Link>
          <Link href="*" className="text-white text-decoration-none opacity-75 d-none d-sm-block">
            Contacts
          </Link>
        </Container>
      </header> */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="display-4 fw-bold mb-3 mb-md-4">A Timeless Retreat Awaits</h1>
          <p className="lead fw-light mb-4">
            Immerse yourself in timeless romance and vibrant culture, where every canal and piazza tells a story of Venice’s eternal charm.
          </p>
          <Button className="btn-light fw-semibold px-5 py-3 rounded-pill shadow-sm">Explore Our Offerings</Button>
        </div>
      </section>
      <section className="py-5 py-md-5 bg-light text-center">
        <Container>
          <Col lg={8} className="mx-auto">
            <h2 className="fs-2 fw-semibold mb-3 text-primary">A Tradition of Tranquility</h2>
            <p className="lead text-muted mb-4">
              Nestled amidst acres of pristine wilderness, our resort has been a sanctuary for generations. We invite you to disconnect from the everyday and
              reconnect with nature, yourself, and your loved ones.
            </p>
            <div className="bg-primary mx-auto" style={{ width: "5rem", height: "0.25rem", borderRadius: "999px" }}></div>
          </Col>
        </Container>
      </section>
      <section className="py-5 py-md-5">
        <Container>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="border-0 rounded shadow-sm">
                <Card.Img className="img-top" src="https://placehold.co/600x400/D1D5DB/1F2937?text=placeholder" />
                <Card.Body>
                  <Card.Title className="text-primary">title goes here</Card.Title>
                  <Card.Text className="text-muted">text of the card</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="border-0 rounded shadow-sm">
                <Card.Img className="img-top" src="https://placehold.co/600x400/D1D5DB/1F2937?text=placeholder" />
                <Card.Body>
                  <Card.Title className="text-primary">title goes here</Card.Title>
                  <Card.Text className="text-muted">text of the card</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="border-0 rounded shadow-sm">
                <Card.Img className="img-top" src="https://placehold.co/600x400/D1D5DB/1F2937?text=placeholder" />
                <Card.Body>
                  <Card.Title className="text-primary">title goes here</Card.Title>
                  <Card.Text className="text-muted">text of the card</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      {/* parte delle sections */}
      <div>
        <section className="vh-100 d-flex align-items-center section-1">
          <Container fluid>
            <Row className="g-0 flex-column-reverse flex-md-row">
              <Col md={6} className="d-flex align-items-center p-5 special-text">
                <div>
                  <h2>Discover Our Rooms</h2>
                  <p>
                    This is the description for the first section. It has a layout with content on the left and an image on the right. We use Bootstrap's grid
                    system and utility classes to achieve this full-height, responsive layout.
                  </p>
                  <Button className="mt-3 custom-button" onClick={navigateRooms}>
                    Explore
                  </Button>
                </div>
              </Col>
              <Col md={6} className="d-flex align-items-center justify-content-center p-md-5">
                <Image src={magicRoom} className="img-fluid rounded-4 shadow-lg w-100 h-100 object-fit-cover" alt="Placeholder image for Section 1" />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="vh-100 d-flex align-items-center section-2">
          <Container fluid>
            <Row className="g-0 flex-column-reverse flex-md-row">
              <Col md={6} className="d-flex align-items-center justify-content-center p-md-5">
                <Image src={gondola} className="img-fluid rounded-4 shadow-lg w-100 h-100 object-fit-cover" alt="Placeholder image for Section 2" />
              </Col>
              <Col md={6} className="d-flex align-items-center special-text p-5">
                <div>
                  <h2>Experiences</h2>
                  <p>
                    This section alternates the layout, placing the content on the right and the image on the left. The design remains responsive, stacking the
                    image on top of the text on smaller screens.
                  </p>
                  <Button className="mt-3 custom-button" onClick={navigateExperience}>
                    Explore
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="vh-100 d-flex align-items-center section-3">
          <Container fluid>
            <Row className="g-0 flex-column-reverse flex-md-row">
              <Col md={6} className="d-flex align-items-center p-5 special-text">
                <div>
                  <h2>Our Restaurant</h2>
                  <p>
                    This is the description for the first section. It has a layout with content on the left and an image on the right. We use Bootstrap's grid
                    system and utility classes to achieve this full-height, responsive layout.
                  </p>
                  <Button className="mt-3 custom-button" onClick={navigateRestaurant}>
                    Explore
                  </Button>
                </div>
              </Col>
              <Col md={6} className="d-flex align-items-center justify-content-center p-md-5">
                <Image src={restaurant} className="img-fluid rounded-4 shadow-lg w-100 h-100 object-fit-cover" alt="Placeholder image for Section 1" />
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
