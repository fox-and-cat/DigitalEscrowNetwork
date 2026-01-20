# Project Structure

```
DigitalEscrowNetwork/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # CI/CD pipeline
│   │   └── release.yml            # Release automation
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md          # Bug report template
│   │   ├── feature_request.md     # Feature request template
│   │   ├── documentation.md       # Documentation improvement template
│   │   └── question.md            # Question template
│   ├── pull_request_template.md   # PR template
│   ├── FUNDING.yml                # Sponsorship info
│   └── repo.json                  # Repository metadata
├── src/
│   ├── index.ts                   # Application entry point
│   ├── bot/
│   │   ├── index.ts               # Bot initialization
│   │   ├── context.ts             # Extended bot context
│   │   ├── conversations/
│   │   │   └── createDeal.ts      # Deal creation conversation
│   │   ├── handlers/
│   │   │   ├── commands.ts        # Command handlers
│   │   │   ├── dealResponse.ts    # Deal response handlers
│   │   │   ├── menu.ts            # Menu handlers
│   │   │   └── start.ts           # Start command handler
│   │   ├── keyboards/
│   │   │   ├── deal.ts            # Deal keyboards
│   │   │   └── inline.ts          # Inline keyboards
│   │   └── middleware/
│   │       └── logger.ts          # Logging middleware
│   ├── config/
│   │   ├── constants.ts           # Application constants
│   │   └── index.ts               # Config entry point
│   ├── db/
│   │   ├── index.ts               # Database initialization
│   │   ├── models/
│   │   │   ├── deal.ts            # Deal model
│   │   │   └── user.ts            # User model
│   │   └── repositories/
│   │       ├── inMemoryDealRepository.ts
│   │       ├── inMemoryUserRepository.ts
│   │       └── userRepository.ts
│   ├── services/
│   │   └── dealService.ts         # Business logic for deals
│   └── utils/
│       └── validators.ts          # Validation utilities
├── .editorconfig                  # Editor configuration
├── .eslintrc.json                 # ESLint configuration
├── .env.example                   # Environment variables example
├── .gitignore                     # Git ignore rules
├── .gitattributes                 # Git attributes
├── .npmrc                         # npm configuration
├── .dockerignore                  # Docker ignore rules
├── Dockerfile                     # Docker image definition
├── docker-compose.yml             # Docker Compose configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Locked dependencies
├── README.md                      # Project README
├── CONTRIBUTING.md                # Contribution guidelines
├── DEPLOYMENT.md                  # Deployment guide
├── SECURITY.md                    # Security policy
├── CODE_OF_CONDUCT.md             # Community guidelines
├── CHANGELOG.md                   # Version history
└── LICENSE                        # MIT License
```

## Key Files

### Configuration Files
- **tsconfig.json** - TypeScript compiler options
- **package.json** - Project dependencies and build scripts
- **.eslintrc.json** - Linting rules
- **.editorconfig** - Editor settings
- **.env.example** - Environment variables template

### Documentation Files
- **README.md** - Main project documentation
- **CONTRIBUTING.md** - Guidelines for contributors
- **DEPLOYMENT.md** - How to deploy the project
- **SECURITY.md** - Security reporting and best practices
- **CODE_OF_CONDUCT.md** - Community standards
- **CHANGELOG.md** - Release notes and version history

### Docker Files
- **Dockerfile** - Container image definition
- **docker-compose.yml** - Multi-container setup
- **.dockerignore** - Files to exclude from Docker image

### GitHub Files
- **.github/workflows/** - GitHub Actions CI/CD pipelines
- **.github/ISSUE_TEMPLATE/** - Issue templates
- **.github/pull_request_template.md** - PR template
- **.github/FUNDING.yml** - Sponsorship information
