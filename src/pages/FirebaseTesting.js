import "../App.css";
import React from "react";
import { MyFirebase } from "../firebase";

function FirebaseTesting() {
  let username = React.useRef(null);
  let firstName = React.useRef(null);
  let lastName = React.useRef(null);
  let phone = React.useRef(null);
  let email = React.useRef(null);
  let profilepic = React.useRef(null);
  let birthday = React.useRef(null);

  let circleName = React.useRef(null);
  let description = React.useRef(null);
  let circleProfilePic = React.useRef(null);
  let term = React.useRef(null);
  let subscriptionFee = React.useRef(null);
  let ownerUsername = React.useRef(null);

  let requestUser = React.useRef(null);
  let requestCircle = React.useRef(null);
  let requestAmount = React.useRef(null);
  let publicDescription = React.useRef(null);
  let fullDescription = React.useRef(null);

  return (
    <div>
      <h1>Create User</h1>
      <input type="text" placeholder="Username" ref={username} />
      <input type="text" placeholder="First Name" ref={firstName} />
      <input type="text" placeholder="Last Name" ref={lastName} />
      <input type="text" placeholder="Phone Number" ref={phone} />
      <input type="text" placeholder="Email" ref={email} />
      <input type="text" placeholder="Profile Pic URL" ref={profilepic} />
      <input type="text" placeholder="Birthday" ref={birthday} />
      <button
        onClick={() => {
          let db = new MyFirebase();
          db.createUser(
            username.current.value,
            firstName.current.value,
            lastName.current.value,
            phone.current.value,
            email.current.value,
            profilepic.current.value,
            birthday.current.value
          );
        }}
      >
        Submit
      </button>

      <h1>Create Circle</h1>
      <input type="text" placeholder="Name" ref={circleName} />
      <input type="text" placeholder="Description" ref={description} />
      <input type="text" placeholder="Profile Pic URL" ref={circleProfilePic} />
      <input type="text" placeholder="Term" ref={term} />
      <input type="text" placeholder="Subscription Fee" ref={subscriptionFee} />
      <input type="text" placeholder="Owner" ref={ownerUsername} />
      <button
        onClick={() => {
          let db = new MyFirebase();
          db.createCircle(
            circleName.current.value,
            true,
            description.current.value,
            circleProfilePic.current.value,
            term.current.value,
            subscriptionFee.current.value,
            ownerUsername.current.value
          );
        }}
      >
        Submit
      </button>

      <h1>Create Request</h1>
      <input type="text" placeholder="Username" ref={requestUser} />
      <input type="text" placeholder="Relevant Circle" ref={requestCircle} />
      <input type="text" placeholder="Amount" ref={requestAmount} />
      <input
        type="text"
        placeholder="Public Description"
        ref={publicDescription}
      />
      <input type="text" placeholder="Full Description" ref={fullDescription} />
      <button
        onClick={() => {
          let db = new MyFirebase();
          db.createCircleRequest(
            requestUser.current.value,
            requestCircle.current.value,
            requestAmount.current.value,
            publicDescription.current.value,
            fullDescription.current.value
          );
        }}
      >
        Submit
      </button>

      <h1>Create Payment</h1>
      <button
        onClick={() => {
          let db = new MyFirebase();
          db.createPayment(
            "maddikia",
            "1234123412341234",
            "03/23",
            "Madison Ramos",
            "123",
            "11050"
          );
        }}
      >
        Submit
      </button>

      <h1>Create Transaction</h1>
      <button
        onClick={() => {
          let db = new MyFirebase();
          db.createTransaction("LGBTQ+ Seattle", "maddikia", 50, "Donation");
        }}
      >
        Submit
      </button>

      <h1>Test Getter</h1>
      <button
        onClick={() => {
          let db = new MyFirebase();
          db.getCircleInfo("LGBTQ+ Seattle", console.log);
        }}
      >
        Circle Info
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          db.getUserInfo("maddikia");
        }}
      >
        User Info
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          db.getAllUserPaymentIDs("maddikia");
        }}
      >
        Get Payment IDs
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          let payments = db.getAllUserPaymentIDs("maddikia");
          for (let index in payments) {
            console.log(payments[index]);
            db.getPaymentInfo(payments[index]);
          }
        }}
      >
        Get User Payment Info
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          var members = db.getAllCircleMembers("LGBTQ+ Seattle");
          console.log(members);
        }}
      >
        Get Circle Members
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          var admin = db.checkIfAdmin("LGBTQ+ Seattle", "maddikia");
          console.log(admin);
        }}
      >
        Check If Admin (True)
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          var admin = db.checkIfAdmin("LGBTQ+ Seattle", "random");
          console.log(admin);
        }}
      >
        Check If Admin (False)
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          let transactions = db.getAllCircleTransactionIDs("LGBTQ+ Seattle");
          for (let index in transactions) {
            console.log(transactions[index]);
            db.getTransactionInfo(transactions[index]);
          }
        }}
      >
        Get Circle Transaction Info
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          db.getAllRequests("LGBTQ+ Seattle");
        }}
      >
        Get User Circle Requests
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          console.log(db.getApprovedRequests("LGBTQ+ Seattle"));
        }}
      >
        Get Approved Circle Requests
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          console.log(db.getUnapprovedRequests("LGBTQ+ Seattle"));
        }}
      >
        Get Unapproved Circle Requests
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          db.getAllCircleNames(console.log);
        }}
      >
        Get All Circle Info
      </button>

      <button
        onClick={() => {
          let db = new MyFirebase();
          db.getAllUserCircleNames("maddikia", console.log);
        }}
      >
        Get All User Circle Info
      </button>
    </div>
  );
}

export default FirebaseTesting;
