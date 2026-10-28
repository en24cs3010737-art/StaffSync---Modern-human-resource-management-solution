# StaffSync Feature Specification

## Product goal

Provide one secure HR workspace for employee administration, attendance, leave requests, internal communication, training participation, notifications and reports. The product has three primary roles: HR Administrator (`HR`), Manager (`MANAGER`) and Employee (`EMPLOYEE`).

## Scope and acceptance criteria

### Public and account access
- Landing, login, unauthorized and not-found routes are available.
- Only provisioned accounts can log in; elevated accounts cannot be self-registered.
- Logout revokes the refresh session; disabled accounts are rejected.
- Authentication is restored after reload through the documented refresh-cookie flow.

### Employee directory and profiles
- HR can create, view, update and deactivate employee records and manage manager assignments.
- Employee data supports normalized email/employee ID uniqueness, bounded pagination, sorting, filtering and search.
- A user can edit only explicitly permitted personal fields; employment status, role and manager assignments require authorized administration.
- Address and emergency contacts are restricted to authorized HR and the employee themself unless a documented policy states otherwise.

### Attendance
- An employee can check in once per configured work date and check out only after a valid check-in.
- Duplicate daily entries and checkout-before-checkin are rejected server-side, including under concurrent requests.
- Personal, team and organization attendance views enforce scope, date filters and pagination.
- Weekend, holiday, approved leave and time-zone behavior must follow a documented business policy; no unconfigured policy is assumed.

### Leave management
- A leave request has a validated type, date range, reason, calculated number of days and status history.
- Start date cannot be later than end date; overlapping pending/approved requests are rejected.
- Employees see and may cancel eligible pending requests only for themselves.
- Managers review only their assigned team's requests; HR reviews the organization scope permitted by policy.
- Approve/reject actions require a valid reviewer and preserve review comment/time/actor.

### Announcements
- HR can create, edit, publish and archive announcements with audience, priority, publish date and optional expiry.
- Viewers only receive announcements that are published, in-date and targeted to their role/team.

### Training
- HR manages organization-wide programs. Managers manage only their team programs/participants.
- Enrollment checks audience, schedule, capacity and duplicate enrollment atomically.
- Completion is set only by authorized personnel, never by an employee for themself.

### Notifications
- Users can list, mark one notification read and mark all their notifications read.
- Leave decision, publication and training workflow events generate notifications for the relevant audience.
- Notification APIs are strictly scoped to the authenticated recipient.

### Reports and analytics
- Dashboards display values derived from stored records and clearly show empty states for an empty database.
- HR reports support date ranges, department, employee and status filters where relevant.
- Team reporting exposes only manager-authorized information; employees receive only personal reports.
- CSV export escapes fields safely and enforces the same authorization/filter rules as the corresponding report.

## Non-functional requirements

- Responsive desktop/tablet/mobile layouts and accessible labels, contrast and keyboard navigation.
- Centralized error envelopes; no stack traces or sensitive internals in production responses.
- Password hashes only, strict request validation, explicit CORS, security headers, rate limits and bounded request/query inputs.
- Indexed fields for normalized email, employee ID, attendance `(employee, workDate)`, leave employee/status/dates and notification `(recipient, createdAt)`.
- Loading, error, empty and success states on relevant UI surfaces.
- Seed data is development-only, idempotent and never destructive in production.
- Tests prove the critical access-control boundaries and workflows before a task is marked complete.

## Explicitly out of scope until added by a documented decision

Payroll calculations, biometric integration, time-clock hardware, external SSO, applicant tracking, employee self-registration as a manager or HR administrator, leave accrual/carry-over policy without a defined rule, and production deployment automation that has not been executed and verified.
