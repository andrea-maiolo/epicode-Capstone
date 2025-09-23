import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container fluid className="d-flex flex-column align-items-center mt-5">
      <h1>404</h1>
      <h2>Page not Found</h2>
      <h4>The page you are looking for is not here</h4>
      <Link to="/">Go Back Home</Link>
    </Container>
  );
};

export default NotFoundPage;
