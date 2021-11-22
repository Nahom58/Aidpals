import "../stylesheets/Taonga.css";
import creditcard from "../Images/creditcard.svg";
import creditcard02 from "../Images/creditcard02.svg";
import { Col, Container, Row, Image } from "react-bootstrap";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NavBottom from "../components/Nav-bottom";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

const CardInfoPage = (props) => {
  const { currentUser } = useAuth();
  const user = currentUser.uid;

  return (
    <Container className="Page">
      <Row className="UserHeading">
        <Col>Payments</Col>
      </Row>
      <Row className="LowerContent">
        <Col xs={{ span: 10, offset: 1 }}>
          <Image className="CardImage" src={creditcard02} alt="card" fluid />
        </Col>
        <Col xs={{ span: 10, offset: 1 }}>
          <Image className="CardImage" src={creditcard} alt="card" fluid />
        </Col>
      </Row>
      <Row>
        <Col id="CardIcon" xs={{ span: 1, offset: 1 }}>
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

        <Col id="PaymentsAcount" xs={7}>
          <Link
            style={{ color: "white" }}
            to={{
              pathname: "/PaymentsPage",
              state: { user: user },
            }}
          >
            Add another account
          </Link>
        </Col>
      </Row>
      <Row>
        <NavBottom user={user} />
      </Row>
    </Container>
  );
};

export default CardInfoPage;
