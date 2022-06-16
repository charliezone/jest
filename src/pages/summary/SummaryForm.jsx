import { useState } from "react";
import {
  Form,
  Button,
  Popover,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function SummaryForm() {
  const [agreeTermAndConditions, setAgreeTermAndConditions] = useState(true);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>no ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group
        controlId="term-and-conditions"
        className="d-flex justify-content-center"
      >
        <Form.Check
          type="checkbox"
          id="term-and-conditions"
          onChange={() => setAgreeTermAndConditions(!agreeTermAndConditions)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button type="submit" disabled={agreeTermAndConditions}>
        Confirm Order
      </Button>
    </Form>
  );
}

export default SummaryForm;
