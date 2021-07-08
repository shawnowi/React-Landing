import { useState, useEffect } from 'react'
import { Navigation } from './components/navigation'
import { Header } from './components/header'
import { Features } from './components/features'
import { About } from './components/about'
import { Services } from './components/services'
import { Gallery } from './components/gallery'
import { Testimonials } from './components/testimonials'
import { Team } from './components/Team'
import { Contact } from './components/contact'
import JsonData from './data/data.json'
import SmoothScroll from 'smooth-scroll'
import Modal from "./components/Modal";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const App = () => {
  const [landingPageData, setLandingPageData] = useState({})
  const [state, setState] = useState({ 
    modalOpen: false,
    account: [],
    walletBalance: 0,
    rate: 0,
    errorCode: -1
  });

  useEffect(() => {
    setLandingPageData(JsonData);
  }, [])

  return (
    <div>
      {state.modalOpen && 
        <Modal setState={setState} state={state}/>}

      {!state.modalOpen &&
        <div>
          <Navigation data={landingPageData.Navigation} />
          <Header data={landingPageData.Header} setState={setState} state={state} />
          <Features data={landingPageData.Features} />
          <About data={landingPageData.About} />
          <Services data={landingPageData.Services} />
          <Gallery />
          <Testimonials data={landingPageData.Testimonials} />
          <Team data={landingPageData.Team} />
          <Contact data={landingPageData.Contact} />
        </div>
      }
    </div>
  )
}

export default App
