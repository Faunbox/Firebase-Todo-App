import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfRef = useRef(null);
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory("/");

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfRef.current.value) {
      return setError("Hasła nie są takie same");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Błąd podczas tworzenia nowego konta");
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
              <h2 className="text-center mb-4 overflow-hidden">
                Zarejestruj się
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required ref={emailRef} />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Hasło</Form.Label>
                  <Form.Control type="password" required ref={passwordRef} />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Potwórz hasło</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    ref={passwordConfRef}
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Zaloguj
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Posiadasz już konto? <Link to="/logowanie">Zaloguj się</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
