import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContex";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef(null);
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  let history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Sprawdz email");
    } catch {
      setError("Błąd podczas resetowania hasła");
    }
    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className={"w-100"} style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <Button onClick={history.goBack}>Cofnij</Button>
              <h2 className="text-center mb-4 overflow-hidden">Reset hasła</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Twój email</Form.Label>
                  <Form.Control
                    placeholder="Wpisz swój mail aby zresetować hasło"
                    type="email"
                    required
                    ref={emailRef}
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Zresetuj hasło
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
