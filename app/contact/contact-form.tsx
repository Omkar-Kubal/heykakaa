"use client";

import { useState, type FormEvent } from "react";
import { postContactMessage } from "@/lib/contact-form";
import { trackContactLead } from "@/lib/firebase-analytics";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() ?? "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formId || status === "sending") return;

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    setStatus("sending");
    setMessage("");

    try {
      await postContactMessage(formId, {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? ""),
        website: String(formData.get("website") ?? ""),
      });
      formElement.reset();
      setStatus("success");
      setMessage("Thanks for reaching out. Your message has been sent.");
      trackContactLead();
    } catch {
      setStatus("error");
      setMessage("Your message could not be sent. Please try again or email me directly.");
    }
  };

  return (
    <section className="hk-contact-form-section" aria-labelledby="contact-form-title">
      <p className="hk-eyebrow">Contact form</p>
      <h2 id="contact-form-title">Send a message.</h2>
      <p className="hk-contact-form-intro">
        Share feedback, ask a question, or tell me about a project. I’ll reply by email.
      </p>
      <form className="hk-contact-form" onSubmit={handleSubmit}>
        <label>
          Your name
          <input name="name" type="text" autoComplete="name" maxLength={120} required />
        </label>
        <label>
          Email address
          <input name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label className="hk-contact-message-field">
          Message
          <textarea name="message" rows={6} maxLength={5000} required />
        </label>
        <div className="hk-contact-honeypot" aria-hidden="true">
          <label>
            Leave this field blank
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="hk-contact-form-submit">
          <button className="hk-primary-button" type="submit" disabled={!formId || status === "sending"}>
            {status === "sending" ? "Sending…" : formId ? "Send message" : "Form setup pending"}
          </button>
          <p className="hk-contact-form-note">
            {formId
            ? "Your message is sent through Formspree to omkarkubal@protonmail.com."
              : "The form is not connected yet. Email me at omkarkubal@protonmail.com while it is being set up."}
          </p>
          <a href="mailto:omkarkubal@protonmail.com">Email me directly</a>
          <p className="hk-contact-form-status" role="status" aria-live="polite">{message}</p>
        </div>
      </form>
    </section>
  );
}
