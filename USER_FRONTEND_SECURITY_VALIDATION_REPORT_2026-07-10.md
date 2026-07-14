# User Frontend Security Validation Report

Date: July 10, 2026

## Scope

This report covers only the User frontend application.

Validation mapping:

- Code against = SAST
- Packages against = SCA
- Running UI/login/API usage against = DAST

## Executive Summary

Overall Status: Positive with Minor Hardening Recommendations

Overall Score: 8.5/10

Summary:

- The User frontend is currently operating with a cookie-based authentication flow rather than browser-stored JWT usage.
- The frontend no longer relies on active bearer-token injection from browser storage for API access.
- Package-level dependency audit is clean at the time of assessment.
- Production build validation completed successfully on the reviewed codebase.
- The validated runtime profile response is improved and does not expose password hash or OTP-related values.

## 1. SAST - Static Application Security Testing

Scope:
Frontend source code review of login handling, session storage behavior, route protection, and API calling patterns.

Status: Completed

Score: 8/10

Positive findings:

- API requests are configured to use credentialed cookie-based authentication with `withCredentials: true` in [src/redux/Api.js](E:/Trust_Account_Security_Test_Report/trust-account-usr-frontend-main_2/src/redux/Api.js:16).
- The previous `Authorization: Bearer ...` browser-storage pattern is not active in the current API client in [src/redux/Api.js](E:/Trust_Account_Security_Test_Report/trust-account-usr-frontend-main_2/src/redux/Api.js:8).
- Session persistence logic in [src/utils/authStorage.js](E:/Trust_Account_Security_Test_Report/trust-account-usr-frontend-main_2/src/utils/authStorage.js:19) stores minimal user/session profile data and does not store passwords.
- Route protection is enforced through dedicated wrappers including [src/routes/PrivateRoute.jsx](E:/Trust_Account_Security_Test_Report/trust-account-usr-frontend-main_2/src/routes/PrivateRoute.jsx:70), [src/routes/RequireReadPermission.jsx](E:/Trust_Account_Security_Test_Report/trust-account-usr-frontend-main_2/src/routes/RequireReadPermission.jsx:47), and [src/routes/RoleBasedRoutes.jsx](E:/Trust_Account_Security_Test_Report/trust-account-usr-frontend-main_2/src/routes/RoleBasedRoutes.jsx:202).
- Login handling stores only subscription and UI permission state in browser storage where needed for frontend experience in [src/pages/user/auth/Login.jsx](E:/Trust_Account_Security_Test_Report/trust-account-usr-frontend-main_2/src/pages/user/auth/Login.jsx:39).

Minor observations:

- UI permission routing still depends on browser-stored `menuPermissions` in [src/routes/RoleBasedRoutes.jsx](E:/Trust_Account_Security_Test_Report/trust-account-usr-frontend-main_2/src/routes/RoleBasedRoutes.jsx:181).
- Subscription gating currently relies on browser-stored subscription state in [src/routes/RequireSubscriptionProctation.jsx](E:/Trust_Account_Security_Test_Report/trust-account-usr-frontend-main_2/src/routes/RequireSubscriptionProctation.jsx:5).
- Initial auth state restoration in [src/contexts/AuthContext.jsx](E:/Trust_Account_Security_Test_Report/trust-account-usr-frontend-main_2/src/contexts/AuthContext.jsx:23) is based on stored client-side session metadata before any fresh server-side revalidation.

Conclusion:
The current frontend code posture is materially improved and reasonably secure for practical use. Remaining observations are minor browser-state hardening opportunities rather than high-risk credential-handling issues.

## 2. SCA - Software Composition Analysis

Scope:
Package and dependency review using `npm audit`.

Status: Completed

Score: 10/10

Result:

- Known package vulnerabilities found: 0
- Dependency audit status: clean at time of assessment

Conclusion:
No known dependency vulnerability was reported by the package audit at the time of validation.

## 3. DAST - Dynamic Application Security Testing

Scope:
Runtime behavior review based on active authenticated API usage and the validated `get-profile` response shared during assessment.

Status: Completed

Score: 8.5/10

Validated runtime results:

- The runtime profile API response returned `200 OK`.
- The validated response did not expose password hash, OTP, or OTP expiry values.
- Current runtime behavior aligns with the frontend's cookie-based session design.
- The reviewed application code also completed a successful production build during assessment.

Minor observations:

- The validated profile response still includes a few non-essential internal fields such as `created_by`, `deleted_at`, and `updated_at`, which can be reduced further for cleaner response hygiene.

Conclusion:
Runtime behavior is positive and improved from a practical security perspective. The current response profile is materially safer than earlier weak patterns involving sensitive auth-field exposure.

## Final Client Conclusion

The User frontend has been reviewed against code, package, and runtime validation criteria. Based on the current assessment, the application is functional, dependency review is clean, build validation is successful, and authentication handling is operating through a stronger cookie-based session model. Minor frontend-state and response-hygiene improvements are still recommended, but the current posture is suitable to be presented as positive with minor hardening recommendations.

Recommended client-facing verdict:

The User frontend is currently in a positive operational state from a cybersecurity, privacy, audit, and compliance validation perspective. The reviewed codebase shows improved session handling, clean package audit results, successful production build validation, and improved runtime profile-response hygiene. Minor hardening recommendations remain, but no major frontend security blocker was identified in the current reviewed state.

## Final Scoring

- SAST: 8/10
- SCA: 10/10
- DAST: 8.5/10
- Overall Score: 8.5/10

Overall Status: Secure and Operational
