interface VerifyEmailProps {
  name: string;
  url: string;
}

export function VerifyEmail({ name, url }: VerifyEmailProps) {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        backgroundColor: "#020617",
        color: "#e4e4e7",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          backgroundColor: "#09090b",
          border: "1px solid #27272a",
          borderRadius: "16px",
          padding: "40px",
        }}
      >
        {/* Logo / App name */}
        <div style={{ marginBottom: "32px" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#f4f4f5",
              letterSpacing: "-0.5px",
            }}
          >
            Dear Diary
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#f4f4f5",
            margin: "0 0 8px 0",
            letterSpacing: "-0.5px",
          }}
        >
          Verify your email
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#71717a",
            margin: "0 0 32px 0",
            lineHeight: "1.6",
          }}
        >
          Hey {name}, thanks for signing up. Click the button below to verify
          your email address and start journaling.
        </p>

        {/* CTA button - FIXED: Added the opening <a> tag */}
        <a
          href={url}
          style={{
            display: "inline-block",
            backgroundColor: "#f4f4f5",
            color: "#09090b",
            fontWeight: "600",
            fontSize: "14px",
            padding: "12px 28px",
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          Verify email address
        </a>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #27272a", margin: "32px 0" }} />

        {/* Fallback link */}
        <p style={{ fontSize: "13px", color: "#52525b", margin: "0 0 8px 0" }}>
          If the button doesn&apos;t work, copy and paste this link into your
          browser:
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#3f3f46",
            wordBreak: "break-all",
            margin: 0,
          }}
        >
          <a href={url} style={{ color: "#3f3f46", textDecoration: "none" }}>
            {url}
          </a>
        </p>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #27272a",
            marginTop: "32px",
            paddingTop: "24px",
          }}
        >
          <p style={{ fontSize: "12px", color: "#3f3f46", margin: 0 }}>
            This link expires in 24 hours. If you didn&apos;t create an account,
            you can safely ignore this email.
          </p>
        </div>
      </div>
    </div>
  );
}
