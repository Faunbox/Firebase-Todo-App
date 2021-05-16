import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styled from "styled-components";

import { useAuth } from "../context/AuthContex";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export default function Navigate() {
  const { currentUser, logout, signUp } = useAuth();
  return (
    <Nav>
      {currentUser && (
        <Container className="d-flex align-items-center justify-content-end mt-2">
          <p className="my-auto mr-3">zalogowany jako: {currentUser.email}</p>
          <Button
            href={currentUser && "/rejestracja"}
            variant="primary"
            // className="m-4"
            onClick={currentUser ? logout : signUp}
          >
            {currentUser ? "Wyloguj" : "Rejestracja"}
          </Button>
        </Container>
      )}
    </Nav>
  );
}
