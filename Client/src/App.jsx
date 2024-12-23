import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar/Navbar.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import MainHome from './Components/MainHome.jsx'
import Footer from "./Footer/Footer.jsx";
import Signup from "./Pages/Signup.jsx";
import DoctorListing from "./Pages/DoctorListing.jsx";
import Review from "./Components/Review.jsx";
import Map from "./Pages/Map.jsx";
import NotFound from "./Components/NotFound.jsx";
import Pp from "./Components/Pp.jsx";
import Connect from "./Pages/Connect.jsx";
import EstablishedConnection from "./Pages/EstablishedConnection.jsx";

import { SocketProvider } from "./Providers/Socket.jsx";
import { PeerProvider } from "./Providers/Peer.jsx";

function App() {

  return (
    <>
      <Router>
      <SocketProvider>
        <PeerProvider>
          <Routes>
          
            <Route path="/" element={<MainHome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/doctorlisting" element={<DoctorListing />} />
            <Route path="/review" element={<Review />} />
            <Route path="/map" element={<Map />} />
            <Route path="/privacy" element={<Pp />} />
            <Route path="*" element={<NotFound />} />


            <Route path="/connect" element={<Connect />} />
            <Route path="/connected/:roomId" element={<EstablishedConnection />} />

 
        </Routes>
        </PeerProvider>
        </SocketProvider>
        <Footer />
      </Router>
    </>
  )
}

export default App
