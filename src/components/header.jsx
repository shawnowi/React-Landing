import web3 from '../web3';
import crowdsale from '../crowdsale';

export const Header = (props, { state, setState }) => {
  async function getWeb3() {

    props.setState(prevState => {return {...prevState, modalOpen: true};});

    await web3.eth.getChainId().then(async (chainID) => { //get chain id

      if (chainID !== 97) {

        props.setState(prevState => {return {...prevState, errorCode: 1};});

      } else {
      
        await web3.eth.getAccounts().then(async (accounts) => {  //get wallet address

          if (accounts[0] === undefined) {

            props.setState(prevState => {return {...prevState, errorCode: 2};});

          } else {

            const walletBal = await web3.eth.getBalance(accounts[0]); //get wallet balance
            let  rate = await crowdsale.methods.rate().call() //get rate

            props.setState(prevState => {return {...prevState, rate: rate};});
            props.setState(prevState => {return {...prevState, accounts: accounts};});
            props.setState(prevState => {return {...prevState, walletBalance: parseFloat(web3.utils.fromWei(walletBal.toString(), 'ether')).toFixed(4)};});
            
            console.log("hey")

            props.setState(prevState => {return {...prevState,errorCode: 0};});

          }
        });
      }
    });
  }

  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <a
                  href='#features'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Learn More
                </a>{' '}
                <button
                  className='btn btn-custom btn-lg page-scroll'
                  onClick={() => getWeb3()}
                >
                  Buy Tokensssssssss
                </button>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
