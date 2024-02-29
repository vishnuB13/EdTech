import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-800 to-teal-800 text-white p-4 md:p-6 fixed bottom-0 w-full">
  <div className="container mx-auto">
    <div className="flex flex-col md:flex-row lg:flex-row justify-between">
      {/* Footer section 1: Logo and Site Name */}
      <section className="mb-4 md:mb-0">
        <h1 className="text-lg md:text-2xl lg:text-2xl font-bold">Your Logo or Site Name</h1>
        <p className="text-xs md:text-sm">Providing quality education online</p>
      </section> 

      {/* Footer section 2: Quick links */}
      <section className="md:col-span-1">
        <h2 className="text-sm md:text-xl font-semibold mb-2">Quick Links</h2>
        <ul className="space-y-2">
          <li><a href="/" className="hover:text-gray-400">Home</a></li>
          <li><a href="/tutor" className="hover:text-gray-400">Tutor</a></li>
          <li><a href="/" className="hover:text-gray-400">About Us</a></li>
          <li><a href="/" className="hover:text-gray-400">Contact</a></li>
        </ul>
      </section>

      {/* Footer section 3: Contact Us */}
      <section className="md:col-span-1">
        <h2 className="text-sm md:text-xl font-semibold mb-2">Contact Us</h2>
        <p className="mb-1 md:mb-2">123 Main Street</p>
        <p className="mb-1 md:mb-2">Ernakulam, India</p>
        <p className="text-xs md:text-sm">Email: Edtech@mail.com</p>
      </section>
    </div>
  </div>
</footer>


  );
  
};

export default Footer;
