import React, { useEffect, useState } from 'react'
import './App.css'
import './LoveLetter.css'
import './BookCanvas.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import LoveLetter from './pages/LoveLetter'
import Test from './pages/Test'
import OpeningAnimation from './components/OpeningAnimation'
import MusicPlayer from './components/MusicPlayer' 

const App = () => {

  // Menambahkan basename agar router mengenali rute di dalam /animasi/
  const MyRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='love-Letter' element={<LoveLetter />}></Route>
          <Route path='test' element={<Test />}></Route>
        </Route>
      </Route>
    ),
    { basename: "/animasi" } 
  );

  // ------------------ Logika Cake Loader 
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [animateOut, setAnimateOut] = useState(false); 

  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* FIX: TAMPIL LANGSUNG BARENG KUE
        Kita ubah prop `startPlay` menjadi `true` secara permanen.
        Ini akan membuat tombol musik langsung muncul (karena CSS sudah diupdate)
        dan mencoba memutar lagu segera setelah halaman dimuat.
      */}
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