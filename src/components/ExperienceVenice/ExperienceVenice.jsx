import { Container, Card, Row, Col } from "react-bootstrap";
import MyFooter from "../Footer/MyFooter";
import MyNav from "../Navbar/MyNav";
import "./ExperienceVenice.scss";

const ExperienceVenice = () => {
  const experiences = [
    {
      title: "Gondola Rides",
      text: "Glide through the Grand Canal and secret waterways on an authentic Venetian gondola.",
    },
    {
      title: "Historical Tours",
      text: "Explore St. Mark's Square, the Doge's Palace, and ancient bridges with a knowledgeable guide.",
    },
    {
      title: "Venetian Cuisine",
      text: "Indulge in authentic Italian food, from fresh seafood to traditional cicchetti and wine.",
    },
    {
      title: "Murano Glass Workshop",
      text: "Discover the centuries-old art of glassblowing with a hands-on workshop on the island of Murano.",
    },
    {
      title: "Burano Lace Making",
      text: "Visit the colorful island of Burano and learn the delicate craft of traditional lace making.",
    },
    {
      title: "Carnival Mask Painting",
      text: "Unleash your creativity and paint your own traditional Venetian carnival mask to take home.",
    },
    {
      title: "Hidden Gems Walking Tour",
      text: "Wander off the beaten path to discover Venice's secluded courtyards and enchanting alleys.",
    },
    {
      title: "Art History Excursion",
      text: "Delve into Venice's rich artistic heritage with a guided tour of its most famous galleries and churches.",
    },
  ];
  return (
    <>
      <MyNav />
      <section className="hero-section">
        <div className="hero-bg-experience"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="display-4 fw-bold mb-3 mb-md-4">Unforgettable Experiences in Venice</h1>
          <p className="lead fw-light mb-4">Explore the magical city of canals and bridges.</p>
        </div>
      </section>

      <section className="py-5 py-md-5 bg-light text-center">
        <Container>
          <Col lg={8} className="mx-auto">
            <h2 className="fs-2 fw-semibold mb-3 text-primary">Discover the Magic of Venice</h2>
            <p className="lead text-muted mb-4">From romantic gondola rides to historical walking tours, Venice offers a unique adventure at every turn.</p>
            <div className="bg-primary mx-auto" style={{ width: "5rem", height: "0.25rem", borderRadius: "999px" }}></div>
          </Col>
        </Container>
      </section>

      <Container className="py-5 ">
        <Row className="g-4">
          {experiences.map((experience, index) => (
            <Col sm={12} md={6} key={index}>
              <Card className="text-center h-100 shadow-sm rounded-4 border-2" border="primary">
                <Card.Body className="p-4">
                  <Card.Title className="fs-5 fw-semibold">{experience.title}</Card.Title>
                  <Card.Text className="text-muted">{experience.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <MyFooter />
    </>
  );
};

export default ExperienceVenice;
