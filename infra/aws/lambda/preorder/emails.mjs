const BRAND_BLUE = "#4764ff";
const BRAND_DARK = "#141933";
const LOGO_URL = "https://xheal.ai/images/logo.svg";

export function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

export function internalHtml(firstName, email) {
  const safeFirstName = escapeHtml(firstName);
  const safeEmail = escapeHtml(email);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f0f2ff;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(71,100,255,0.10);">
        <tr>
          <td style="background:${BRAND_BLUE};padding:28px 40px;">
            <img src="${LOGO_URL}" alt="xHeal" height="28" style="display:block;" />
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px;">
            <h1 style="margin:0 0 24px;font-size:22px;font-weight:700;color:${BRAND_DARK};">
              New xHeal Band Pre-Order
            </h1>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eef0ff;color:#888;font-size:13px;width:100px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #eef0ff;font-weight:600;color:${BRAND_DARK};font-size:15px;">${safeFirstName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eef0ff;color:#888;font-size:13px;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #eef0ff;font-weight:600;color:${BRAND_DARK};font-size:15px;">
                  <a href="mailto:${safeEmail}" style="color:${BRAND_BLUE};text-decoration:none;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888;font-size:13px;">Source</td>
                <td style="padding:10px 0;color:${BRAND_DARK};font-size:15px;">xheal.ai/smart-devices</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;background:#f8f9ff;border-top:1px solid #eef0ff;">
            <p style="margin:0;font-size:12px;color:#aaa;">xHeal Band pre-order system &middot; <a href="https://xheal.ai" style="color:${BRAND_BLUE};">xheal.ai</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function userHtml(firstName, year = new Date().getUTCFullYear()) {
  const safeFirstName = escapeHtml(firstName);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f0f2ff;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(71,100,255,0.18);">
        <tr>
          <td style="background:linear-gradient(145deg,${BRAND_BLUE} 0%,${BRAND_DARK} 100%);padding:48px 40px 40px;">
            <img src="${LOGO_URL}" alt="xHeal" height="32" style="display:block;margin-bottom:28px;" />
            <h1 style="margin:0 0 12px;font-size:32px;font-weight:700;color:#ffffff;line-height:1.15;">
              You&rsquo;re in, ${safeFirstName}.
            </h1>
            <p style="margin:0;font-size:16px;color:rgba(255,255,255,0.75);line-height:1.6;">
              Your xHeal Band spot is reserved. No payment has been taken.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:0 40px;">
            <div style="margin:28px 0;padding:20px 24px;background:#f0f2ff;border-radius:12px;border-left:4px solid ${BRAND_BLUE};">
              <p style="margin:0;font-size:15px;font-weight:600;color:${BRAND_DARK};">$199 one-time &middot; xHeal app subscription included free, forever.</p>
              <p style="margin:6px 0 0;font-size:13px;color:#666;">Shipping starts Summer 2026. Founding members ship first.</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:0 40px 36px;">
            <h2 style="margin:0 0 20px;font-size:16px;font-weight:700;color:${BRAND_DARK};text-transform:uppercase;letter-spacing:0.06em;">What happens next</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:36px;vertical-align:top;padding-bottom:20px;">
                  <div style="width:28px;height:28px;border-radius:50%;background:${BRAND_BLUE};color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:28px;">1</div>
                </td>
                <td style="padding-bottom:20px;padding-left:12px;vertical-align:top;">
                  <p style="margin:0;font-size:15px;color:${BRAND_DARK};line-height:1.5;">We&rsquo;ll email you when the xHeal Band is ready to ship.</p>
                </td>
              </tr>
              <tr>
                <td style="width:36px;vertical-align:top;padding-bottom:20px;">
                  <div style="width:28px;height:28px;border-radius:50%;background:${BRAND_BLUE};color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:28px;">2</div>
                </td>
                <td style="padding-bottom:20px;padding-left:12px;vertical-align:top;">
                  <p style="margin:0;font-size:15px;color:${BRAND_DARK};line-height:1.5;">You confirm your order and shipping details. No surprises.</p>
                </td>
              </tr>
              <tr>
                <td style="width:36px;vertical-align:top;">
                  <div style="width:28px;height:28px;border-radius:50%;background:${BRAND_BLUE};color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:28px;">3</div>
                </td>
                <td style="padding-left:12px;vertical-align:top;">
                  <p style="margin:0;font-size:15px;color:${BRAND_DARK};line-height:1.5;">As a founding member your rate is locked in and you&rsquo;re first in line.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:0 40px 40px;text-align:center;">
            <a href="https://xheal.ai" style="display:inline-block;background:${BRAND_BLUE};color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:12px;">
              Explore xHeal
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:${BRAND_DARK};padding:24px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <img src="${LOGO_URL}" alt="xHeal" height="22" style="display:block;margin-bottom:12px;opacity:0.8;" />
                  <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);line-height:1.6;">
                    Questions or want to cancel? Just reply to this email or reach us at
                    <a href="mailto:hello@xheal.ai" style="color:rgba(255,255,255,0.6);">hello@xheal.ai</a>.
                    <br />&copy; ${year} xHeal Corp. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
