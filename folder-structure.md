# Project Folder Structure

The following is the target structure for the complete application. `.gitkeep` files mark folders reserved for later phases; they do not indicate that their feature logic exists yet.

```text
staffsync/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── app/                         # store setup and application providers
│   │   ├── components/
│   │   │   ├── common/                  # alerts, empty states, loaders, toasts
│   │   │   ├── layout/                  # sidebar, topbar, breadcrumbs
│   │   │   ├── forms/
│   │   │   ├── tables/
│   │   │   └── charts/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── employees/
│   │   │   ├── attendance/
│   │   │   ├── leaves/
│   │   │   ├── announcements/
│   │   │   ├── trainings/
│   │   │   ├── notifications/
│   │   │   └── reports/
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   ├── employee/
│   │   │   ├── manager/
│   │   │   └── hr/
│   │   ├── routes/
│   │   ├── services/                    # Axios client and endpoint modules
│   │   ├── store/slices/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/                      # environment and database settings
│   │   ├── controllers/                 # HTTP adapters
│   │   ├── middleware/                  # auth, authorization, validation, errors
│   │   ├── models/                      # Mongoose schemas and indexes
│   │   ├── routes/                      # versioned route composition
│   │   ├── services/                    # business rules and transactions
│   │   ├── validators/                  # Zod request schemas
│   │   ├── utils/                       # date, CSV, response helpers
│   │   ├── scripts/seed.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   ├── .env.example
│   └── package.json
├── docs/
│   ├── architecture.md
│   ├── api-contract.md
│   ├── feature-spec.md
│   ├── folder-structure.md
│   ├── implementation-plan.md
│   └── permissions.md
├── .editorconfig
├── .gitignore
├── .nvmrc
├── LICENSE
├── package.json
└── README.md
```

## Dependency boundaries

- React pages/components call feature service functions, not raw URLs sprinkled through UI files.
- Redux stores cross-page state such as authentication and notification counts. Server-owned data remains fetched and refreshed through API services.
- Express routes map URLs/middleware to controllers. Controllers validate/normalize request context and delegate business rules to services.
- Services enforce workflow invariants and use Mongoose models/repositories. Authorization must be applied before returning sensitive records.
- Models own schema-level validation and indexes; validators own request-shape validation. Both are needed.
- `config/` is the only place that reads and validates runtime environment configuration.
