import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../footer/Footer.css';

function Footer(){
    return (

        <Container className='footer' fluid>
            <Row xs={2} md={4} lg={6}>
                <Col><a href='/blog'>Blog</a></Col>
                <Col><a href='#'>Help and support</a></Col>
            </Row>

            <Row xs={2} md={4} lg={6}>
                <Col><a href='#'>About us</a></Col>
                <Col><a href='#'>Terms</a></Col>
            </Row>

            <Row xs={2} md={4} lg={6}>
                <Col><a href='#'>Contact us</a></Col>
                <Col><a href='#'>Privacy policy</a></Col>
            </Row>

            <Row xs={2} md={4} lg={6}>
                <Col><a href='#'>Teach on ArtQuack</a></Col>
                <Col><a href='#'>Cookie settings</a></Col>
            </Row>

            <Row className='signed'>
                <Col>ArtQuack</Col>
            </Row>
        </Container>
        
    )
}

export default Footer;