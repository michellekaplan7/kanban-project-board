import React from "react";
import { Link } from "react-router-dom";
import './Header.css'
import styled from "styled-components";

const Container = styled.div`
width: 100%;
height: 18em;
background-color: #a663cc;
text-align: center;
position: relative;
position: fixed;
top: 0;
overflow: hidden;
@include transition(all .5s ease);
 `;

const HeaderTitle = styled.p`
font-size: 3em;
color: #b9faf8;
line-height: 5.5em;
text-transform: uppercase;
font-weight: 250;
@include transition(all .3s ease);
`;

const NavContainer = styled.div`
position: absolute;
bottom: 0;
height: 4em;
line-height: 60px;
width: 100%;
background-color: rgba(0,0,0,.1);
 `;

const Header = () => {
  return (
    <Container>
      <HeaderTitle>MONARCH_BOARD</HeaderTitle>
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
