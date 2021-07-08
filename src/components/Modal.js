import React, { useState } from 'react'
import "./Modal.css";
import web3 from '../web3';
import crowdsale from '../crowdsale';

function Modal({ setState, state }) {

    const [disable, setDisable] = useState(false);
    const [buttonText, setButtonText] = useState("Buy Token");
    const [symbolsArr] = useState(["e", "E", "+", "-"]);
    const [totalToken, setTotalToken] = useState(state.rate);
    
    let textInput = React.createRef();
    let title = "";
    let body = "";
    let footer = "";

    async function buyToken() {

        let buyValue = textInput.current.value;

        setDisable(true);
        setButtonText("Transaction in progress, please wait ...")

        await web3.eth.getChainId().then(async (chainID) => {
        
            if (chainID !== 97) {

                setState(prevState => {return {...prevState, errorCode: 1};});
        
            } else {

                await web3.eth.getAccounts().then(async (accounts) => {  //get wallet address

                    if (accounts[0] === undefined) {
          
                      setState(prevState => {return {...prevState, errorCode: 2};});
          
                    } else {
                        try {
                            await crowdsale.methods.buyTokens(accounts[0]).send({
                                from: accounts[0],
                                value: web3.utils.toWei(buyValue, 'ether')
                            });
                            setState(prevState => {return {...prevState, errorCode: 4};});
                        } catch (error) {
                            if (error.code === 4001) {
                                setState(prevState => {return {...prevState, errorCode: 3};});
                            } else {
                                setState(prevState => {return {...prevState, errorCode: 5};});
                            }
                        }
                    }
                })
            }
        })
    }

    //set pop-up title, body, and footer
    switch (state.errorCode) {
        case -1:
            title = <h1>Connecting to your wallet !</h1>
            body = <p>Please wait ...</p>
            break        
        case 0:
            title = <h1>Buy your Token</h1>
            body = 
                <p>
                    {state.walletBalance} BNB (BSC / BEP-20) available in your wallet<br /><br /><br />
                    I want to send &nbsp;
                    <input
                        ref={textInput}
                        type="number" 
                        step="0.01" 
                        min="0.01" 
                        max="5"
                        maxlength="4"
                        defaultValue="1.00"
                        style={{size:20, fontWeight:"bold", height: 50, width: 100, textAlign: 'center'}} 
                        onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
                        onClick={() => {setTotalToken(parseFloat(textInput.current.value).toFixed(2) * state.rate)}}
                        onBlur={() => {
                            if(parseInt(textInput.current.value) === 0) {
                                textInput.current.value = "0.01"
                            }
                            if(parseFloat(textInput.current.value) > 5.0) {
                                textInput.current.value = "5"
                            }                            
                            setTotalToken(parseFloat(textInput.current.value).toFixed(2) * state.rate);
                            textInput.current.value = parseFloat(textInput.current.value).toFixed(2);
                        }}
                    /> &nbsp; BNB<br /><br /><br />
                    You will get {parseFloat(totalToken).toFixed(0)} Token<br /><br /><br />
                    <i>Please note that you must keep a small amount of BNB to pay the Gas Fee.</i>
                </p>
            footer = <button disabled={disable} style={{width: 500}} onClick={() => {buyToken();}}>{buttonText}</button>
            break
        case 1:
            title = <h1>Wrong network selected !</h1>;
            body = <p>You must use BSC (Binance Smart Chain) Testnet network to connect to the website.</p>
            break
        case 2:
            title = <h1>There is problem accessing your Wallet !</h1>
            body = <p>Please check your Wallet and make sure it's ready for the purchase.</p>
            break
        case 3:
            title = <h1>transaction canceled !</h1>
            body = <p>The transaction has been cancelled. No amount was sent.</p>
            break
        case 4:
            title = <h1>Successful purchase !</h1>
            body = <p>The transaction was sent successfully. And now that you are officially part of the community, speard the World.</p>
            break
        case 5:
            title = <h1>There is some problem with your wallet !</h1>
            body = <p>Please check and make sure that you logon to your wallet and ready for transaction.</p>
            break
        default:
            break
    }

    return (
        <div className="modalBackground">
        <div className="modalContainer">
            <div className="titleCloseBtn">
            <button
                onClick={() => {
                    setState(prevState => {return {...prevState, modalOpen: false};});
                    setState(prevState => {return {...prevState, errorCode: -1};});
                }}
            >
                X
            </button>
            </div>
            <div className="title">
                {title}
            </div>
            <div className="body">
                {body}
            </div>                
            <div className="footer">
                {footer}
            </div>
        </div>
        </div>
    )
}

export default Modal;
