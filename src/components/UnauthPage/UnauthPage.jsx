import { Container } from "react-bootstrap";
import { FiAlertTriangle } from "react-icons/fi";

const UnauthPage = function () {
  return (
    <div className="bg-secondary vh-100 d-flex">
      <Container fluid className="d-flex align-items-center justify-content-center flex-column">
        <FiAlertTriangle />
        <h1 className="text-primary">403</h1>
        <h2>Looks like you don't have the authorization to access this part</h2>
        <a href="/mainPage">Go back to the main page</a>
        <a href="/">Go back to login/registration</a>
      </Container>
    </div>
  );
};

export default UnauthPage;
