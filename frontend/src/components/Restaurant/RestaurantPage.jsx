import { Container, Card, Row, Col } from "react-bootstrap";
import MyFooter from "../Footer/MyFooter";
import MyNav from "../Navbar/MyNav";
import "./Restaurant.scss";

const RestaurantPage = () => {
  const starters = [
    { title: "Heirloom Tomato Tartar", text: "With burrata foam, basil essence, and a balsamic reduction." },
    { title: "Seared Scallops", text: "Served with a lemon-butter sauce and microgreens." },
    { title: "Prosciutto and Melon", text: "A classic Venetian pairing of sweet melon and savory prosciutto di Parma." },
    { title: "Artichoke Hearts", text: "Fried artichoke hearts with a light aioli." },
  ];

  const mains = [
    { title: "Wagyu Beef Filet", text: "Served with black truffle potato gratin and asparagus." },
    { title: "Hand-Rolled Pappardelle", text: "With a rich wild mushroom ragu and aged parmesan cheese." },
    { title: "Grilled Sea Bass", text: "Served with roasted vegetables and a caper-dill sauce." },
    { title: "Venetian-Style Calamari", text: "Lightly fried calamari with a spicy marinara dip." },
    { title: "Braised Lamb Shank", text: "Slow-cooked lamb shank with saffron risotto." },
  ];

  const desserts = [
    { title: "Tiramisu", text: "A classic Italian dessert with mascarpone cream, coffee-soaked ladyfingers, and cocoa powder." },
    { title: "Panna Cotta", text: "Vanilla bean panna cotta with a fresh berry coulis." },
    { title: "Lemon Sorbet", text: "A refreshing lemon sorbet, perfect for a palate cleanser." },
  ];
  return (
    <>
      <section className="hero-section">
        <div className="hero-bg-restaurant"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="display-4 fw-bold mb-3 mb-md-4">An Exquisite Culinary Journey</h1>
          <p className="lead fw-light mb-4">Experience dining refined to an art form.</p>
        </div>
      </section>

      <section className="py-5 py-md-5 bg-light text-center">
        <Container>
          <Col lg={8} className="mx-auto">
            <h2 className="fs-2 fw-semibold mb-3 text-primary">The Aurelia's Table Experience</h2>
            <p className="lead text-muted mb-4">
              Located within the heart of the city's most exclusive hotel, Aurelia's Table offers a curated, seasonal menu crafted by our Michelin-starred chef.
              Our commitment to sustainable, local ingredients ensures every dish is a celebration of flavor and artistry.
            </p>
            <div className="bg-primary mx-auto" style={{ width: "5rem", height: "0.25rem", borderRadius: "999px" }}></div>
          </Col>
        </Container>
      </section>

      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col md={10} className="text-center text-dark mb-4">
            <h2 className="display-6 fw-bold text-primary">Starters</h2>
            <p className="lead text-muted">Begin your meal with one of our exquisite appetizers.</p>
          </Col>
        </Row>
        <Row className="justify-content-center g-4">
          {starters.map((starter, index) => (
            <Col sm={12} md={6} key={index}>
              <Card className="text-center h-100 shadow-sm rounded-4 border-2" border="primary">
                <Card.Body>
                  <Card.Title className="fs-5 fw-semibold">{starter.title}</Card.Title>
                  <Card.Text className="text-muted">{starter.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container fluid className="py-5 bg-secondary">
        <Row className="justify-content-center">
          <Col md={10} className="text-center text-dark mb-4">
            <h2 className="display-6 fw-bold text-primary">Mains</h2>
            <p className="lead text-muted">Savor our signature dishes crafted with the freshest local ingredients.</p>
          </Col>
        </Row>
        <Row className="justify-content-center g-4">
          {mains.map((main, index) => (
            <Col sm={12} md={6} key={index}>
              <Card className="text-center h-100 shadow-sm rounded-4 border-2" border="primary">
                <Card.Body>
                  <Card.Title className="fs-5 fw-semibold">{main.title}</Card.Title>
                  <Card.Text className="text-muted">{main.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col md={10} className="text-center text-dark mb-4">
            <h2 className="display-6 fw-bold text-primary">Desserts</h2>
            <p className="lead text-muted">End your dining experience on a sweet note.</p>
          </Col>
        </Row>
        <Row className="justify-content-center g-4">
          {desserts.map((dessert, index) => (
            <Col sm={12} md={6} key={index}>
              <Card className="text-center h-100 shadow-sm rounded-4 border-2" border="primary">
                <Card.Body>
                  <Card.Title className="fs-5 fw-semibold">{dessert.title}</Card.Title>
                  <Card.Text className="text-muted">{dessert.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default RestaurantPage;
