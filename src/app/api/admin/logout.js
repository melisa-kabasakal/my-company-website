export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  res.setHeader(
    "Set-Cookie",
    "admin-auth=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict; Secure"
  );

  return res.status(200).json({ success: true });
}
