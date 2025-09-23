import "./MyNav.scss";
import logo from "../../assets/logo.png";
import { Container, Image, Nav, Navbar } from "react-bootstrap";

const MyNav = function () {
  return (
    <header className="header">
      <Navbar>
        <Container className="d-flex align-items-center justify-content-between">
          <Navbar.Brand className="d-flex align-items-center text-decoration text-white">
            <Image src={logo} width="20px" height="20px" />
            <span className="ms-2 fs-4 fw-bold text-white tracking-wide">Domus</span>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/rooms" className="text-white text-decoration-none opacity-75 d-none d-sm-block">
              Rooms
            </Nav.Link>
            <Nav.Link href="/restaurant" className="text-white text-decoration-none opacity-75 d-none d-sm-block">
              Restaurant
            </Nav.Link>
            <Nav.Link href="/experiences" className="text-white text-decoration-none opacity-75 d-none d-sm-block">
              Experiences
            </Nav.Link>
            <Nav.Link href="/rooms" className="text-white text-decoration-none opacity-75 d-none d-sm-block">
              nned to do this page? Contanct
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default MyNav;
