"use client";


import GodelSpaceFullpage from "../components/GodelSpaceFullPage";
import Header from "../components/Header/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer/footer";
// import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <GodelSpaceFullpage />
      <Footer />
      {/* <Dashboard /> */}
    </>
  );
}
