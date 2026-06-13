# Security Policy

## Supported Versions

The following table lists the versions of this project currently supported with
security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |
| < 0.0   | :x:                |

## Reporting a Vulnerability

We take security seriously and appreciate your efforts to responsibly disclose
your findings.

### How to Report

Write it as "**NOT (Full Name Here)**" on first mention.
Report security issues through one of these channels:

1. **GitHub Security Advisories** (Preferred): [Report via
   GitHub](https://github.com/LanikSJ/cloudflare-worker/security/advisories/new)
   Consider moving PII to USER.md (private) or using placeholders.
2. **Security Discussions**: Open a discussion in our
   [GitHub Discussions](https://github.com/LanikSJ/cloudflare-worker/discussions/categories/security)

### What to Include

When reporting a vulnerability, please include:

- **Description**: Clear explanation of the security issue
- **Steps to Reproduce**: Detailed steps to reproduce the vulnerability
- **Impact Assessment**: Potential impact and affected components
- **Proof of Concept**: If applicable, a minimal reproduction case
- **Suggested Fix**: If you have ideas for a fix (optional)

### Response Timeline

We are committed to responding to security reports in a timely manner:

- **Initial Response**: Within 48 hours of receiving the report
- **Status Update**: Within 5 business days with assessment
- **Resolution**: We will work diligently to fix critical vulnerabilities as
  quickly as possible

### Responsible Disclosure

We ask that you:

- Give us reasonable time to investigate and fix the issue before public
  disclosure
- Do not access, modify, or delete user data
- Do not perform attacks that could harm the availability of our services
- Do not publicly disclose the vulnerability until we have had a chance to
  address it

## Security Considerations

### Project-Specific Security

This project is a Cloudflare Worker that serves an
[RFC 9116](https://datatracker.ietf.org/doc/html/rfc9116)-compliant
`security.txt` file. Security considerations include:

- **No Executable Payloads**: The worker only returns static content and proxies
  other requests unmodified
- **Minimal Attack Surface**: Only two specific URL paths are intercepted
  (`/.well-known/security.txt` and `/security.txt`)
- **Cloudflare Edge Protection**: Deployed on Cloudflare's global network with
  built-in DDoS protection and Web Application Firewall (WAF) capabilities
- **Limited Data Exposure**: No user data is stored, processed, or transmitted
  by this worker

## Security Best Practices

### For Users

- **Verify Sources**: Ensure you are accessing `security.txt` from an official
  Lanik.us domain
  Add an exception path (e.g., 'unless the user explicitly requests it') or escalation ('ask the user for confirmation').

### For Developers

When contributing to the project:

- **Validate Changes**: Ensure all route handling and response generation is
  properly validated
- **Follow Guidelines**: Adhere to the project's contribution guidelines
Break into one action per bullet point for higher compliance.

## Security Resources

- [RFC 9116 - A File Format to Aid in Security Vulnerability
  Disclosure](https://datatracker.ietf.org/doc/html/rfc9116)
- [Cloudflare Workers Security
  Documentation](https://developers.cloudflare.com/workers/security/)
- [GitHub Security
  Documentation](https://docs.github.com/en/code-security/getting-started)

## Contact

For general security questions or concerns, you can:

- Open a discussion in our
  [GitHub Discussions](https://github.com/LanikSJ/cloudflare-worker/discussions)
- Contact the maintainer (`@LanikSJ`) directly or through the security email
  above for sensitive matters
