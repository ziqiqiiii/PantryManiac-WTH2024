import React from 'react'
import ClientWrapper from "@/components/";

const launchDate = '2024-11-20T19:00:00';

const EventDetails = () => {
    return (
        <div className="flex flex-col flexCenter justify-center text-center items-center lg:max-w-5xl mx-auto font-serif px-4h-full">
          <h1 className="lg:text-9xl md:text-8xl text-5xl font-bold text-green-100">The<br/>Pantry Maniac</h1>
          <p className="mt-9 lg:text-2xl sm:text-sm text-dark-brown">
            By the SC04 maniacs (ziqi's team)
          </p>
        </div>
    );
  };
  
  export default EventDetails;