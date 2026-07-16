import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({ email: undefined }));

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // ---------------------------------------------------------------------
  // TODO (required before launch): this currently does NOT store or send
  // the email anywhere — it only validates the format and returns success.
  // Wire this up to a real provider, for example:
  //
  //   Mailchimp:  POST to the Mailchimp Marketing API "add member" endpoint
  //   ConvertKit: POST to the ConvertKit "add subscriber" endpoint
  //   Beehiiv:    POST to the Beehiiv "create subscription" endpoint
  //   Supabase:   insert `email` into a `subscribers` table
  //
  // Store the provider's API key in a Vercel environment variable
  // (never commit it to the repo) and call it from here.
  // ---------------------------------------------------------------------

  console.log("Newsletter signup (not yet persisted):", email);

  return NextResponse.json({ success: true });
}
