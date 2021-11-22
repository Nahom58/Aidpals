import { React, useState, useEffect } from "react";
import "../components/All_Transactions.css";
import { MyFirebase } from "../firebase";

const AllTransactions = (props) => {
  const transactionID = props.transactionID;
  const [transactionInfo, setTransactionInfo] = useState([]);

  useEffect(() => {
    let db = new MyFirebase();
    db.getTransactionInfo(transactionID, setTransactionInfo);
  }, [transactionID]);

  return (
    <div className="AllTransactions">
      {Object.keys(transactionInfo).length > 0 && (
        <p>
          {transactionInfo.circle}
          <br />
          Amount : ${transactionInfo.amount}
          <br />
          Date: 07/06/2021
          <br />
        </p>
      )}
      <div className="AllTranscations__Details">
        <p>VIEW DETAILS ^ </p>
      </div>
    </div>
  );
};

export default AllTransactions;
