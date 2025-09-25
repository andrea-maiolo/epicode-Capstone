import { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";
import Login from "./Login";
import Register from "./Register";

const EntryPage = function ({ setUserRole }) {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <Container fluid className="vh-100 d-flex align-items-center bg-secondary">
      <Row className="d-flex flex-column flex-md-row">
        <Col className="d-flex align-items-center justify-content-center col-12 col-md-6">
          <div className="w-75 w-md-100">
            <Image src={logo} alt="Domus" fluid />
          </div>
        </Col>
        <Col className="d-flex flex-column justify-content-center col-12 col-md-6">
          {!activeComponent && (
            <>
              <h1 className="display-4 fw-bold mb-4">Experience the Palazzo</h1>
              <p className="lead text-muted mb-5">
                Our exclusive portal simplifies your stay, from effortless booking to curated experiences, all in one place. Discover the soul of Venice with
                simple, fast, and reliable service.
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
              <Login setUserRole={setUserRole} />
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

export default EntryPage;
