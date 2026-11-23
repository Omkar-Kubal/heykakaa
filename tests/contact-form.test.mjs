import test from "node:test";
import assert from "node:assert/strict";
import { postContactMessage } from "../lib/contact-form.ts";

test("contact messages are sent to the configured Formspree endpoint", async () => {
  let request;
  const fetcher = async (url, options) => {
    request = { url, options };
    return new Response("{\"ok\":true}", { status: 200 });
  };

  await postContactMessage("abc123", {
    name: "Asha",
    email: "asha@example.com",
    message: "I have feedback about SyncTasks.",
    website: "",
  }, fetcher);

  assert.equal(request.url, "https://formspree.io/f/abc123");
  assert.deepEqual(JSON.parse(request.options.body), {
    name: "Asha",
    email: "asha@example.com",
    message: "I have feedback about SyncTasks.",
    _gotcha: "",
  });
  assert.equal(request.options.headers.Accept, "application/json");
});

test("a failed Formspree response is reported as a failed submission", async () => {
  await assert.rejects(
    postContactMessage("abc123", {
      name: "Asha",
      email: "asha@example.com",
      message: "Hello",
      website: "",
    }, async () => new Response("", { status: 503 })),
    /Contact message could not be sent/,
  );
});

test("an unconfigured Formspree endpoint cannot accept a submission", async () => {
  await assert.rejects(
    postContactMessage("", { name: "Asha", email: "asha@example.com", message: "Hello", website: "" }),
    /Contact form is not configured/,
  );
});
