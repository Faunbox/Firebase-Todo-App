import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

import { useAuth } from "../context/AuthContex";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;
const UserName = styled.p`
  font-weight: 400;
  line-height: 24px;
  margin: auto 6px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
`;

export default function Navigate() {
  const { currentUser, logout, signUp } = useAuth();
  return (
    <Nav>
      {currentUser && (
        <Wrapper>
          <UserName>zalogowany jako: {currentUser.email}</UserName>
          <Button
            href={currentUser && "/rejestracja"}
            variant="primary"
            // className="m-4"
            onClick={currentUser ? logout : signUp}
          >
            {currentUser ? "Wyloguj" : "Rejestracja"}
          </Button>
        </Wrapper>
      )}
    </Nav>
  );
}
