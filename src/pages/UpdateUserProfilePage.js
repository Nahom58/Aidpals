import "../stylesheets/Taonga.css";
import { React, useRef } from "react";
import {
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  Image,
  Row,
} from "react-bootstrap";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MyFirebase } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import NavBottom from "../components/Nav-bottom";

const UpdateUserProfilePage = (props) => {
  const userInfo = props.location.state.userInfo;
  const user = props.location.state.user;
  const updatedName = useRef(null);
  const updatedDOB = useRef(null);
  const updatedPhone = useRef(null);
  const updatedEmail = useRef(null);
  const updatedProfilePic = useRef(null);
  const history = useHistory();

  return (
    <Container>
      <Row className="UserHeading">
        <Col>User Profile</Col>
      </Row>
      <Row className="LowerContent">
        <Form>
          <FormGroup>
            <Row>
              <Col>
                <Image
                  className="DefaultPic"
                  src={userInfo.profile_picture}
                  xs={5}
                  fluid
                  roundedCircle
                />
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 3, offset: 1 }} id="NameInput">
                <FormLabel className="Label">Name</FormLabel>
              </Col>
              <Col xs={8}>
                <Form.Control
                  size="sm"
                  className="Input"
                  type="text"
                  defaultValue={userInfo.name}
                  ref={updatedName}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 3, offset: 1 }}>
                <FormLabel className="Label">Profile Picture</FormLabel>
              </Col>
              <Col xs={8}>
                <Form.Control
                  size="sm"
                  className="Input"
                  type="text"
                  defaultValue={userInfo.profile_picture}
                  ref={updatedProfilePic}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 3, offset: 1 }}>
                <FormLabel className="Label">Date Of Birth</FormLabel>
              </Col>
              <Col xs={8}>
                <Form.Control
                  size="sm"
                  className="Input"
                  type="text"
                  defaultValue={userInfo.birthday}
                  ref={updatedDOB}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 3, offset: 1 }}>
                <FormLabel className="Label">Phone Number</FormLabel>
              </Col>
              <Col xs={8}>
                <Form.Control
                  size="sm"
                  className="Input"
                  type="text"
                  defaultValue={userInfo.phone}
                  ref={updatedPhone}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 3, offset: 1 }}>
                <FormLabel className="Label">Email</FormLabel>
              </Col>
              <Col xs={8}>
                <Form.Control
                  size="sm"
                  className="Input"
                  type="email"
                  defaultValue={userInfo.email}
                  ref={updatedEmail}
                ></Form.Control>
              </Col>
            </Row>
          </FormGroup>
        </Form>
        <Row></Row>
      </Row>
      <Row>
        <Col id="SaveIcon" xs={{ span: 1, offset: 1 }}>
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
        <Col
          id="SaveChanges"
          xs={7}
          onClick={() => {
            let db = new MyFirebase();
            db.updateUser(
              user,
              userInfo.username,
              updatedName.current.value,
              updatedPhone.current.value,
              updatedEmail.current.value,
              updatedProfilePic.current.value,
              updatedDOB.current.value
            );
            history.push({
              pathname: "/UserProfilePage",
              state: { user: user },
            });
          }}
        >
          Save changes
        </Col>
      </Row>
      <Row>
        <NavBottom user={user} />
      </Row>
    </Container>
  );
};

export default UpdateUserProfilePage;
