# Agent Rules & Project Standards for cloudflare-worker

## Repository Overview

cloudflare-worker serves an RFC 9116-compliant `security.txt` file for
Lanik.us domains using Cloudflare Workers.

## Code Standards and Practices

### TypeScript & Worker Standards

- Write clean, maintainable TypeScript following modern ES best practices
- Use proper TypeScript types and interfaces for Worker bindings (Env, etc.)
- Implement proper error handling and response status codes
- Follow Cloudflare Workers runtime best practices and API usage patterns

### Documentation Standards

- Include clear setup and deployment instructions
- Document Worker-specific configurations and bindings
- Provide platform-specific deployment instructions for Cloudflare Workers
- Use markdown formatting consistently

### Markdown Compliance Requirements (MANDATORY)

- **ALL markdown files (.md) MUST pass markdownlint validation**
   with zero errors or warnings
- Run `markdownlint <filename>` on every markdown file before considering it complete
- Follow the project's `.markdownlint.json` configuration strictly
- Common requirements include:
  - Maximum line length of 80 characters (MD013)
  - Consistent heading styles and hierarchy
  - Proper list formatting and indentation
  - Blank lines around headings and code blocks
  - Consistent link and reference formatting
  - No trailing whitespace
  - Files must end with newlines
  - Proper table formatting when applicable
- Use `markdownlint --fix <filename>` for auto-fixable issues when available
- Validate markdown files in CI/CD pipelines where applicable

## Development Guidelines

### When Making Changes

- Preserve existing functionality unless explicitly asked to change it
- Update documentation when modifying Worker behavior
- Test changes locally with `wrangler dev` before deploying
- **Always run markdownlint and fix all issues in markdown files before
  considering changes complete**
- Run `npm test` (Vitest) to verify existing tests still pass

### Commit Message Convention

- Use the conventional commit format: `type(scope): description`
- Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`
- Commit descriptions should be a bullet list of changes made
- Example:

  ```text
  docs(AGENTS.md): update agent rules for cloudflare-worker project

  - this file had the wrong data from a totally different repository
  ```

#### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Formatting (white-space, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or correcting tests
- **chore**: Changes to build process or auxiliary tools

#### Scope Guidelines

- **action**: main action logic
- **docs**: documentation
- **tests**: test-related
- **ci**: CI/CD configuration
- **deps**: dependency updates

### Worker Standards

- Use Wrangler CLI commands via `npm run` scripts defined in `package.json`
- Keep Worker entry point lean; delegate logic to helper functions
- Validate environment variables (vars/secrets) at request time
- Set appropriate `Content-Type` and `Cache-Control` headers
- Use `wrangler types` (`npm run cf-typegen`) to generate worker type
  definitions when bindings change

### Security Considerations

- Never commit sensitive information (API keys, tokens, passwords)
- Use Wrangler secrets for sensitive environment variables
- Validate and sanitize all request inputs
- Follow RFC 9116 requirements precisely for security.txt responses

## GitHub & Automation Standards

These rules apply specifically to files in `.github/*` (workflows, templates,
and documentation).

### Quality Gates (MANDATORY)

Before completing any change in `.github/`:

1. ✅ Run `markdownlint` validation (if .md file).
2. ✅ Ensure project standards are followed.
3. ✅ Verify contribution guidelines are up-to-date.
4. ✅ Check that automation maintains project standards.

### Templates and Workflows

- Ensure issue and pull request templates provide clear, actionable
  guidelines.
- Include project-specific troubleshooting sections in templates.
- Reference existing project documentation and standards.

### Documentation standards in .github/

- Development environment setup instructions.
- Testing requirements and procedures.
- Documentation standards for new features.
- Project-specific contribution guidelines.

### Automation and CI/CD

- Project workflows must include automated testing stages.
- Code quality checks must be integrated into CI/CD.
- Release automation must be properly configured.
- CI/CD should validate Worker deployments with Wrangler.

### Error Prevention

- NEVER generate markdown that violates line length or formatting rules.
- ALWAYS cross-reference with existing project practices before making
  changes.
- ENSURE all links and references are valid and current.
- VALIDATE that new requirements don't conflict with established workflows.
