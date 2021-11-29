import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SendMessage({ sendMessage }) {
  const [msg, setMsg] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    sendMessage(msg, setMsg);
  };

  return (
    <div>
      <Form onSubmit={onSubmit} className="d-flex flex-column">
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            value={msg}
            type="text"
            placeholder="Message..."
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            as="textarea"
            className="msgbox"
          />
        </Form.Group>
        <Button className="chatBtn" variant="primary" type="submit" size="lg">
          Submit
        </Button>
      </Form>
    </div>
  );
}
