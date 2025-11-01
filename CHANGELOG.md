# Changelog
All notable changes to this project will be documented in this file.

## [1.0.2] - 2025-11-01
### Added
- **JSR Registry Support**
  - Added `jsr.json` configuration for publishing to JSR registry
  - Added JSR publishing script (`npm run publish:jsr`)
  - Added JSR badges and installation instructions to README
  - Added Deno usage example with JSR import

- **Dual Registry Publishing**
  - Updated GitHub Actions workflow to publish to both npm and JSR registries
  - Implemented OIDC authentication for JSR publishing (no secrets required)
  - Added publishing section to README explaining dual-registry setup

- **CI/CD Improvements**
  - Enhanced publish workflow with Deno setup for JSR publishing
  - Added proper permissions for OIDC authentication
  - Improved workflow reliability and security

### Changed
- **Publishing Process**
  - Now publishes to both npm and JSR registries automatically on release
  - JSR publishing uses secure OIDC authentication instead of token-based auth

- **Documentation Updates**
  - Added JSR package links and badges
  - Updated installation section with JSR instructions
  - Added publishing information to README

---

## [1.0.1] - 2025-11-01
### Added
- **React 19 Support & Validation**
  - React 19 support alongside React 18
  - Comprehensive input validation
  - Request timeout handling (30 seconds)
  - Better error messages
  - Image type validation
  - Expiration range validation (60–15,552,000 seconds)
  - JSDoc documentation
  - Modern TypeScript configuration

- **Documentation Improvements**
  - Added “Supported Formats & Limitations” section with image format support, file size limits, and expiration ranges
  - Added detailed “Error Handling” section with common errors and best practices
  - Added “Troubleshooting” section with solutions for common issues (API keys, timeouts, CORS, etc.)
  - Added “Development” section with setup instructions, project structure, and available scripts
  - Added “Browser Support” details with minimum browser versions and required APIs
  - Added “API Rate Limits” documentation with best practices

- **New Code Examples**
  - Added Vanilla JavaScript example for browser-based usage
  - Enhanced Node.js example with File API requirement clarification

- **Security Enhancements**
  - Added prominent security warning about API key exposure
  - Added notes about secure backend implementation for production

- **Documentation Links & Minor Fixes**
  - Added links to `CHANGELOG.md` and `CONTRIBUTING.md`
  - Updated Node.js badge to clarify 20+ requirement for File API
  - Clarified “zero dependencies” to specify native browser/Node.js APIs
  - Added missing star emoji in “Show Your Support” section
  - Updated documentation date to current date

---

## [1.0.0] - Initial Release
- First public release of the SDK
- Core upload functionality using native `fetch` and `FormData`
- Zero dependencies, modern ES module design
- Full TypeScript type definitions

---

[1.0.2]: https://github.com/SupratimRK/sdk-imagebb/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/SupratimRK/sdk-imagebb/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/SupratimRK/sdk-imagebb/releases/tag/v1.0.0
