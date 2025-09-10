// src/components/GodelSpaceFullPage.tsx
'use client';

import React from 'react';
import Partners from './page_content/Partners';
import ContactForm from './page_content/ContactForm';
import MiddleSlides from './page_content/MiddleSlides';


const GodelSpaceFullPage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">

      {/* Middle Slides Section */}
      <section className="w-full">
        <MiddleSlides />
      </section>

      {/* Partners Section */}
      <section className="w-full">
        <Partners />
      </section>

      {/* Contact Section */}
      <section className="w-full">
        <ContactForm />
      </section>
    </div>
  );
};

export default GodelSpaceFullPage;
