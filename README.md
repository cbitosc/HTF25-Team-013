# Inorganic Waste & Scrap Management — Local Development

This repository contains a MERN-style monorepo with `backend/` (Express + MongoDB) and `frontend/` (Vite + React).

Quick start (recommended: use two terminals)

1. Install dependencies (once):

```powershell
# from repo root
npm install
npm --prefix .\backend install
npm --prefix .\frontend install
```

2. Start servers (open two PowerShell terminals):

Terminal A (backend):

```powershell
cd .\backend
npm run dev
# nodemon will run the backend on http://localhost:5000
```

Terminal B (frontend):

```powershell
cd .\frontend
npm run dev
# Vite will run the frontend on http://localhost:5173
```

3. Seed the database (optional, creates sample users and data):

```powershell
npm --prefix .\backend run seed
```

4. Use the app:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

Seeded test users:

- admin@example.com / password123
- citizen1@example.com / password123

Notes

- The root `npm run dev` script uses `concurrently`; PowerShell may prompt `Terminate batch job (Y/N)?` when running long-lived processes from some contexts. For a stable interactive session prefer running backend and frontend in separate terminals as shown above.
- If you prefer a single command, `npm run dev` at the repo root will attempt to start both services using `concurrently`.

If anything fails, paste the terminal output here and I'll help fix it.

# HTF25-Team-013

## GitHub submission guide

In this Readme, you will find a guide on how to fork this Repository, add files to it, and make a pull request to contribute your changes.

<details open>
<summary><h3>1. Login to your GitHub Account</h3></summary>
<br>
<p>Go to <a href="https://github.com">github.com</a> to log in.</p>
<ul>
   <li>Open the <a href="https://github.com/cbitosc/HTF25-Team-013">current repo</a> in a new tab.</li>
   <li>Perform all operations in the newly opened tab, and follow the current tab for instructions.</li>
</ul>
</details>

<details open>
<summary><h3>2. Fork the Repository</h3></summary>
<br>
<p align="center">
  <img src="fork.jpeg" alt="Fork the Repository" height="300">
</p>
<ul>
 <li>In the newly opened tab, on the top-right corner, click on <b>Fork</b>.</li>
 <li>Enter the <b>Repository Name</b> as <b>HTF25-Team-013</b>.</li>
 <li>Then click <b>Create Fork</b>, leaving all other fields as default.</li>
 <li>After a few moments, you can view your forked repo.</li>
</ul>
</details>

<details open>
<summary><h3>3. Clone your Repository</h3></summary>
<br>
<ul>
 <li>Click on <b>Code</b> and from the dropdown menu copy your <b>web URL</b> of your forked repository.</li>
 <li>Now open terminal on your local machine.</li>
 <li>Run this command to clone the repo:</li>
<pre><code>git clone https://github.com/your-username/HTF25-Team-013.git</code></pre>
</ul>
</details>

<details open>
<summary><h3>4. Adding files to the Repository</h3></summary>
<br>
<ul>
 <li>While doing it for the first time, create a new branch for your changes:</li>
<pre><code>git checkout -b branch-name</code></pre>
 <li>Add your files or make modifications to existing files.</li>
 <li>Stage your changes:</li>
<pre><code>git add .</code></pre>
 <li>Commit your changes:</li>
<pre><code>git commit -m "Descriptive commit message"</code></pre>
 <li>Push your branch to your fork:</li>
<pre><code>git push origin branch-name</code></pre>
</ul>
</details>

<details open>
<summary><h3>5. Create a Pull Request</h3></summary>
<br>
<ul>
 <li>Click on the <b>Contribute</b> button in your fork and choose <b>Open Pull Request</b>.</li>
 <li>Leave all fields as default, then click <b>Create Pull Request</b>.</li>
 <li>Wait a few moments; your PR is now submitted.</li>
</ul>
</details>

## Thanks for participating!
