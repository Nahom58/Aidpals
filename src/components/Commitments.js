import Pagination from "react-bootstrap/Pagination";
import { Container } from "react-bootstrap";
import { React, useState, useEffect } from "react";
import "./Commitments.css";

const CommitmentsDisplay = (props) => {
  const circles = props.circles;
  const user = props.user;
  // console.log(circles);
  const [currentMonth, setCurrentMonth] = useState(8);
  const [pageArray, setPageArray] = useState([]);
  const monthDict = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  useEffect(() => {
    var currPages = [];
    if (currentMonth === 1) {
      currPages.push(1);
      currPages.push(2);
      currPages.push(3);
    } else if (currentMonth === 12) {
      currPages.push(10);
      currPages.push(11);
      currPages.push(12);
    } else {
      currPages.push(currentMonth - 1);
      currPages.push(currentMonth);
      currPages.push(currentMonth + 1);
    }
    setPageArray(currPages);
  }, [currentMonth]);

  const monthClicked = (month) => {
    setCurrentMonth(month);
  };

  const prevClicked = () => {
    if (currentMonth !== 1) {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextClicked = () => {
    if (currentMonth !== 12) {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <Container className="commitments">
      <Pagination style={{ justifyContent: "center" }} size="sm">
        {pageArray.map((ele, ind) => {
          const toReturn = [];
          if (ind === 0) {
            toReturn.push(
              <Pagination.Prev
                key={"prevpage"}
                onClick={() => {
                  prevClicked();
                }}
              />
            );
          }
          toReturn.push(
            <Pagination.Item
              key={ele}
              active={currentMonth === ele ? true : false}
              onClick={() => {
                monthClicked(ele);
              }}
            >
              <b>{monthDict[ele]}</b>
            </Pagination.Item>
          );
          if (ind === pageArray.length - 1) {
            toReturn.push(
              <Pagination.Next
                key={"nextpage"}
                onClick={() => {
                  nextClicked();
                }}
              />
            );
          }

          return toReturn;
        })}
      </Pagination>
      <div className="commitmentsDisplay" style={{ textAlign: "center" }}>
        <h3>
          <b>COMMITMENTS</b>
        </h3>
        {/* Only circle names are currently accurate; commitment amt/freq is not. */}
        {circles.map((circle) => {
          const commitment = circle.subscription_fee;
          const toReturn = [];
          if (Object.keys(circle.members).includes(user)) {
            toReturn.push(
              <p className="commitmentElement" key={circle}>
                <b>${commitment}</b> in {circle.name}
              </p>
            );
          }
          return toReturn;
        })}
      </div>
    </Container>
  );
};

export default CommitmentsDisplay;
