import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 30%;
  background-color: #a663cc;
  text-align: center;

  position: fixed;
  top: 0;
  overflow: hidden;
  @include transition(all 0.5s ease);
`;

const HeaderTitle = styled.p`
  font-size: 3em;
  color: #b9faf8;
  line-height: 2.5em;
  text-transform: uppercase;
  font-weight: 250;
  @include transition(all 0.3s ease);
`;

const NavContainer = styled.div`
  position: absolute;
  bottom: 0;
  height: 4em;
  line-height: 60px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  height: 7em;
  border-radius: 50%;
  padding: 1em;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10%;
`;

const Header = () => {
  return (
    <Container>
      <HeaderWrapper>
        <ProfileImage alt="monarch butterfly" src="/images/bfly_white.png" />
        <HeaderTitle>MONARCH_BOARD</HeaderTitle>
      </HeaderWrapper>
      <NavContainer>
        <Link to="/" className="headerLink">
          home page
        </Link>
        <Link to="/projectboard" className="headerLink">
          kanban board
        </Link>
      </NavContainer>
    </Container>
  );
};

export default Header;
