import React, { useEffect, useState } from 'react'
import './App.css'
import './LoveLetter.css'
import './BookCanvas.css'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import LoveLetter from './pages/LoveLetter'
import Test from './pages/Test'
import OpeningAnimation from './components/OpeningAnimation'
import MusicPlayer from './components/MusicPlayer' 

const App = () => {

  const MyRoute = createHashRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='love-letter' element={<LoveLetter />}></Route>
          <Route path='test' element={<Test />}></Route>
        </Route>
      </Route>
    )
  );

  // 1. Cek apakah ada hash URL selain '#/' saat pertama kali dimuat
  const isDirectLink = window.location.hash && window.location.hash !== '#/';

  // 2. Set default state berdasarkan isDirectLink agar tidak ada layar putih berkedip
  const [loading, setLoading] = useState(!isDirectLink);
  const [showContent, setShowContent] = useState(isDirectLink);
  const [animateOut, setAnimateOut] = useState(false); 

  useEffect(() => {
    // 3. Jika isDirectLink true (masuk ke /love-letter), hentikan useEffect di sini
    if (isDirectLink) return;

    const handlePageLoad = () => {
      // Waktu jeda disesuaikan dengan durasi animasi kue bawaan template
      setTimeout(() => setAnimateOut(true), 8400);
      setTimeout(() => setLoading(false), 9000);
      setTimeout(() => setShowContent(true), 8600);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => window.removeEventListener("load", handlePageLoad);
  }, [isDirectLink]); // Tambahkan isDirectLink sebagai dependency

  return (
    <>
      <MusicPlayer startPlay={true} />

      {
        loading && <OpeningAnimation animateOut={animateOut}/>
      }
      {
        showContent && <RouterProvider router={MyRoute} />
      }
    </>
  )
}

export default App