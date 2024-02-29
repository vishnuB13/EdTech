import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-x-8">
          {/* Contact Form */}
          <form className="w-full md:w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="john@example.com"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Type your message here..."
              ></textarea> 
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Our Office</h3>
            <p className="mb-2">123 Main Street</p>
            <p className="mb-2">Ernakulam, India</p>
            <p>Email: edtech@mail.com</p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Connect with Us</h3>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-blue-500 hover:underline">
                Facebook
              </a>
              <a href="/" className="text-blue-500 hover:underline">
                Twitter
              </a>
              <a href="/" className="text-blue-500 hover:underline">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
