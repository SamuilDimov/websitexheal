import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_Mr9EK1Qi_5dBofM3QgWBFBZpjf8i9PTyA");

export async function POST(req: NextRequest) {
  try {
    const { firstName, email } = await req.json();

    if (!firstName || !email) {
      return NextResponse.json(
        { error: "firstName and email are required" },
        { status: 400 }
      );
    }

    // 1. Notify the team
    await resend.emails.send({
      from: "xHeal Band <onboarding@resend.dev>",
      to: "trifon@xheal.ai",
      subject: `New xHeal Band Pre-Order: ${firstName} (${email})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #4764ff; margin-top: 0;">New Pre-Order Reservation</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px;">Name</td>
              <td style="padding: 8px 0; font-weight: bold; color: #141933;">${firstName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0; font-weight: bold; color: #141933;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Source</td>
              <td style="padding: 8px 0; color: #141933;">xheal.ai/smart-devices</td>
            </tr>
          </table>
        </div>
      `,
    });

    // 2. Confirmation to the user
    await resend.emails.send({
      from: "xHeal Band <onboarding@resend.dev>",
      to: email,
      subject: "You're on the xHeal Band list, " + firstName,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 32px; background: #f8f8fa;">
          <div style="background: linear-gradient(145deg, #4764ff, #141933); border-radius: 20px; padding: 40px; margin-bottom: 32px;">
            <img src="https://xheal.ai/images/logo.svg" alt="xHeal" style="height: 32px; margin-bottom: 24px;" />
            <h1 style="color: #ffffff; font-size: 28px; font-weight: 600; margin: 0 0 12px; line-height: 1.2;">
              You're in, ${firstName}.
            </h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0;">
              Your xHeal Band reservation is confirmed. No payment has been taken.
            </p>
          </div>

          <h2 style="color: #141933; font-size: 18px; font-weight: 600; margin: 0 0 16px;">What happens next</h2>
          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px;">
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="background: #4764ff; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; line-height: 24px; text-align: center;">1</span>
              <p style="color: #141933b3; font-size: 15px; margin: 0; line-height: 1.5;">We'll email you when the xHeal Band is ready to ship.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="background: #4764ff; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; line-height: 24px; text-align: center;">2</span>
              <p style="color: #141933b3; font-size: 15px; margin: 0; line-height: 1.5;">You'll confirm your order and shipping details then. No surprises.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="background: #4764ff; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; line-height: 24px; text-align: center;">3</span>
              <p style="color: #141933b3; font-size: 15px; margin: 0; line-height: 1.5;">As a founding member, your rate is locked in and you're first in line.</p>
            </div>
          </div>

          <div style="border-top: 1px solid rgba(71,100,255,0.15); padding-top: 24px;">
            <p style="color: #141933b3; font-size: 13px; margin: 0; line-height: 1.6;">
              Questions? Reply to this email or visit
              <a href="https://xheal.ai" style="color: #4764ff;">xheal.ai</a>.
              You can cancel your reservation at any time before shipping.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Preorder API error:", err);
    return NextResponse.json(
      { error: "Failed to process reservation" },
      { status: 500 }
    );
  }
}
