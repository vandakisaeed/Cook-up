"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SubmitStatus {
  message: string;
  isError: boolean;
}

const ContactPage: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    message: "",
    isError: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ message: "", isError: false });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitStatus({
          message:
            "Message sent successfully! We will get back to you as soon as possible.",
          isError: false,
        });
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error("An error occurred while sending the message");
      }
    } catch (error) {
      setSubmitStatus({
        message:
          "An error occurred while sending the message. Please try again.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
          Fill out the form below and we'll get back to you as soon as possible.

        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-orange-100">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows={5}
                className="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Status Message */}
            {submitStatus.message && (
              <div
                className={`mb-6 p-4 rounded-xl ${
                  submitStatus.isError
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold shadow-md hover:from-orange-600 hover:to-amber-700 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Slanje...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;