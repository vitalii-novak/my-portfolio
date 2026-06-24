import { Html, Head, Body, Container, Text, Link, Preview, Font } from "@react-email/components";
import { site } from "@/config/site";

interface Props {
  subscriberEmail: string;
}

const font = "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export function NotifyOwnerEmail({ subscriberEmail }: Props) {
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

      <Preview>New project subscriber: {subscriberEmail}</Preview>

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
                          <p style={{ margin: 0, fontSize: "12px", color: "#6e6e78", lineHeight: "18px", fontFamily: font }}>Portfolio · Projects Page</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              {/* Indigo line */}
              <tr>
                <td height="4" style={{ background: "linear-gradient(to right, #6366f1, #8b5cf6, #a855f7)", fontSize: 0, lineHeight: 0, padding: 0 }} />
              </tr>

              {/* White body */}
              <tr>
                <td style={{ backgroundColor: "#ffffff", padding: "32px 28px 36px", borderRadius: "0 0 20px 20px" }}>

                  {/* Icon */}
                  <div style={{ width: "52px", height: "52px", backgroundColor: "#6366f10e", border: "1px solid #6366f133", borderRadius: "14px", textAlign: "center", lineHeight: "52px", fontSize: "24px", marginBottom: "20px" }}>
                    🔔
                  </div>

                  <p style={{ margin: "0 0 8px", fontSize: "11px", letterSpacing: "0.13em", color: "#9a9aa2", fontFamily: "monospace" }}>NEW SUBSCRIBER</p>
                  <h1 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: 600, color: "#0b0b0c", letterSpacing: "-0.025em", fontFamily: font }}>
                    Someone wants updates
                  </h1>
                  <p style={{ margin: "0 0 26px", fontSize: "15px", color: "#56565e", lineHeight: "1.65", fontFamily: font }}>
                    A visitor signed up for project launch notifications.
                  </p>

                  {/* Email highlight */}
                  <div style={{ backgroundColor: "#f4f4f3", border: "1px solid #e9e9e6", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px" }}>
                    <p style={{ margin: "0 0 4px", fontSize: "10.5px", color: "#9a9aa2", fontFamily: "monospace", letterSpacing: "0.1em" }}>SUBSCRIBER EMAIL</p>
                    <a href={`mailto:${subscriberEmail}`} style={{ color: "#6366f1", fontSize: "16px", fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em", fontFamily: font }}>
                      {subscriberEmail}
                    </a>
                  </div>

                  {/* Confirmation note */}
                  <div style={{ backgroundColor: "#22c55e0d", border: "1px solid #22c55e33", borderRadius: "10px", padding: "12px 16px" }}>
                    <p style={{ margin: 0, fontSize: "13.5px", color: "#166534", lineHeight: "1.5", fontFamily: font }}>
                      ✓ A confirmation email was automatically sent to the subscriber.
                    </p>
                  </div>

                </td>
              </tr>
            </tbody>
          </table>

          <p style={{ margin: "24px 0 0", textAlign: "center", fontSize: "12px", color: "#9a9aa2", fontFamily: font }}>
            From your{" "}
            <a href={`${site.url}/projects`} style={{ color: "#9a9aa2", textDecoration: "none" }}>projects page</a>
            {" "}· <a href={site.url} style={{ color: "#9a9aa2", textDecoration: "none" }}>{site.url.replace("https://", "")}</a>
          </p>

        </Container>
      </Body>
    </Html>
  );
}
