'use client'

import React, { useState } from "react";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData); // Replace with API call if needed
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Contact Us</h2>
        <p className="text-center text-gray-800 text-sm">
          We'd love to hear from you! Share your feedback or ask questions.
        </p>

        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded">
            Thank you! Your message has been sent.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition"
          >
            Send Message
          </button>
        </form>

        <p className="text-center text-gray-800 text-sm">
          Or reach us at: <a href="mailto:hello@recipecenter.com" className="text-yellow-600 font-medium">hello@recipecenter.com</a>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
