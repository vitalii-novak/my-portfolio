import {
  Html, Head, Body, Container, Section, Row, Column,
  Text, Heading, Link, Preview, Button, Font,
} from "@react-email/components";
import { site } from "@/config/site";

interface Props {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const font = "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export function ContactEmail({ name, email, subject, message }: Props) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Space Grotesk"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mF71Q-gxwmNZF2A.woff2",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
      </Head>

      <Preview>New message from {name} — portfolio contact form</Preview>

      {/* Page background */}
      <Body style={{ margin: 0, padding: 0, backgroundColor: "#eeeef0", fontFamily: font }}>
        <Container style={{ maxWidth: "580px", margin: "0 auto", padding: "40px 16px" }}>

          {/* ── Outer card ───────────────────────────────────────────── */}
          <table width="100%" cellPadding={0} cellSpacing={0} style={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <tbody>

              {/* ── Dark header row ── */}
              <tr>
                <td style={{ backgroundColor: "#0b0b0c", padding: "22px 28px", borderRadius: "20px 20px 0 0" }}>
                  <table width="100%" cellPadding={0} cellSpacing={0}>
                    <tbody>
                      <tr>
                        {/* V logo box */}
                        <td width="38" height="38" style={{
                          width: "38px", height: "38px",
                          backgroundColor: "#6366f1",
                          borderRadius: "10px",
                          textAlign: "center", verticalAlign: "middle",
                          fontSize: "17px", fontWeight: 700, color: "#ffffff",
                          fontFamily: font,
                        }}>
                          V
                        </td>
                        {/* Brand name */}
                        <td style={{ paddingLeft: "14px", verticalAlign: "middle" }}>
                          <p style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#ffffff", lineHeight: "20px", fontFamily: font }}>
                            {site.name}
                          </p>
                          <p style={{ margin: 0, fontSize: "12px", color: "#6e6e78", lineHeight: "18px", fontFamily: font }}>
                            Portfolio · Contact Form
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              {/* ── Gradient accent line ── */}
              <tr>
                <td height="4" style={{
                  background: "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)",
                  fontSize: 0, lineHeight: 0, padding: 0,
                }} />
              </tr>

              {/* ── White body ── */}
              <tr>
                <td style={{ backgroundColor: "#ffffff", padding: "32px 28px 36px", borderRadius: "0 0 20px 20px" }}>

                  {/* Heading */}
                  <p style={{ margin: "0 0 8px", fontSize: "11px", letterSpacing: "0.13em", color: "#9a9aa2", fontFamily: "monospace" }}>
                    NEW MESSAGE
                  </p>
                  <h1 style={{
                    margin: "0 0 26px",
                    fontSize: "22px", fontWeight: 600,
                    color: "#0b0b0c", letterSpacing: "-0.025em", lineHeight: "1.25",
                    fontFamily: font,
                  }}>
                    {name} sent you a message
                  </h1>

                  {/* Fields table */}
                  <table width="100%" cellPadding={0} cellSpacing={0} style={{
                    borderCollapse: "collapse",
                    border: "1px solid #e9e9e6",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "24px",
                    fontSize: "14px",
                  }}>
                    <tbody>
                      <tr style={{ backgroundColor: "#f8f8f8" }}>
                        <td style={{ padding: "11px 16px", fontSize: "10.5px", color: "#9a9aa2", fontFamily: "monospace", letterSpacing: "0.1em", width: "72px", borderBottom: "1px solid #e9e9e6" }}>
                          FROM
                        </td>
                        <td style={{ padding: "11px 16px", fontWeight: 600, color: "#0b0b0c", borderBottom: "1px solid #e9e9e6", fontFamily: font }}>
                          {name}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "11px 16px", fontSize: "10.5px", color: "#9a9aa2", fontFamily: "monospace", letterSpacing: "0.1em", backgroundColor: "#f8f8f8", borderBottom: "1px solid #e9e9e6" }}>
                          EMAIL
                        </td>
                        <td style={{ padding: "11px 16px", borderBottom: "1px solid #e9e9e6" }}>
                          <a href={`mailto:${email}`} style={{ color: "#6366f1", textDecoration: "none", fontFamily: font, fontSize: "14px" }}>
                            {email}
                          </a>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: "#f8f8f8" }}>
                        <td style={{ padding: "11px 16px", fontSize: "10.5px", color: "#9a9aa2", fontFamily: "monospace", letterSpacing: "0.1em" }}>
                          SUBJECT
                        </td>
                        <td style={{ padding: "11px 16px", fontWeight: 500, color: "#0b0b0c", fontFamily: font }}>
                          {subject || "No subject"}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Message label */}
                  <p style={{ margin: "0 0 10px", fontSize: "10.5px", letterSpacing: "0.13em", color: "#9a9aa2", fontFamily: "monospace" }}>
                    MESSAGE
                  </p>

                  {/* Message block */}
                  <div style={{
                    backgroundColor: "#f4f4f3",
                    border: "1px solid #e9e9e6",
                    borderRadius: "12px",
                    padding: "18px 20px",
                    marginBottom: "28px",
                  }}>
                    <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.75", color: "#1a1a22", whiteSpace: "pre-wrap", fontFamily: font }}>
                      {message}
                    </p>
                  </div>

                  {/* CTA button */}
                  <a
                    href={`mailto:${email}?subject=Re%3A%20${encodeURIComponent(subject)}`}
                    style={{
                      display: "inline-block",
                      backgroundColor: "#6366f1",
                      color: "#ffffff",
                      padding: "13px 26px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                      fontFamily: font,
                    }}
                  >
                    Reply to {name} →
                  </a>

                </td>
              </tr>

            </tbody>
          </table>

          {/* ── Footer ── */}
          <p style={{ margin: "24px 0 0", textAlign: "center", fontSize: "12px", color: "#9a9aa2", fontFamily: font }}>
            Sent from your portfolio ·{" "}
            <a href="{site.url}" style={{ color: "#9a9aa2", textDecoration: "none" }}>
              {site.url.replace("https://", "")}
            </a>
          </p>

        </Container>
      </Body>
    </Html>
  );
}
