/* eslint-disable react/no-unescaped-entities */
"use client";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import React, { useRef } from "react";
const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (event) => {
    event.preventDefault();
    const formElement = form.current;
    if (formElement) {
      emailjs
        .sendForm("service_anp4d53", "template_3mabfv7", formElement, {
          publicKey: "kQ_3dsQ5Uk5z3lWtu",
        })
        .then(
          () => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Message Has Been Send",
              showConfirmButton: false,
              timer: 1500,
            });
            formElement.reset();
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <div className="my-10">
      <form ref={form} onSubmit={sendEmail} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-11 w-full border-b-2">
            <input
              placeholder="Name"
              name="name"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-slate-400 text-slate-400"
            />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-300 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-300 peer-focus:after:scale-x-100 peer-focus:after:border-gray-300 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Name
            </label>
          </div>
          <div className="relative h-11 w-full border-b-2">
            <input
              type="number"
              placeholder="Number"
              name="number"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-slate-400 text-slate-400"
            />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-300 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-300 peer-focus:after:scale-x-100 peer-focus:after:border-gray-300 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Number
            </label>
          </div>
        </div>
        <div className="relative h-11 w-full border-b-2">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-slate-400 text-slate-400"
          />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-300 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-300 peer-focus:after:scale-x-100 peer-focus:after:border-gray-300 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Email
          </label>
        </div>
        <div className="relative h-11 w-full border-b-2">
          <textarea
            placeholder="Message"
            name="message"
            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-slate-400 text-slate-400"
          />
          <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-300 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-300 peer-focus:after:scale-x-100 peer-focus:after:border-gray-300 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Message
          </label>
        </div>
        <button
          style={{ letterSpacing: "2px" }}
          className="mt-6 block w-full select-none rounded  bg-primary py-3 px-6 text-center align-middle font-sans font-bold uppercase text-white shadow-md shadow-[#0F2167]/20 transition-all hover:shadow-lg hover:shadow-[#0F2167]/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
          data-ripple-light="true"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
