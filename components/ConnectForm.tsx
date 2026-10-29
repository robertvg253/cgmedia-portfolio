"use client";

import { useState } from "react";

export default function ConnectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      {isSuccess ? (
        <div className="h-full flex flex-col items-center justify-center px-4 min-h-[350px]">
          <div className="w-12 h-[1px] bg-white/20" />
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase font-normal text-center text-gray-400 py-12 leading-relaxed">
            Thank you. We will be in touch shortly.
          </p>
          <div className="w-12 h-[1px] bg-white/20" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
          {/* Campo oculto obligatorio para Web3Forms */}
          <input
            type="hidden"
            name="access_key"
            value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ""}
          />

          {/* Fila 1: First Name & Last Name */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label
                htmlFor="first_name"
                className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1"
              >
                First Name *
              </label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                required
                placeholder="Jane"
                className="bg-transparent border-b border-gray-400 focus:border-white transition-colors outline-none py-3 text-sm text-white rounded-none placeholder:text-gray-600"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="last_name"
                className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1"
              >
                Last Name *
              </label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                required
                placeholder="Doe"
                className="bg-transparent border-b border-gray-400 focus:border-white transition-colors outline-none py-3 text-sm text-white rounded-none placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Fila 2: Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1"
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="jane@example.com"
              className="bg-transparent border-b border-gray-400 focus:border-white transition-colors outline-none py-3 text-sm text-white rounded-none placeholder:text-gray-600"
            />
          </div>

          {/* Fila 3: Company / Website */}
          <div className="flex flex-col">
            <label
              htmlFor="company"
              className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1"
            >
              Company / Website
            </label>
            <input
              id="company"
              type="text"
              name="company"
              placeholder="studio.com (optional)"
              className="bg-transparent border-b border-gray-400 focus:border-white transition-colors outline-none py-3 text-sm text-white rounded-none placeholder:text-gray-600"
            />
          </div>

          {/* Fila 4: What are you looking for? */}
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1"
            >
              What are you looking for? *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Describe your vision, timeline, or scope..."
              className="bg-transparent border-b border-gray-400 focus:border-white transition-colors outline-none py-3 text-sm text-white min-h-[150px] resize-none rounded-none placeholder:text-gray-600"
            />
          </div>

          {errorMessage && (
            <p className="text-xs text-red-400 uppercase tracking-wider">
              {errorMessage}
            </p>
          )}

          {/* Botón de Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-current px-8 py-4 uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full md:w-auto mt-4 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs font-semibold"
            >
              {isSubmitting ? "SENDING..." : "SUBMIT"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
