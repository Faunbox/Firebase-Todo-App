import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContex";
import { Link, useHistory } from "react-router-dom";

const LogIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Błąd podczas logowania");
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
              <h2 className="text-center mb-4">Zaloguj się</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required ref={emailRef} />
                </Form.Group>
                <Form.Group id="password" className="mb-5">
                  <Form.Label>Hasło</Form.Label>
                  <Form.Control type="password" required ref={passwordRef} />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Zaloguj się
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/reset-hasla">Zapomniałeś hasła?</Link>
          </div>
          <div className="w-100 text-center mt-4">
            Potrzebujesz konta? <Link to="/rejestracja">Zarejestruj się</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LogIn;
