import { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";
import Login from "./Login";
import Register from "../Register/Register";

const LandingPage = function () {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col className="d-flex align-items-center justify-content-center">
          <Image src={logo} alt="Domus" fluid />
        </Col>
        <Col className="d-flex flex-column justify-content-center">
          {!activeComponent && (
            <>
              <h1 className="display-4 fw-bold mb-4">Book Smarter, Travel Better.</h1>
              <p className="lead text-muted mb-5">
                Our platform helps you discover, compare, and book your perfect stay — all in one place. Simple, fast, and reliable.
              </p>
              <div className="d-flex gap-3">
                <Button className="btn btn-primary btn-lg px-4 rounded-pill shadow" onClick={() => setActiveComponent("login")}>
                  Login
                </Button>
                <Button className="btn btn-primary btn-lg px-4 rounded-pill" onClick={() => setActiveComponent("register")}>
                  Register
                </Button>
              </div>
            </>
          )}
          {activeComponent === "login" && (
            <div>
              <Login />
              <Button className="btn-primary mt-3" onClick={() => setActiveComponent("register")}>
                Register
              </Button>
            </div>
          )}
          {activeComponent === "register" && (
            <div>
              <Register />
              <Button className="btn-primary mt-3" onClick={() => setActiveComponent("login")}>
                Login
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
