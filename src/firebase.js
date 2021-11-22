import firebaseApp from "firebase/app";
import "firebase/auth";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyC25Wv1ms4febVveZfjZsShs2_tBWWhyNo",
  authDomain: "aidpals-81e5e.firebaseapp.com",
  databaseURL: "https://aidpals-81e5e-default-rtdb.firebaseio.com",
  projectId: "aidpals-81e5e",
  storageBucket: "aidpals-81e5e.appspot.com",
  messagingSenderId: "518564364284",
  appId: "1:518564364284:web:3d576ac9970c6f5d3f7c79",
};

// export default function getFirebase() {
//   if (typeof window !== "undefined") {
//       if (instance) return instance
//       instance = firebase.initializeApp(firebaseConfig);
//       return instance
//   }

//   return null
// }

let instance;

export class MyFirebase {
  constructor() {
    if (firebase.apps.length === 0) {
      instance = firebaseApp.initializeApp(firebaseConfig);
    }
  }

  getFirebase() {
    if (typeof window !== "undefined") {
      if (instance) return instance;
    }

    return null;
  }

  // CREATE:
  // https://firebase.google.com/docs/database/web/read-and-write?authuser=0
  createUser(UID, username, name, phone, email, profilePicURL, birthday) {
    let newUserRef = firebase.database().ref("users/" + UID);
    newUserRef
      .set({
        username: username,
        name: name,
        email: email,
        phone: phone,
        profile_picture: profilePicURL,
        birthday: birthday,
      })
      .then(
        () => {
          console.log("Added the BRAND NEW new user successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT add the brand new user.  Reason: " + reason
          )
      );
  }

  updateUser(UID, username, name, phone, email, profilePicURL, birthday) {
    let userRef = firebase.database().ref("user/" + UID);
    userRef
      .update({
        usename: username,
        name: name,
        phone: phone,
        email: email,
        profile_picture: profilePicURL,
        birthday: birthday,
      })
      .then(
        () => {
          console.log("Updated the user succesfully!");
        },
        (reason) =>
          console.log("ERROR: Did NOT update the user. Reason: " + reason)
      );
  }

  createCircle(
    name,
    publicBool,
    description,
    profilePicURL,
    term,
    subscriptionFee,
    ownerUID
  ) {
    let newCircleRef = firebase.database().ref("circles/" + name);
    newCircleRef
      .set({
        public: publicBool,
        description: description,
        profile_picture: profilePicURL,
        date_created: firebase.firestore.FieldValue.serverTimestamp(),
        term: term,
        subscription_fee: subscriptionFee,
        admins: {
          [ownerUID]: true,
        },
        members: {
          [ownerUID]: true,
        },
      })
      .then(
        () => {
          console.log("Added the BRAND NEW new circle successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT add the brand new circle.  Reason: " + reason
          )
      );

    let userRef = firebase.database().ref("users/" + ownerUID + "/circles");
    userRef.update({
      [name]: true,
    });
  }

  createCircleRequest(UID, circle, amount, publicDescription, fullDescription) {
    console.log(UID + " " + circle);
    let requestID = uuidv4();
    let newRequestRef = firebase.database().ref("requests/" + requestID);
    newRequestRef
      .set({
        user: UID,
        circle: circle,
        approved: false,
        amount: amount,
        date: "no",
        public_description: publicDescription,
        full_description: fullDescription,
      })
      .then(
        () => {
          console.log("Added the BRAND NEW new circle request successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT add the brand new circle request.  Reason: " +
              reason
          )
      );

    let circleRef = firebase.database().ref("circles/" + circle + "/requests");
    circleRef
      .update({
        [requestID]: false,
      })
      .then(
        () => {
          console.log("Updated the circle requests successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT edit the circle requests successfully.  Reason: " +
              reason
          )
      );
  }

  createPayment(UID, number, expiration, nameOnCard, securityCode, zipCode) {
    let paymentID = uuidv4();
    let newPaymentRef = firebase.database().ref("payments/" + paymentID);
    newPaymentRef
      .set({
        number: number,
        expiration: expiration,
        name_on_card: nameOnCard,
        security_code: securityCode,
        zip_code: zipCode,
      })
      .then(
        () => {
          console.log("Added the BRAND NEW new circle request successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT add the brand new circle request.  Reason: " +
              reason
          )
      );

    let userRef = firebase.database().ref("users/" + UID + "/payments");
    userRef
      .update({
        [paymentID]: true,
      })
      .then(
        () => {
          console.log("Updated user payments successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT edit user payments successfully.  Reason: " + reason
          )
      );
  }

  createTransaction(circle, UID, amount, type) {
    let transactionID = uuidv4();
    let newTransactionRef = firebase
      .database()
      .ref("transactions/" + transactionID);
    newTransactionRef
      .set({
        circle: circle,
        user: UID,
        amount: amount,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        type: type,
      })
      .then(
        () => {
          console.log("Added the BRAND NEW new circle request successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT add the brand new circle request.  Reason: " +
              reason
          )
      );

    let userRef = firebase.database().ref("users/" + UID + "/transactions");
    userRef
      .update({
        [transactionID]: true,
      })
      .then(
        () => {
          console.log("Updated user transactions successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT edit user transactions successfully.  Reason: " +
              reason
          )
      );

    let circleRef = firebase
      .database()
      .ref("circles/" + circle + "/transactions");
    circleRef
      .update({
        [transactionID]: true,
      })
      .then(
        () => {
          console.log("Updated circle transations successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT edit circle transactions successfully.  Reason: " +
              reason
          )
      );
  }

  // Read Information
  // You have to pass it a function to be run once the information is acquired.

  /*
  returns a JS object
  object has same fields/ structure as circle in database
  */
  getCircleInfo(circleName, callWhenFinished) {
    let ref = firebase.database().ref("circles/" + circleName);
    ref
      .once("value")
      .then((snapshot) => {
        var circleInfo = snapshot.val() || null;
        callWhenFinished(circleInfo);
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished(null);
      });
  }

  getAllCircleInfo(callWhenFinished) {
    let ref = firebase.database().ref("circles");
    ref
      .once("value")
      .then((snapshot) => {
        var listOfCircles = snapshot.val() || [];
        callWhenFinished(listOfCircles);
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished([]);
      });
  }

  getAllUserCircleNames(UID, callWhenFinished) {
    let ref = firebase.database().ref("users/" + UID + "/circles");
    ref
      .once("value")
      .then((snapshot) => {
        var listOfCircles = snapshot.val() || [];
        callWhenFinished(Object.keys(listOfCircles));
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished([]);
      });
  }

  getAllUserTransactions(UID, callWhenFinished) {
    let ref = firebase.database().ref("users/" + UID + "/transactions");
    ref
      .once("value")
      .then((snapshot) => {
        var transactions = snapshot.val() || [];
        callWhenFinished(Object.keys(transactions));
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished([]);
      });
  }

  getTransactionInfo(transactionID, callWhenFinished) {
    let ref = firebase.database().ref("transactions/" + transactionID);
    ref
      .once("value")
      .then((snapshot) => {
        var transactionInfo = snapshot.val() || null;
        callWhenFinished(transactionInfo);
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished(null);
      });
  }

  getRequestInfo(requestID, callWhenFinished) {
    let ref = firebase.database().ref("requests/" + requestID);
    ref
      .once("value")
      .then((snapshot) => {
        var requestInfo = snapshot.val() || null;
        callWhenFinished(requestInfo);
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished(null);
      });
  }

  getPaymentInfo(paymentID, callWhenFinished) {
    let ref = firebase.database().ref("requests/" + paymentID);
    ref
      .once("value")
      .then((snapshot) => {
        var paymentInfo = snapshot.val() || null;
        callWhenFinished(paymentInfo);
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished(null);
      });
  }

  getUserInfo(UID, callWhenFinished) {
    let ref = firebase.database().ref("users/" + UID);
    ref
      .once("value")
      .then((snapshot) => {
        var userInfo = snapshot.val() || null;
        // userInfo: {name: "First Last", email: "something@something.com",}
        callWhenFinished(userInfo);
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished(null);
      });
  }

  getAllUserPaymentIDs(UID, callWhenFinished) {
    let ref = firebase.database().ref("users/" + UID + "/payments");
    ref
      .once("value")
      .then((snapshot) => {
        var paymentIDs = snapshot.val() || [];
        callWhenFinished(Object.keys(paymentIDs));
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished(null);
      });
  }

  getAllCircleMembers(circle, callWhenFinished) {
    let ref = firebase.database().ref("circles/" + circle + "/members");
    ref
      .once("value")
      .then((snapshot) => {
        var members = snapshot.val() || [];
        callWhenFinished(Object.keys(members));
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished(null);
      });
  }

  // eslint-disable-next-line no-dupe-class-members
  updateUser(UID, username, name, phone, email, profilePicURL, birthday) {
    let userRef = firebase.database().ref("users/" + UID);
    userRef
      .update({
        username: username,
        name: name,
        email: email,
        phone: phone,
        profile_picture: profilePicURL,
        birthday: birthday,
      })
      .then(
        () => {
          console.log("Added updated the user successfully!");
        },
        (reason) =>
          console.log("ERROR: Did NOT update the user.  Reason: " + reason)
      );
  }

  updateCircle(
    circleID,
    isPublic,
    subscription_fee,
    term,
    profile_picture,
    description
  ) {
    let ref = firebase.database().ref("circles/" + circleID);
    ref.update({
      public: isPublic,
      subscription_fee: subscription_fee,
      term: term,
      description: description,
      profile_picture: profile_picture,
    });
  }

  /*
  I didn't do it here but to check if the current user is an admin you can probable use a function like this
  const UID = "userIDfromSomwehere"
  function checkIfAdmin(adminList) {
    return adminList.includes(UID)
  }

  and getCircleAdmins(checkIfAdmin)
  (something like that?)
  */
  getCircleAdmins(circle, callWhenFinished) {
    let ref = firebase.database().ref("circles/" + circle + "/admins");
    ref
      .once("value")
      .then((snapshot) => {
        var admins = snapshot.val() || [];
        callWhenFinished(Object.keys(admins));
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished(null);
      });
  }

  getAllCircleTransactionIDs(circle, callWhenFinished) {
    let ref = firebase.database().ref("circles/" + circle + "/transactions");
    ref
      .once("value")
      .then((snapshot) => {
        var transactionIDs = snapshot.val() || [];
        callWhenFinished(Object.keys(transactionIDs));
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished(null);
      });
  }

  /*
  getUserCircleTransactions(circle, UID) {
    var transactions = [];
    let transactionIDs = this.getAllCircleTransactionIDs(circle);
    for (let index in transactionIDs) {
      console.log(transactionIDs[index]);
      let transaction = this.getTransactionInfo(transactionIDs[index]);
      transactions.push(transaction);
    }
    let userTransactions = transactions.filter(
      (transaction) => transaction.user === UID
    );
    console.log(userTransactions);
    return userTransactions;
  }

  // also returns transaction objects
  getAllRequests(circle) {
    let ref = firebase.database().ref("circles/" + circle + "/requests");
    var requests = [];
    ref.on("value", (snapshot) => {
      const data = snapshot.val() || [];
      let keys = Object.keys(data);
      for (let index in keys) {
        let request = this.getRequestInfo(keys[index]);
        requests.push(request);
      }
    });
    console.log(requests);
    return requests;
  }

  getApprovedRequests(circle) {
    return this.getAllRequests(circle).filter((request) => request.approved);
  }

  getUnapprovedRequests(circle) {
    return this.getAllRequests(circle).filter((request) => !request.approved);
  }

  // below this point is untested

  getJoinRequests(circle) {
    let ref = firebase.database().ref("circles/" + circle + "/join_requests");
    var requests = [];
    ref.on("value", (snapshot) => {
      var data = snapshot.val() || [];
      requests = Object.keys(data);
      console.log(requests);
    });
    return requests;
  }

  circleIsPublic(circle) {
    //returns true or false
    let ref = firebase.database().ref("circles/" + circle + "/public");
    var circlePublic;
    ref.on("value", (snapshot) => {
      var data = snapshot.val() || null;
      circlePublic = data;
    });
    console.log(circlePublic);
    return circlePublic;
  }
  */

  // Joining & Join Requests (Automatically based on circle status, can easily be split into two functions)
  requestToJoinCircle(circle, UID) {
    let circleRef = firebase
      .database()
      .ref("circles/" + circle + "/join_requests");
    circleRef
      .update({
        [UID]: true,
      })
      .then(
        () => {
          console.log("Private Circle! Added to join requests successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT add to join requests successfully.  Reason: " +
              reason
          )
      );
  }

  joinCircle(circle, UID) {
    let circleRef = firebase.database().ref("circles/" + circle + "/members");
    circleRef
      .update({
        [UID]: true,
      })
      .then(
        () => {
          console.log("Updated the circle members successfully!");
        },
        (reason) =>
          console.log(
            "ERROR: Did NOT edit the circle members successfully.  Reason: " +
              reason
          )
      );
    let userRef = firebase.database().ref("users/" + UID + "/circles");
    userRef.update({
      [circle]: true,
    });
  }

  // Approving/Denying Join Requests
  approveJoinRequest(circle, UID) {
    let circleRef = firebase
      .database()
      .ref("circles/" + circle + "/join_requests/" + UID);
    circleRef.remove().then(this.joinCircle(circle, UID));
  }

  denyJoinRequest(circle, UID) {
    let circleRef = firebase
      .database()
      .ref("circles/" + circle + "/join_requests/" + UID);
    circleRef.remove();
  }

  // Approving/Denying (Monetary) Requests
  approveRequest(circle, requestID) {
    // sets approved to true (will be filtered to show on circle page)
    let ref = firebase.database().ref("requests/" + requestID);
    ref.update({ approved: true });
    let circleRef = firebase.database().ref("circles/" + circle + "/requests");
    circleRef.update({
      [requestID]: true,
    });
  }

  denyRequest(circleID, requestID) {
    // denying removes the request altogether
    let ref = firebase.database().ref("requests/" + requestID);
    ref.remove();
    firebase
      .database()
      .ref("circles/" + circleID + "/requests/" + requestID)
      .remove();
  }

  // Removing Payment Method
  removePayment(paymentID, UID) {
    // delete from payments + remove ID from user
    firebase
      .database()
      .ref("payments/" + paymentID)
      .remove();
    firebase
      .database()
      .ref("users/" + UID + "/payments/" + paymentID)
      .remove();
  }

  // below this point is from class; can be used if you write functions/ feed a location
  // as oppsoed to using more specific functions above

  // READ:
  // basic read
  // https://firebase.google.com/docs/database/web/read-and-write?authuser=0#read_data_once
  getAnObject(location, callWhenFinished) {
    let ref = firebase.database().ref(location);
    ref
      .once("value")
      .then((snapshot) => {
        var objectToGet = snapshot.val() || null; // if we don't find anything then return an empty object
        console.log("read this value in the original handler: " + objectToGet);
        callWhenFinished(objectToGet);
      })
      .catch((error) => {
        console.log("Couldn't get the object: " + error);
        callWhenFinished(null);
      });
  }

  // READ:
  // read a list of objects
  // https://firebase.google.com/docs/database/web/read-and-write?authuser=0#read_data_once
  getListOfObjects(location, callWhenFinished) {
    let ref = firebase.database().ref(location);
    ref
      .once("value")
      .then((snapshot) => {
        var listOfUsers = snapshot.val() || []; // Either we got the users, or else we have an empty list
        callWhenFinished(Object.values(listOfUsers));
      })
      .catch((error) => {
        console.log("Couldn't get list of objects: " + error);
        callWhenFinished([]);
      });
  }

  // UPDATE:
  // this will only change the things that we give it, instead of replacing the object & all children
  // https://firebase.google.com/docs/database/web/read-and-write?authuser=0#update_specific_fields
  // Get a key for a new Post.
  updateObject(location, updates, callWhenFinished) {
    let ref = firebase.database().ref(location);
    ref.update(updates, callWhenFinished); // This will call the 'callWhenFinished' function for us
  }

  // DELETE
  // https://firebase.google.com/docs/reference/node/firebase.database.Reference#remove
  deleteObject(location, callWhenFinished) {
    firebase
      .database()
      .ref(location)
      .remove()
      .then(callWhenFinished)
      .catch(callWhenFinished);
  }
}
