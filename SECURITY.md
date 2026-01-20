# Security Policy

## Reporting Security Issues

🔒 **Please do not open public issues for security vulnerabilities.**

If you discover a security vulnerability in DigitalEscrowNetwork, please send an email to the repository maintainers instead of using the public issue tracker.

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond as quickly as possible to acknowledge receipt of your report and determine the next steps.

## Security Best Practices

When using this bot, please follow these security practices:

### Environment Variables
- Never commit `.env` files to the repository
- Always use `.env.example` as a template
- Keep your `BOT_TOKEN` secret
- Rotate tokens periodically

### Bot Token Security
- Store the bot token securely
- Don't share your bot token with anyone
- Use environment variables or secure vaults for sensitive data
- Regenerate the token if it's accidentally exposed

### Database Security
- Use authentication for MongoDB connections
- Enable MongoDB network access restrictions
- Use encrypted connections (TLS/SSL)
- Regular backups of database

### Deployment
- Run the bot with minimal required permissions
- Use HTTPS for any web endpoints
- Keep dependencies updated
- Monitor logs for suspicious activity

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | ✅ Supported       |
| 1.0.x   | ⚠️ Limited support |
| < 1.0   | ❌ Not supported   |

## Security Updates

Security updates will be released as soon as possible after discovery and verification. Users are encouraged to:
- Keep the bot and its dependencies updated
- Subscribe to security notifications
- Review the changelog for security-related updates

## Responsible Disclosure

We appreciate your responsible disclosure and will credit you (if you wish) in the security advisory.

Thank you for helping keep DigitalEscrowNetwork secure! 🙏
