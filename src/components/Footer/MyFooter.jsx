import { Col, Container, Row } from "react-bootstrap";
import "./MyFooter.scss";

const Footer = function () {
  return (
    <footer className="mt-auto footer">
      <Container fluid className="text-center mx-auto">
        <Row className="justify-content-center">
          <Col className="col-12">
            <p className="mb-1">&copy; {new Date().getFullYear()} Andrea Maiolo</p>
            <p className="mb-0">
              <a href="mailto:maiolo.m.2@gmail.com" className="linkStyle">
                maiolo.m.2@gmail.com
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
