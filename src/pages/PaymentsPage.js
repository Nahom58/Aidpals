import "../stylesheets/Taonga.css";
import React, {useRef} from 'react';
import { Container, Row, Col, Form, FormGroup, FormLabel, } from 'react-bootstrap';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';
import { useHistory, } from 'react-router';
import { MyFirebase } from '../firebase';
import NavBottom from "../components/Nav-bottom";



const PaymentsPage = (props) => {
  console.log(props);
  const userInfo = props.location.state.userInfo;
  const user = props.location.state.user;
  const number = useRef(null);
  const expiration = useRef(null);
  const nameOnCard = useRef(null);
  const securityCode = useRef(null);
  const zipCode = useHistory();

    return (  
        <Container className= "Page">
            <Row className="UserHeading">
                <Col>Payments</Col>   
            </Row>
            <Row className="LowerContent">
            <Form>
                <FormGroup className="PaymentsForm" >
                    <Row>
                        <Col xs={11}>
                            <FormLabel  className="Label">Name on card</FormLabel>
                            <Form.Control className="Input" type="text" size="sm" ref={nameOnCard}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={11}>
                            <FormLabel className="Label">Card Number</FormLabel>
                            <Form.Control className="Input" type="text" size="sm" ref={number}/>
                        </Col>     
                    </Row>
                    <Row className="SmallForm">
                        <Col xs={5}>
                            <FormLabel className="Label">Expiry Date</FormLabel>
                            <Form.Control className="Input" type="text" size="sm" ref={expiration}/>
                        </Col>
                        <Col xs={{span: 5, offset: 1}}>
                            <FormLabel className="Label">Security Code</FormLabel>
                            <Form.Control className="Input" type="text" size="sm" ref={securityCode}/>
                        </Col>
                        <Col xs={5}>
                            <FormLabel className="Label">ZIP/Postal Code</FormLabel>
                            <Form.Control className="Input" type="text" size="sm"  ref={zipCode}/>
                        </Col>
                    </Row>
                </FormGroup>
                <Row>
                  <Col id="AccountIcon" xs={{span: 1, offset: 1}}>
                    <Link
                      style={{ color: "white" }}
                      to={{
                        pathname: "/UserProfilePage",
                        state: { user: user },
                      }}
                    >
                      <ChevronLeftIcon></ChevronLeftIcon>
                    </Link>
                    </Col>
                    <Col id='AddAcount' xs={7}
                    onClick={() => {
                    let db = new MyFirebase();
                    db.createPayment(
                      user,
                      userInfo.username,
                      expiration.current.defaultValue,
                      nameOnCard.current.defaultValue,
                      securityCode.current.defaultValue,
                      zipCode.current.defaultValue
                    );}}
                    >
                    Add account</Col>
                </Row>
            </Form>
            <Row>
          <NavBottom user={user} />
            </Row>
            </Row>
        </Container>

    );
}
 
export default PaymentsPage;