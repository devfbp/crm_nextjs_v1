This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
## Database & Migrations (Prisma)

This project uses **Prisma** as an ORM. We follow a migration-based workflow to keep the database schema in sync across environments.

### Workflow: Adding or Updating Fields

1.  **Modify the Schema**: Edit `prisma/schema.prisma` to add or update your models/fields.
2.  **Create & Apply Migration**: Run the following command to generate the SQL and update your local database:
    ```bash
    npx prisma migrate dev --name <describe_your_change>
    ```
3.  **Generate Client**: (Usually happens automatically with the command above) To manually regenerate the Prisma Client:
    ```bash
    npx prisma generate
    ```

### Essential Commands

| Command | Description |
| :--- | :--- |
| `npx prisma db pull` | pulls schema from database and updates schema.prisma |
| `npx prisma migrate dev --name init --create-only` | Create a baseline migration |
| `npx prisma migrate resolve --applied <migration_folder_name>` | Mark it as already applied. |
| `npx prisma migrate dev --name add-feature` | Create/apply migrations in development (tracks history). |
| `npx prisma migrate status` | Check if your database schema is up to date. |
| `npx prisma migrate deploy` | Apply pending migrations in production environments. |
| `npx prisma migrate reset` | Reset database and apply all migrations |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma studio` | Open a visual editor for your database data. |
| `npx prisma format` | format the prisma schema. |
| `npx prisma db seed` | run seed file. |

> [!WARNING]
> **Do not use `npx prisma db push`** for schema changes. This ignores migration history and can lead to inconsistencies. Always use `migrate dev`.

---
