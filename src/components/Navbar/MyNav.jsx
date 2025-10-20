import "./MyNav.scss";
import logo from "../../assets/logo.png";
import { Container, Image, Nav, Navbar } from "react-bootstrap";

const MyNav = function () {
  return (
    <header className="header">
      <Navbar expand="sm">
        <Container className="d-flex align-items-center justify-content-between">
          <Navbar.Brand href="/mainPage" className="d-flex align-items-center">
            <Image fluid className="constrained-responsive" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/rooms" className="text-white text-decoration-none">
                Rooms
              </Nav.Link>
              <Nav.Link href="/restaurant" className="text-white text-decoration-none">
                Restaurant
              </Nav.Link>
              <Nav.Link href="/experiences" className="text-white text-decoration-none">
                Experiences
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default MyNav;
