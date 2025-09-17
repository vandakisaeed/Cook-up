# Recipe Center

Recipe Center is a full-stack web application for discovering and sharing recipes from around the world.  
It is built with **Next.js**, **TypeScript**, **Prisma**, and **Neon (PostgreSQL)** to provide a fast, modern, and scalable platform for cooking enthusiasts.

---

## Features

- **Recipe Search**  
  Find recipes by name, tags, or cuisine.

- **User Accounts**  
  Register, log in, and manage your own profile.

- **Add Recipes**  
  Logged-in users can create new recipes with detailed information.

- **Delete Recipes & Profiles**  
  Users can delete their own recipes or their entire account.

---

## Tech Stack

| Technology                                    | Purpose                                  |
| --------------------------------------------- | ---------------------------------------- |
| [Next.js](https://nextjs.org/)                | Full-stack React framework               |
| [TypeScript](https://www.typescriptlang.org/) | Strong typing and better maintainability |
| [Prisma](https://www.prisma.io/)              | ORM for database access                  |
| [Neon](https://neon.tech/)                    | Cloud PostgreSQL database                |
| [Tailwind CSS](https://tailwindcss.com/)      | Modern utility-first styling             |

---

## Getting Started

### 1️⃣ Clone the Repository

```bash
git clone git@github.com:vandakisaeed/Cook-up.git
cd recipe-center

2️⃣ Install Dependencies

npm install

3️⃣ Environment Variables

Create a .env file in the root directory and add:

DATABASE_URL=  postgresql://neondb_owner:npg_bu3WINKUVP9n@ep-divine-cloud-a9a8kcqc-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require

4️⃣ Run Database Migrations

npx prisma migrate dev

5️⃣ Start the Development Server

npm run dev

Your app will be available at http://localhost:3000.

⸻

 Project Structure

src/
 ├─ app/        # Next.js App router (pages & API routes)
 ├─ components/ # Reusable React components
 ├─ lib/        # Utility functions & Prisma client
 └─ styles/     # Global styles


⸻

 Deployment

Recipe Center can be easily deployed to Vercel (recommended for Next.js) or any Node.js-compatible hosting service.
The Neon PostgreSQL database remains in the cloud and connects through the DATABASE_URL environment variable.

⸻

 Contributing
	1.	Fork the repository.
	2.	Create a feature branch: git checkout -b feature/your-feature.
	3.	Commit your changes: git commit -m "Add new feature".
	4.	Push to your branch: git push origin feature/your-feature.
	5.	Open a Pull Request.



Recipe Center – Find, share, and create recipes from all over the world!
```
