# -AI-Safety-Incident-Dashboard
Goal: To assess your fundamental frontend development skills, including UI creation, user interaction, state management, and handling user input, by building a simple interactive interface relevant to HumanChain's mission in AI safety.


How to Run the Project Locally

Clone or Download this project to your local system.


Make sure you have Node.js and TypeScript installed.


To install TypeScript globally (if not already installed):


bash

npm install -g typescript

Navigate to the project folder:

bash

cd your-project-folder-name

Compile the TypeScript file (app.ts) to JavaScript:

bash

tsc app.ts

This will generate an app.js file.

Open the index.html file directly in your browser (Chrome, Edge, Firefox, etc.).

No need to run a server for basic testing (optional: you can use Live Server extension in VSCode for auto-reload).

🛠 Language/Framework Choice

Language: HTML + CSS + TypeScript (compiled into JavaScript)

No heavy frameworks (like React/Angular) were used, only Vanilla TypeScript for simplicity.

Layout: Responsive using Flexbox and simple CSS Grid where needed.

🧠 Design Decisions and Challenges

Simple, responsive layout: Used Flexbox to ensure the dashboard looks good on desktop and mobile devices.

State management: Kept the list of incidents in a local array and updated it dynamically upon user actions (filter, sort, add new incident).

Form Validation: Basic form validation ensures no empty incident title or description is submitted.

Expandable Descriptions: Each incident's description is hidden by default and can be toggled individually.

Scalability Consideration: Although basic now, the code structure allows easy extension (e.g., connecting to a real backend later).

📂 Project Structure

/your-project-folder

├── index.html

├── app.ts

├── app.js (auto-generated after compiling app.ts)

├── styles.css

└── README.md 

🎯 Final Note

This project is meant to demonstrate clean front-end component building

with basic TypeScript usage, responsive design, and interactive UI behavior without external libraries.
