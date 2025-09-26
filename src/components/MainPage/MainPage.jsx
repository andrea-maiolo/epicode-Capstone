import { Button, Col, Container, Image, Row } from "react-bootstrap";
import "./MainPage.scss";
import magicRoom from "../../assets/magicRoom.jpg";
import gondola from "../../assets/gondola.jpg";
import restaurant from "../../assets/restaurant.jpg";
import { useNavigate } from "react-router-dom";
import MyFooter from "../Footer/MyFooter";
import MyNav from "../Navbar/MyNav";

const MainPage = function () {
  const navigate = useNavigate();

  const navigateRooms = function () {
    navigate("/rooms");
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

      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="display-4 fw-bold mb-3 mb-md-4">A Timeless Retreat Awaits</h1>
          <p className="lead fw-light mb-4">
            Immerse yourself in timeless romance and vibrant culture, where every canal and piazza tells a story of Venice’s eternal charm.
          </p>
        </div>
      </section>

      <section className="py-5 py-md-5 bg-light text-center">
        <Container>
          <Col lg={8} className="mx-auto">
            <h2 className="fs-2 fw-semibold mb-3 text-primary">Your Private Venetian Palazzo</h2>
            <p className="lead text-muted mb-4">
              Beyond the throngs of St. Mark's lies a world of quiet luxury. Our doors open to a serene courtyard, a hidden gem where the hustle of the city
              fades away. This is your personal retreat, a place to rediscover the art of doing nothing in one of the world's most captivating cities.
              Experience the grandeur of Venice from a haven of pure, unadulterated calm.
            </p>
            <div className="bg-primary mx-auto" style={{ width: "5rem", height: "0.25rem", borderRadius: "999px" }}></div>
          </Col>
        </Container>
      </section>

      <div>
        <section className="min-vh-100 d-flex align-items-center section-1">
          <Container fluid>
            <Row className="g-0 flex-column-reverse flex-md-row">
              <Col md={6} className="d-flex align-items-center p-5">
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
              <Col md={6} className="d-flex align-items-center justify-content-center p-md-5 mt-4 mt-md-0">
                <Image src={magicRoom} className="img-fluid rounded-4 shadow-lg object-fit-cover" alt="One of our best rooms" />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="min-vh-100 d-flex align-items-center section-2">
          <Container fluid>
            <Row className="g-0 flex-column-reverse flex-md-row">
              <Col md={6} className="d-flex align-items-center justify-content-center p-md-5 mb-4 mb-md-0">
                <Image src={gondola} className="img-fluid rounded-4 shadow-lg object-fit-cover" alt="Gondola" />
              </Col>
              <Col md={6} className="d-flex align-items-center p-5">
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

        <section className="min-vh-100 d-flex align-items-center section-3">
          <Container fluid>
            <Row className="g-0 flex-column-reverse flex-md-row">
              <Col md={6} className="d-flex align-items-center p-5">
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
              <Col md={6} className="d-flex align-items-center justify-content-center p-md-5 mt-4 mt-md-0">
                <Image src={restaurant} className="img-fluid rounded-4 shadow-lg object-fit-cover" alt="Our restaurant" />
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      <MyFooter />
    </>
  );
};

export default MainPage;
