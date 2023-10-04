
import Form from 'react-bootstrap/Form';
//import './App.css';
//mport CollapsibleExample from '../navbars';
//import Footering from '../footer/Footer';
import { Fragment } from 'react';
import './Register.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Register() { 
  
  return(
    <Fragment>
    {/* <div>
      <CollapsibleExample />
    </div> */}

    <div id='app' className='container-register'>
      <h3>Become a ArtQuack instructor</h3>
      <div>
        <form>
          <Form.Group className='mb-3' id='data'>
            {/* <Form.Label><FontAwesomeIcon icon="fa-solid fa-user" /></Form.Label> */}
            <Form.Label>Username</Form.Label>
            <Form.Control className='enter' type='text' placeholder='Your Name' required />
          </Form.Group>

          <Form.Group className='mb-3'id='data'>
            {/* <Form.Label><i className='fa-solid fa-envelope'></i></Form.Label> */}
            <Form.Label>Email</Form.Label>
            <Form.Control className='enter'type='email' placeholder='Your Email' required />
          </Form.Group>

          <Form.Group className='mb-3' id='data'>
            {/* <Form.Label><i className='fa-solid fa-lock'></i></Form.Label> */}
            <Form.Label>Password</Form.Label>
            <Form.Control className='enter' type='password' placeholder='Password' required />
          </Form.Group>

          <Form.Group className='mb-3' id='data'>
            {/* <Form.Label><i className='fa-solid fa-lock'></i></Form.Label> */}
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control className='enter' type='password' placeholder='Confirm password' required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check className='check' required
              label="Agree to Terms and Privacy Policy"
            />
          </Form.Group>

          <button type='submit' className='btn'>Register</button>
        </form>
      </div>
      <div className='link'>
        <p>
          Already have account? <a href='/login'>LogIn</a>
        </p>
      </div>
    </div>

    {/* <div> 
      <Footering />
    </div> */}
    </Fragment>
  )
}


export default Register;