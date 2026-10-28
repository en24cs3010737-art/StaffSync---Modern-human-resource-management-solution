# REST API Contract (planned; Phase 1)

Base path: `/api/v1`. All request and response bodies use JSON unless the route is a CSV export. All collection endpoints use bounded pagination (`page`, `limit`) with a maximum limit of 100. Search/filter parameters are allow-listed; clients cannot submit arbitrary database query operators or model fields.

## Envelope conventions

- Success: `{ "success": true, "data": <payload>, "meta": <optional paging metadata> }`
- Error: `{ "success": false, "error": { "code": "...", "message": "...", "details": [] }, "requestId": "..." }`
- Authentication failures: `401`; authenticated but unauthorized: `403`; missing resource: `404`; validation/conflict: `400` or `409` consistently documented by endpoint; unexpected errors: `500` with safe text.
- Data is serialized with identifiers and ISO 8601 timestamps. `passwordHash`, raw tokens and internal secrets are never serialized.

## Endpoint inventory

| Group | Method | Path | Intended access |
|---|---|---|---|
| Auth | POST | `/auth/login` | Public, rate-limited |
| Auth | POST | `/auth/logout` | Authenticated / refresh-session cookie |
| Auth | GET | `/auth/me` | Authenticated |
| Auth | POST | `/auth/refresh` | Valid refresh cookie, origin/CSRF protection |
| Auth | POST | `/auth/change-password` | Authenticated current user |
| Employees | GET | `/employees` | HR org; Manager team/limited; otherwise constrained policy |
| Employees | POST | `/employees` | HR |
| Employees | GET | `/employees/:id` | HR, assigned manager with field projection, or own record |
| Employees | PATCH | `/employees/:id` | HR for employment fields; own user for allow-listed profile fields |
| Employees | PATCH | `/employees/:id/status` | HR |
| Employees | GET | `/employees/me` | Authenticated linked employee |
| Attendance | POST | `/attendance/check-in` | Authenticated linked employee |
| Attendance | PATCH | `/attendance/check-out` | Authenticated linked employee |
| Attendance | GET | `/attendance/me` | Own records |
| Attendance | GET | `/attendance/team` | Manager team or HR |
| Attendance | GET | `/attendance` | HR organization scope |
| Attendance | GET | `/attendance/summary` | Scope-limited HR/Manager/Employee summary |
| Leaves | POST | `/leaves` | Authenticated linked employee |
| Leaves | GET | `/leaves/me` | Own requests |
| Leaves | GET | `/leaves` | HR org; Manager team only |
| Leaves | GET | `/leaves/:id` | Request owner, authorized manager reviewer or HR |
| Leaves | PATCH | `/leaves/:id/cancel` | Owner, eligible pending request only |
| Leaves | PATCH | `/leaves/:id/review` | HR or assigned manager; pending request only |
| Announcements | GET | `/announcements` | Published audience scope; HR may access drafts by policy |
| Announcements | POST | `/announcements` | HR |
| Announcements | GET | `/announcements/:id` | Audience scope or HR |
| Announcements | PATCH | `/announcements/:id` | HR |
| Announcements | DELETE | `/announcements/:id` | HR only, with safe archive/delete policy |
| Trainings | GET | `/trainings` | Audience/scope-limited; HR can view organization scope |
| Trainings | POST | `/trainings` | HR; Manager limited to team programs |
| Trainings | GET | `/trainings/:id` | Authorized audience/scope |
| Trainings | PATCH | `/trainings/:id` | HR; Manager only where team-owned/authorized |
| Trainings | POST | `/trainings/:id/enroll` | Employee self-enrollment or authorized assignment |
| Trainings | PATCH | `/trainings/:id/completion` | HR or assigned manager for authorized participant |
| Notifications | GET | `/notifications` | Own recipient scope |
| Notifications | PATCH | `/notifications/:id/read` | Own recipient scope |
| Notifications | PATCH | `/notifications/read-all` | Own recipient scope |
| Reports | GET | `/reports/attendance` | HR; scoped team/personal variants as policy permits |
| Reports | GET | `/reports/leaves` | HR; scoped team/personal variants as policy permits |
| Reports | GET | `/reports/employees` | HR |
| Reports | GET | `/reports/export.csv` | HR; report filters and same scope enforced server-side |
| Health | GET | `/health` | Public, minimal readiness response |

The employee directory, attendance and leave paths above are an inventory, not evidence that feature endpoints have been implemented in Phase 1. Implementations must keep route names and role scope consistent with this contract. The phase-one skeleton implements only `/health`.

## Shared query conventions

- Pagination: `page=1&limit=20`; positive integers only, `limit` clamped/rejected above 100 according to the common validator.
- Dates: `from` and `to` are ISO 8601 dates/timestamps; reject invalid dates and `from > to`.
- Sort: an allow-listed field and direction only; do not pass untrusted strings directly into database sort objects.
- Search: trimmed, length-bounded text; escape search patterns when using regular expressions.
- Departments, status, role, leave type and announcement category must use server-defined allow-lists.
