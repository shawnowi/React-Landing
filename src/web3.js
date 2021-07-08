import Web3 from 'web3';

var web3 = new Web3();
if(window.ethereum) {
    try{
        window.ethereum.enable();
        web3 = new Web3(window.ethereum);
    } catch (error) {
        console.log(error);
    }
} else if (window.web3) {
    try{
        window.ethereum.enable();
        web3 = new Web3(web3.currentProvider);
    } catch (error) {
        console.log(error);
    }
}
export default web3;
