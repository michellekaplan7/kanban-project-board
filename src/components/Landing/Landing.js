import React from "react";
import styled from "styled-components";

const MainLandingContainer = styled.div`
  width: 50em;
  margin: 0 auto;
  background-color: white;
`;

const Header = styled.section`
  padding: 20px;
	margin-bottom: 40px;
	background-color: #B298DC;
	@include border-radius(4px);
	@include box-shadow(0 1px 0 rgba(0,0,0,.2));
`;

const HeaderTitle = styled.h2`
  font-size: 34px;
	text-transform: uppercase;
	font-weight: 100;
	line-height: 2;
	color: #2c3e50;
`;

const HeaderParagraph = styled.p`
  margin-bottom: 2rem;
	line-height: 2;
	color: #7f8c8d; 
`;

const Landing = () => {
  return (
    <MainLandingContainer>

      <Header>
        <HeaderTitle>About this project</HeaderTitle>
        <HeaderParagraph>about section</HeaderParagraph>
      </Header>

      <Header>
        <HeaderTitle>project walk through</HeaderTitle>
        <HeaderParagraph>walk through </HeaderParagraph>
      </Header>

      <Header>
        <HeaderTitle>development team</HeaderTitle>
        <HeaderParagraph>about the team</HeaderParagraph>
      </Header>

    </MainLandingContainer>
  );
};

export default Landing;
