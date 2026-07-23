// LDK Lead Worker — nhận form từ ldktech.com, gửi email về hộp thư công ty.
// Deploy: CLOUDFLARE_API_TOKEN=... npx wrangler deploy (trong thư mục worker/)
import { EmailMessage } from "cloudflare:email";

const ALLOWED_ORIGIN = "https://ldktech.com";
const DEST = "ldktech2017@gmail.com";
const CORS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });

// base64 an toàn cho UTF-8 (subject + body MIME)
const b64utf8 = (s) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (request.method !== "POST") return json({ error: "method not allowed" }, 405);

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: "invalid json" }, 400);
    }
    // honeypot: bot điền thì giả vờ thành công, không gửi mail
    if (data.botcheck) return json({ ok: true });

    const name = String(data.name || "").slice(0, 200).trim();
    const phone = String(data.phone || "").slice(0, 50).trim();
    const message = String(data.message || "").slice(0, 2000).trim();
    if (!phone) return json({ error: "phone required" }, 400);

    const body = [
      "Lead mới từ ldktech.com",
      "",
      `Tên: ${name || "(không điền)"}`,
      `SĐT/Zalo: ${phone}`,
      `Nội dung: ${message || "(không điền)"}`,
      "",
      `Nguồn: ${String(data.source || "").slice(0, 100)}`,
      `Thời gian: ${new Date().toISOString()}`,
    ].join("\n");

    const raw = [
      "From: LDK Website <lead@ldktech.com>",
      `To: ${DEST}`,
      `Subject: =?utf-8?B?${b64utf8(`[LDK] Lead mới: ${phone}`)}?=`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      "Content-Transfer-Encoding: base64",
      "",
      b64utf8(body),
    ].join("\r\n");

    try {
      await env.LEAD_EMAIL.send(new EmailMessage("lead@ldktech.com", DEST, raw));
      return json({ ok: true });
    } catch (err) {
      console.error("send failed", err);
      return json({ error: "send failed" }, 500);
    }
  },
};
