
import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
  
const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">EngCom</FooterLink>
            <FooterLink href="#">Internships</FooterLink>

          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Email</FooterLink>
            <FooterLink href="#">GitHub</FooterLink>
          </Column>
        </Row>
      </Container>
      <p style={{ color: "white", 
                   textAlign: "center", 
                   }}>SOEN390 - Covid-19 Application is a school project for Concordia University and is not meant to be actually implemented. Released in 2022 (hopefully). </p>
    </Box>
  );
};
export default Footer;