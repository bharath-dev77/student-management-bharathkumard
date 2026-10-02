# Student Management System

## Project Name
**Student Management System (SMS) - Frontend Prototype**

## Student Name
**Bharathkumar D**

## Technology Used
- **Languages:** HTML5, CSS3, JavaScript (ES6+)
- **Alternative Framework (included):** React.js (Vite)
- **Data:** JSON Dummy Data (`data/students.json`)
- **Styling:** Custom Responsive CSS (Flexbox & CSS Grid)

---

## Features Implemented

### 1. Dashboard Overview
- **Total Students Count:** Live indicator of current enrollments.
- **Department-wise Student Count:** Breakdown of students across IT, CSE, ECE, and MECH.
- **Year/Semester-wise Summary:** Distribution across Year I, II, III, and IV.

### 2. Student List Directory
- Displays student records with columns: **Register Number, Student Name, Department, Year/Semester, Email, Phone Number, and Actions**.
- Status tags color-coded by department.
- Empty-state message displayed when no records match.

### 3. Add Student Form & Validation
- Form fields: Register Number, Name, Email, Phone Number, Department, Year, and Semester.
- **Robust Validation:**
  - Mandatory fields check (prevents empty submissions).
  - Valid email format (regex check).
  - Valid phone number (strictly 10 digits).
  - Duplicate Register Number detection (prevents registering existing IDs).
  - Automatic semester synchronization based on selected year.
  - Meaningful inline error messages.

### 4. Student Management Functionalities
- **Add Student:** Appends newly validated student to active state.
- **Edit Student:** Interactive popup modal pre-filled with student information for updates.
- **Delete Student:** Deletes record only after showing a clear confirmation modal dialog.
- **Live Search:** Instant filtering by Register Number or Student Name.
- **Dropdown Filters:** Filter by Department and Year/Semester simultaneously.

### 5. Additional Challenge (Bonus)
- **Student Sorting:** Interactive column headers to sort by:
  - Student Name (Ascending / Descending)
  - Register Number (Ascending / Descending)

### 6. UI & Responsive Design
- Clean sidebar navigation: **Dashboard**, **Student List**, **Add Student**.
- Responsive layout supporting Desktop, Tablet, and Mobile.
- User-friendly toast notifications on record operations.

---

## How to Run the Application

### Option A: Standalone Instant Run (Zero Setup - Recommended)
1. Double-click `index.html` (or right-click -> Open with Google Chrome / Microsoft Edge).
2. The complete application runs instantly with all features, validation, modals, and search.

### Option B: Running via React (Vite)
1. Copy `src/App.jsx` and `src/App.css` into your React project.
2. Ensure dependencies are installed:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

---

## GitHub Submission Instructions
To push to your GitHub repository `student-management-bharathkumar`:
```bash
git init
git add .
git commit -m "Initial commit: Student Management System Frontend Assessment"
git branch -M main
git remote add origin https://github.com/<your-username>/student-management-bharathkumar.git
git push -u origin main
```
