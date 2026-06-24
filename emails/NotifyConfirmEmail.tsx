import { Html, Head, Body, Container, Text, Link, Preview, Font } from "@react-email/components";
import { site } from "@/config/site";

interface Props {
  email: string;
}

const font = "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export function NotifyConfirmEmail({ email }: Props) {
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

      <Preview>You&apos;re on the list — project updates coming {site.projectsLaunchDate} 🚀</Preview>

      <Body style={{ margin: 0, padding: 0, backgroundColor: "#eeeef0", fontFamily: font }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 16px" }}>

          <table width="100%" cellPadding={0} cellSpacing={0} style={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <tbody>

              {/* Dark header */}
              <tr>
                <td style={{ backgroundColor: "#0b0b0c", padding: "22px 28px", borderRadius: "20px 20px 0 0" }}>
                  <table cellPadding={0} cellSpacing={0}>
                    <tbody>
                      <tr>
                        <td width="38" height="38" style={{
                          width: "38px", height: "38px",
                          backgroundColor: "#6366f1", borderRadius: "10px",
                          textAlign: "center", verticalAlign: "middle",
                          fontSize: "17px", fontWeight: 700, color: "#fff", fontFamily: font,
                        }}>V</td>
                        <td style={{ paddingLeft: "14px", verticalAlign: "middle" }}>
                          <p style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#fff", lineHeight: "20px", fontFamily: font }}>{site.name}</p>
                          <p style={{ margin: 0, fontSize: "12px", color: "#6e6e78", lineHeight: "18px", fontFamily: font }}>Full-stack engineer</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              {/* Green accent line (success) */}
              <tr>
                <td height="4" style={{ background: "linear-gradient(to right, #22c55e, #34d399)", fontSize: 0, lineHeight: 0, padding: 0 }} />
              </tr>

              {/* White body */}
              <tr>
                <td style={{ backgroundColor: "#ffffff", padding: "36px 28px 40px", borderRadius: "0 0 20px 20px", textAlign: "center" }}>

                  {/* Check circle */}
                  <div style={{ width: "60px", height: "60px", backgroundColor: "#22c55e", borderRadius: "50%", margin: "0 auto 24px", textAlign: "center", lineHeight: "60px", fontSize: "28px", color: "#fff" }}>
                    ✓
                  </div>

                  <h1 style={{ margin: "0 0 14px", fontSize: "26px", fontWeight: 600, color: "#0b0b0c", letterSpacing: "-0.03em", lineHeight: "1.1", fontFamily: font }}>
                    You&apos;re on the list.
                  </h1>
                  <p style={{ margin: "0 0 28px", fontSize: "15.5px", color: "#56565e", lineHeight: "1.7", maxWidth: "360px", marginLeft: "auto", marginRight: "auto", fontFamily: font }}>
                    Thanks for signing up. I&apos;ll send you one email the moment my projects page goes live — no spam, promise.
                  </p>

                  {/* Date badge */}
                  <div style={{ display: "inline-block", padding: "9px 20px", backgroundColor: "#f4f4f3", border: "1px solid #e9e9e6", borderRadius: "100px", marginBottom: "36px" }}>
                    <p style={{ margin: 0, fontSize: "13.5px", color: "#56565e", fontFamily: "monospace", letterSpacing: "0.04em" }}>
                      🚀 Expected {site.projectsLaunchDate}
                    </p>
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", backgroundColor: "#e9e9e6", marginBottom: "28px" }} />

                  {/* Signature */}
                  <p style={{ margin: "0 0 4px", fontSize: "14.5px", fontWeight: 600, color: "#0b0b0c", fontFamily: font }}>
                    — {site.name}
                  </p>
                  <p style={{ margin: "0 0 24px", fontSize: "13px", color: "#9a9aa2", fontFamily: font }}>
                    Full-stack engineer · crafting remarkable products
                  </p>

                  {/* Visit button */}
                  <a
                    href={site.url}
                    style={{
                      display: "inline-block",
                      backgroundColor: "#0b0b0c",
                      color: "#ffffff",
                      padding: "12px 24px",
                      borderRadius: "11px",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                      fontFamily: font,
                    }}
                  >
                    Visit portfolio →
                  </a>

                </td>
              </tr>
            </tbody>
          </table>

          <p style={{ margin: "24px 0 0", textAlign: "center", fontSize: "11.5px", color: "#9a9aa2", fontFamily: font }}>
            You signed up as {email} ·{" "}
            <a href={`${site.url}/projects`} style={{ color: "#9a9aa2", textDecoration: "none" }}>{site.url.replace("https://", "")}/projects</a>
          </p>

        </Container>
      </Body>
    </Html>
  );
}
