import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ReactDOM from 'react-dom'
import { SocialIcon } from 'react-social-icons'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

function ColorSchemesExample() {
  return (
    <>
      <Navbar data-bs-theme="dark" style={{height:'90px',backgroundColor:'lightgreen',borderRadius:"10px"}}>
        <Container>
          <img style={{width:'70px',height:'70px',borderRadius:'50px'}} src="https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/07/3b/5d/073b5d23-2122-c363-cddd-cffb4303870c/source/256x256bb.jpg" alt="" />
          <Nav className="me-auto">
            <Nav.Link href="/home" style={{marginLeft:"50px",color:'black'}}>Home</Nav.Link>
            <Nav.Link href="/scorecard" style={{marginLeft:"50px",color:'black'}}>New Match</Nav.Link>
            <Nav.Link href="/matches" style={{marginLeft:"50px",color:'black'}}>Match History</Nav.Link>
            <Button style={{marginLeft:'550px'}} variant="primary" href='/'>Log Out</Button>
          </Nav>
        </Container>
      </Navbar><br/>
<div>
  <h2 style={{color:'green'}}>My CricApp</h2>
  <p>A react native app to get live cricket score, scorecard, schedules of international and domestic cricket matches along with an option to bet on the winning team. This application uses Socre Monks api to fetch the match information and a node rest api for placing, retriving bets and transaction history.</p>
</div><br/>
<Carousel fade>
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" src="https://media.istockphoto.com/id/177427917/photo/close-up-of-red-cricket-ball-and-bat-sitting-on-grass.jpg?s=612x612&w=0&k=20&c=DcorerbBUeDNTfld3OclgHxCty4jih2yDCzipffX6zw=" />
        <Carousel.Caption>
          <h3>CricApp.com</h3>
          <p style={{color:'white'}}>Kapil Dev: "Cricket is a team game, and we need to work together to achieve success."</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" src="https://rukminim2.flixcart.com/image/850/1000/ks99aq80/poster/v/k/b/medium-cricket-kit-wall-poster-for-cricket-lover-room-decor-with-original-imag5ugcbg3hhtn9.jpeg?q=90&crop=false" />
        <Carousel.Caption>
          <h3>CricApp.com</h3>
          <p style={{color:'white'}}>Sachin Tendulkar: "I have always believed that cricket is a team game. I would never have achieved anything without the support of my teammates."</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" src="https://www.sportsboom.com/_next/image?url=https%3A%2F%2Fassets.sportsboom.com%2FGetty_Images_1247348876_807c2f9fcb.jpg&w=3840&q=75" />
        <Carousel.Caption>
          <h3>CricApp.com</h3>
          <p style={{color:'white'}}>Sunil Gavaskar: "Cricket is a great leveler. It brings people together irrespective of their backgrounds.".</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel><br/>

<div>
<h3 style={{color:'green'}}>Cricket Legneds</h3><br/>
<CardGroup >
      <Card>
        <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMjEzMTU4MTI2MF5BMl5BanBnXkFtZTcwNDExMzcxNQ@@._V1_.jpg" style={{height:'300px',borderRadius:'20px'}}/>
        <Card.Body>
          <Card.Title style={{color:'green'}}>Viv Richards</Card.Title>
          <Card.Text>
          Sir Isaac Vivian Alexander Richards KNH KCN OBE OOC is a retired Antiguan cricketer who represented the West Indies cricket team between 1974 and 1991. Usually batting at number three in a dominant West Indies side, Richards is widely regarded as one of the greatest batsmen of all time
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="https://feeds.abplive.com/onecms/videos/amp-stories/khELWJzC66ce82136d67a9b876817df70b6875287abp0.jpg" style={{height:'300px',borderRadius:'20px'}}/>
        <Card.Body>
          <Card.Title style={{color:'green'}}>Sachin Tendulkar</Card.Title>
          <Card.Text>
          Sachin Tendulkar (born April 24, 1973, Bombay [Mumbai], India) is an Indian professional cricket player, considered by many to be one of the greatest batsmen of all time. In 2012, he became the first cricketer to score 100 centuries (100 runs in a single innings) in international play.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="https://sportsmatik.com/uploads/world-events/players/don-bradman_1567515297.jpg" style={{height:'300px',borderRadius:'20px'}} />
        <Card.Body>
          <Card.Title style={{color:'green'}}> Sir Donald George Bradman AC</Card.Title>
          <Card.Text>
          Sir Donald George Bradman AC, nicknamed "The Don", was an Australian international cricketer, widely acknowledged as the greatest batsman of all time. His cricketing successes have been claimed by Shane Warne, among others, as making Bradman the "greatest sportsperson" in history.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>

</div>


      <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <MDBContainer className='pt-4' >
        <section className='mb-4'>
          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fab fa-facebook-f' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-twitter' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-google' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-instagram' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-linkedin' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',height:'130px',textAlign:'center',padding:'0px' }}>
        © 2025 Copyright: 
        <a className='text-dark' href='https://mdbootstrap.com/'>
          MycricApp.com
        </a>
        <br/><br/>
        <SocialIcon  url="https://linkedin.com/in/couetilc" />
        <SocialIcon style={{marginLeft:'15px'}} url="https://www.example.com" label="Our portfolio" />
        <SocialIcon style={{marginLeft:'15px'}} network="twitter" bgColor="#ff5a01" />
        <SocialIcon style={{marginLeft:'15px'}} url="www.meetup.com" />
      </div>
    </MDBFooter>
    </>
  );
}

export default ColorSchemesExample;
