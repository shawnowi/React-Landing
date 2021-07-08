import React, {useState, useEffect} from "react";
import "./Modal.css";
import web3 from '../web3';
import token from '../token';
import crowdsale from '../crowdsale';

function Modal({ setOpenModal }) {

    return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>asdfajdfajsddajlkjsakldnjaklsdnfklasnflkasnfd</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
                setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
