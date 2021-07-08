import Web3 from 'web3';

var web3;
if(window.ethereum) {
    try{
        window.ethereum.enable();
        web3 = new Web3(window.ethereum);
    } catch (error) {
        console.log(error);
    }
} else {
    try{
        web3 = new Web3(window.web3);
    } catch (error) {
        console.log(error);
    }
}
export default web3;