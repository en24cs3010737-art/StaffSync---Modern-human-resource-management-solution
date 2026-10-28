# Role and Permission Matrix

**Legend:** `Manage` = create/update/deactivate within authorized scope; `Review` = approve/reject with a recorded decision; `Own` = current user's own data; `Team` = employees assigned to the manager; `Org` = organization-wide; `—` = no permission by default.

| Resource / action | HR | Manager | Employee |
|---|---|---|---|
| Provision HR/Manager/Employee accounts | Manage | — | — |
| Change roles / deactivate accounts | Manage, audited | — | — |
| Read employee directory | Org | Team, limited fields | Own profile and permitted directory fields only if enabled by policy |
| Edit employee employment details | Manage | — | — |
| Edit own permitted profile fields | Own | Own | Own |
| Read address / emergency contact | HR-authorized, audited | — by default | Own only |
| Check in / check out | Own account only if linked to an employee record | Own account only if linked to an employee record | Own |
| View attendance records | Org | Team | Own |
| Apply for leave | Own if linked to employee | Own if linked to employee | Own |
| View / cancel own pending leave | Own | Own | Own |
| Review leave requests | Org policy scope | Assigned Team only | — |
| Publish / edit / archive announcements | Manage | — | — |
| Read announcements | Org, including drafts as authorized | Published announcements targeted to role/team | Published announcements targeted to role/team |
| Create organization-wide training | Manage | — | — |
| Manage training for a team | Org | Team only | — |
| View / enroll in training | Org | Available / assigned programs | Available / assigned programs; only own enrollment |
| Mark training completion | Authorized HR role | Team participants only | — (cannot self-certify) |
| Read / mark notifications | Own recipient scope | Own recipient scope | Own recipient scope |
| Organization-wide reports / CSV | Org | — | — |
| Team attendance/performance summaries | Org | Team, aggregate/permitted fields | — |
| Personal attendance and leave reports | Org | Own | Own |
| View audit logs | Read-only, authorized HR permission | — | — |
| Organization settings / holiday policy | Manage | — | — |

## Mandatory enforcement rules

1. Apply deny-by-default authorization at the API. Frontend route guards and hidden controls are only usability features.
2. The authenticated user ID and role come from verified server-side authentication state, never from request body fields.
3. Employee endpoints constrain reads and writes by the linked employee identity. A submitted employee ID must not override that scope.
4. Manager scope is computed from the manager-to-employee assignment in the database and is checked on every read and mutation. A manager cannot review another manager's team.
5. HR privileges are granted only by an already-authorized HR administrator or controlled provisioning process; no public HR/Manager registration.
6. Manager and employee responses exclude sensitive fields by projection/serialization, not merely by hiding them in the UI.
7. Leave decisions and sensitive administrative actions record the actor, timestamp and decision. Review comments are validated and visible only to permitted users.
8. Training completion is recorded by authorized HR or the participant's manager, with actor and completion timestamp; participants cannot submit their own completion status.
9. Deactivation should preserve historical records. Do not expose unrestricted account or employee deletion.
10. Any future policy exception must update this matrix, validators, API tests and documentation together.
