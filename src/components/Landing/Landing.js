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
  background-color: #b298dc;
  @include border-radius(4px);
  @include box-shadow(0 1px 0 rgba(0, 0, 0, 0.2));
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
  color: white;
  font-size: 1.2em;
  line-height: 1.5em;
`;

const ProfileImage = styled.img`
  height: 10em;
  border-radius: 50%;
  padding: 1em;
`;

const Landing = () => {
  return (
    <MainLandingContainer>
      <Header>
        <HeaderTitle>About this project</HeaderTitle>
        <HeaderParagraph>
          The Monarch_Board was a 3-day{" "}
          <a
            style={{ color: "#b9faf8" }}
            href="https://www.mintbean.io/"
            rel="noopener noreferrer"
            target="_blank"
          >
            MintBean
          </a>{" "}
          Hackathon project for the{" "}
          <a
            style={{ color: "#b9faf8" }}
            href="https://sites.google.com/mintbean.io/javascriptbootcampolympics/home?authuser=0"
            rel="noopener noreferrer"
            target="_blank"
          >
            JavaScript Bootcamp Olympics
          </a>
          !
          <br />
          <br />
          We were tasked to create a kanban board, focusing on an intuitive UX!
          A kanban board is an agile project management tool that helps a user
          visualize their todos and progress. From the kanban board, the user
          can add/delete tasks and columns, rename columns, and reorder
          tasks/columns.
          <br />
          <br />
          Our board was implemented using React, using create-react-app, and{" "}
          <a
            style={{ color: "#b9faf8" }}
            href="https://www.npmjs.com/package/react-beautiful-dnd"
            rel="noopener noreferrer"
            target="_blank"
          >
            react-beautiful-dnd
          </a>{" "}
          for the the drag-and-drop feature. We also implemented{" "}
          <a
            style={{ color: "#b9faf8" }}
            href="https://www.npmjs.com/package/react-modal"
            rel="noopener noreferrer"
            target="_blank"
          >
            {" "}
            react-modal
          </a>{" "}
          for our modal integration upon adding new tasks and columns.
          <br />
          <br />
          Let's get organized!
        </HeaderParagraph>
      </Header>

      <Header>
        <HeaderTitle>project walk through</HeaderTitle>
        <HeaderParagraph>
          <div style={{"justifyContent": "center", "display": "flex"}}>
          <iframe
            title="monarch board video"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/mEnaHzJsAO4"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen="true"
          ></iframe>
          </div>
        </HeaderParagraph>
      </Header>

      <Header>
        <HeaderTitle>development team</HeaderTitle>
        <HeaderParagraph>
          We are a team of software engineers from the Turing School of Software
          & Design! Check us out on social media!
        </HeaderParagraph>
        <HeaderParagraph>
          <div style={{ display: "flex" }}>
            <ProfileImage alt="quinn elder" src="/images/quinn_elder.jpeg" />
            <div style={{ alignSelf: "center" }}>
              <p>Quinn Elder</p>
              <a
                style={{ color: "#b9faf8", display: "block" }}
                href="https://github.com/QuinnrElder"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub Profile
              </a>
              <a
                style={{ color: "#b9faf8", display: "block" }}
                href="https://www.linkedin.com/in/quinnelder34/"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <ProfileImage
              alt="michelle kaplan"
              src="/images/michelle_kaplan.jpg"
            />
            <div style={{ alignSelf: "center" }}>
              <p>Michelle Kaplan</p>
              <a
                style={{ color: "#b9faf8", display: "block" }}
                href="https://github.com/michellekaplan7"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub Profile
              </a>
              <a
                style={{ color: "#b9faf8", display: "block" }}
                href="https://www.linkedin.com/in/kaplanmichelle/"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
          <div></div>
          <div style={{ display: "flex" }}>
            <ProfileImage alt="nick taylor" src="/images/nick_taylor.jpeg" />
            <div style={{ alignSelf: "center" }}>
              <p>Nick Taylor</p>
              <a
                style={{ color: "#b9faf8", display: "block" }}
                href="https://github.com/nickstaylor"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub Profile
              </a>
              <a
                style={{ color: "#b9faf8", display: "block" }}
                href="https://www.linkedin.com/in/nick-s-taylor/"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
          <div></div>
        </HeaderParagraph>
      </Header>

      <Header>
        <HeaderTitle>special thanks</HeaderTitle>
        <HeaderParagraph>
          Big thank you to{" "}
          <a
            style={{ color: "#b9faf8" }}
            href="https://www.mintbean.io/"
            rel="noopener noreferrer"
            target="_blank"
          >
            MintBean
          </a>{" "}
          for partnering with Turing on the Turing+ program and supporting
          bootcamp grads like us!
        </HeaderParagraph>
      </Header>
    </MainLandingContainer>
  );
};

export default Landing;
