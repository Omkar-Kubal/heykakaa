export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type Fetcher = typeof fetch;

export async function postContactMessage(
  formId: string,
  message: ContactMessage,
  fetcher: Fetcher = fetch,
): Promise<void> {
  const normalizedFormId = formId.trim();
  if (!normalizedFormId) throw new Error("Contact form is not configured");

  const response = await fetcher(`https://formspree.io/f/${encodeURIComponent(normalizedFormId)}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: message.name,
      email: message.email,
      message: message.message,
      _gotcha: message.website,
    }),
  });

  if (!response.ok) throw new Error("Contact message could not be sent");
}
