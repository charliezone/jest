import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const handlerChange = (e) => {
    updateItemCount(name, e.target.value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="text-center">
      <img style={{ width: "75%" }} src={imagePath} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row}>
        <Form.Label column xs="6">
          {name}
        </Form.Label>
        <Col xs="5">
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handlerChange}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
}
