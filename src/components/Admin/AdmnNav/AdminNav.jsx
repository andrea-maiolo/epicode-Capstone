import "./AdminNav.scss";
import logo from "../../../assets/logo.png";
import { Container, Image, Nav, Navbar } from "react-bootstrap";

const AdminNav = function () {
  return (
    <header className="header">
      <Navbar expand="sm">
        <Container className="d-flex align-items-center justify-content-between">
          <Navbar.Brand href="/adminHome" className="d-flex align-items-center">
            <Image src={logo} width="60px" height="20px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/adminHome" className="text-white text-decoration-none opacity-75">
                Admin home
              </Nav.Link>
              <Nav.Link href="/roomManager" className="text-white text-decoration-none opacity-75">
                Rooms Managment
              </Nav.Link>
              <Nav.Link href="/userManager" className="text-white text-decoration-none opacity-75">
                User Managment
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminNav;
