import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center text-center text-white min-vh-100 p-5"
      style={{ backgroundColor: "#060609" }}
    >
      <h1 className="display-1 fw-bold mb-4">404</h1>
      <h2 className="display-4 mb-3">Page not Found</h2>
      <h4 className="lead text-muted mb-5">The page you are looking for is not here.</h4>
      <Link to="/" className="text-decoration-none fw-semibold text-secondary">
        Go Back Home
      </Link>
    </Container>
  );
};

export default NotFoundPage;
