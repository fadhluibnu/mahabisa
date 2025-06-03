import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

// Import komponen-komponen yang sudah direfaktor
import AboutHero from './Components/AboutHero';
import Stats from './Components/Stats';
import Mission from './Components/Mission';
import CallToAction from './Components/CallToAction';
import BackgroundElements from './Components/BackgroundElements';

const About = () => {
  const { auth } = usePage().props;
  
  return (
    <>
      <Head title='MahaBisa | Tentang Kami' />

      <div className='min-h-screen flex flex-col'>
        <Navbar user={auth.user} />
        <div className='pt-16 flex-grow'>
          {' '}
          {/* Add padding to account for fixed navbar */}
          {/* Komponen Background Elements yang responsif */}
          <BackgroundElements />
          {/* Komponen-komponen yang sudah direfaktor */}
          <AboutHero />
          <Stats />
          <Mission />
          <CallToAction />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default About;
