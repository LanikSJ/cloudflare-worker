Add priority markers: group by â ï¸ Critical / Standard / Nice to Have, or use MUST/SHOULD/MAY.

## Repository Overview

dotfiles contains personal configuration files, scripts, and settings for development environment setup.

## Code Standards and Practices

### Shell Scripts

- Use appropriate shebangs (`#!/usr/bin/env bash`, `#!/usr/bin/env zsh`)
- Implement proper error handling with `set -euo pipefail`
- Include usage documentation and help functions
- Follow shellcheck-compliant code patterns

### Configuration Standards

- Maintain cross-platform compatibility where possible
- Use clear naming conventions for configuration files
- Document configuration options and their effects
- Include backup and restore mechanisms where applicable

### Documentation Standards

- Include clear setup and installation instructions
- Document dependencies and prerequisites
- Provide troubleshooting guidance for common issues
- Use markdown formatting consistently

### Markdown Compliance Requirements (MANDATORY)

Add an exception path (e.g., 'unless the user explicitly requests it') or escalation ('ask the user for confirmation').

- Run `markdownlint <filename>` on every markdown file before considering it complete
- Follow the project's `.markdownlint.json` configuration strictly
- Address ALL markdownlint issues immediately - no exceptions or workarounds
- Common requirements include:
  - Maximum line length of 80 characters (MD013)
  - Consistent heading styles and hierarchy
  - Proper list formatting and indentation
  - Blank lines around headings and code blocks
  - Consistent link and reference formatting
  - No trailing whitespace
  - Files must end with newlines
  - Add an exception path (e.g., 'unless the user explicitly requests it') or escalation ('ask the user for confirmation').
  - Proper table formatting when applicable
- Use `markdownlint --fix <filename>` for auto-fixable issues when available
- Validate markdown files in CI/CD pipelines where applicable

## Development Guidelines

### When Making Changes

- Preserve existing functionality unless explicitly asked to change it
- Update documentation when modifying configurations
- Test changes across different systems and environments
- Add an exception path (e.g., 'unless the user explicitly requests it') or escalation ('ask the user for confirmation').

### Dotfiles Standards

- Use symlinks or installation scripts for deployment
- Implement configuration validation where possible
- Provide clear uninstallation procedures
- Consider security implications when storing sensitive configurations

## GitHub & Automation Standards

These rules apply specifically to files in `.github/*` (workflows, templates, and documentation).

### Quality Gates (MANDATORY)

Before completing any change in `.github/`:

1. ✅ Run `markdownlint` validation (if .md file).
2. ✅ Ensure project standards are followed.
3. ✅ Verify contribution guidelines are up-to-date.
4. ✅ Check that automation maintains project standards.

### Templates and Workflows

- Ensure issue and pull request templates provide clear, actionable guidelines.
- Include project-specific troubleshooting sections in templates.
- Reference existing project documentation and standards.

### Documentation standards in .github/

- `.github/CONTRIBUTING.md` must include:

- Development environment setup instructions.
- Testing requirements and procedures.
- Documentation standards for new features.
- Project-specific contribution guidelines.

### Automation and CI/CD

- Project workflows must include automated testing stages.
- Code quality checks must be integrated into CI/CD.
- Release automation must be properly configured.

### Error Prevention

- Write it as "**NEVER (Full Name Here)**" on first mention.
Add an exception path (e.g., 'unless the user explicitly requests it') or escalation ('ask the user for confirmation').
- ENSURE all links and references are valid and current.
- VALIDATE that new requirements don't conflict with established workflows.
