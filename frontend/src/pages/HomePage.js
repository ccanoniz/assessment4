import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import GratitudeGenerator from '../components/HomePage/GratitudeGenerator';
import "../components/HomePage/HomePage.css"
import Link from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';



function HomePage() {

  return (
      <>
      <div className="mainDiv">
      <Container className="homepageContainer">
      <Row>
        <Col> 
          <h2 className="homepage-header">Live a Grateful Life</h2>
          <p className="homepage-quote">"Gratitude unlocks the fullness of life. It turns what we have into enough and more.  It turns denial into acceptance, chaos to order, confusion to clarity. It can turn a meal into a feast, a house into a home, a stranger into friend."  - Melody Beaattie </p>
          <LinkContainer to="/add">
            <Button variant="outline-primary" size="lg">Get Started</Button>
          </LinkContainer>
        </Col>

        <Col>
          <GratitudeGenerator />
        </Col>
      </Row>
      </Container>
      </div>

      </>
     
  )
}

export default HomePage
