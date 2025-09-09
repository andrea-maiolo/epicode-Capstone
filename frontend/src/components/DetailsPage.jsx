import { Button, Container, Image } from "react-bootstrap";

const DetailsPage = function () {
  return (
    <>
      <Container>
        <h1>titolo stanza</h1>
        <Image src="https://picsum.photos/200/300"></Image>
        <p>descrizione della stanza</p>
        <p>prezzo</p>
        <Button>Prenota ora</Button>
      </Container>
    </>
  );
};

export default DetailsPage;
