# HRM Suite - Technical Documentation

## 🚀 Project Overview
**HRM Suite** is a modern, high-performance Human Resource Management dashboard built with React. It is designed to streamline HR operations, from employee onboarding and attendance tracking to payroll processing and recruitment.

---

## 🛠️ Technology Stack
The application leverages a modern frontend stack for speed, reliability, and maintainability.

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core frontend framework for building UI components. |
| **Vite** | Lightning-fast build tool and development server. |
| **Bootstrap 5** | Responsive layout and UI utility classes. |
| **Context API** | Global state management for data persistence and synchronization. |
| **Lucide React** | Premium icon set for a clean and consistent UI. |
| **Chart.js** | Interactive data visualization for KPIs and trends. |
| **React Router 7** | Client-side routing for seamless page transitions. |
| **React Hot Toast** | Non-intrusive, real-time feedback notifications. |
| **LocalStorage** | Client-side data persistence (no database connection required). |

---

## 🏗️ Architecture & State Management

### Global Context (`AppContext.jsx`)
The application uses a centralized **Context API** pattern with `useReducer` to manage the entire HR database.
- **Data Persistence**: All state changes are automatically mirrored to `localStorage`. This ensures that even after a page refresh, your data (employees, jobs, candidates, etc.) remains intact.
- **Actions**: The context provides a set of specialized functions (`addEmployee`, `deleteJob`, `markPaid`, etc.) that components can call to mutate the global state.

### File Structure
- `/src/pages`: Contains the main view components (Dashboard, Employees, etc.).
- `/src/components`: Reusable UI elements (Navbar, Sidebar, StatCards, ConfirmModal).
- `/src/context`: The engine of the app (State management logic).
- `/src/data`: Initial mock data used to seed the application.
- `/src/utils`: Helper functions for date formatting, ID generation, and exports.

---

## 📋 Core Functionality

### 1. Dashboard
- **Dynamic KPIs**: Real-time stats on employee count, active jobs, and attendance.
- **Visual Analytics**: Interactive charts showing attendance trends and department distribution.
- **Event Tracking**: Automated alerts for upcoming employee birthdays.

### 2. Employee Management
- **Full CRUD**: Create, read, update, and delete employee records.
- **Data Fields**: Manage roles, departments, salaries, contact info, and status.
- **Search & Filter**: Find employees instantly by name or department.

### 3. Attendance & Leaves
- **Mark Attendance**: Daily tracking with check-in/check-out times and status labels.
- **Leave Workflow**: Employees can apply for leave; HR can approve or reject with a single click.
- **Visual Status**: Color-coded badges for easy status identification.

### 4. Payroll System
- **Processing**: Generate monthly payroll records for individual employees.
- **Automated Math**: Calculates net pay based on basic salary, allowances, and deductions.
- **Status Tracking**: Manage "Paid" vs "Unpaid" salaries with audit timestamps.

### 5. Recruitment Pipeline
- **Job Management**: Create and manage job openings with status toggling.
- **Candidate Pipeline**: Track candidates through stages (Applied → Shortlisted → Interview → Hired).
- **Hiring Automation**: The "Hire" button automatically moves a candidate into the Employee database.

### 6. Performance & Training
- **Reviews**: Quarterly or annual performance evaluations with scoring and comments.
- **Training Programs**: Create and track upskilling programs and participant enrollment.

---

## 🛡️ Custom Features

### Premium Confirmation System
Replaced standard browser `window.confirm` alerts with a custom **ConfirmModal**. This provides:
- Consistent aesthetics with the dashboard.
- Clearer action intent (Danger vs Success types).
- Better user experience without intrusive popups.

### Sidebar Dynamics
- **Collapsible Layout**: Sidebar can be collapsed to increase workspace.
- **Smart Icons**: In the collapsed state, icons remain visible and functional, while labels are hidden.
- **Mobile Responsive**: Includes a slide-in drawer for mobile and tablet views.

---

## 📦 API Usage (Internal)
The application currently operates on an **Internal Mock API** via the `AppContext`.

| Function | Description |
| :--- | :--- |
| `addEmployee(data)` | Adds a new employee and generates a unique ID. |
| `hireCandidate(id, job, dept)` | Converts a candidate record into an employee record. |
| `confirmAction(config)` | Triggers the global confirmation modal. |
| `markPaid(id)` | Updates a payroll record status to "Paid". |
| `toggleJobStatus(id)` | Switches a job between "Open" and "Closed". |

---

## 🚀 Getting Started
1. **Install Dependencies**: `npm install`
2. **Run Development Server**: `npm run dev`
3. **Build for Production**: `npm run build`
