# **Lab 9 – The Final Battle: Lit MVC Todo App + E2E + CI/CD**

## **Project Overview**

This lab represents the culmination of the semester’s progression through component-based web architecture and testing.  
Building upon earlier labs, this project implements a **Todo List Application** using the **Lit framework** with a clear **Model–View–Controller (MVC)** design pattern.

The app supports **CRUD operations**, **persistent storage**, and **due dates**, while integrating **unit tests (Vitest)**, **end-to-end tests (Playwright)**, and a **CI/CD pipeline (GitHub Actions)** — simulating a full professional workflow.

---

## **Repository Structure**
`
lab9-the-final-warmup/
├── src/
│ ├── controller/
│ │ └── todo-app.js # Main Lit app component (controller)
│ ├── model/
│ │ ├── todo-model.js # Handles data, logic, and persistence
│ │ └── storage-service.js # LocalStorage abstraction
│ ├── view/
│ │ ├── todo-form.js # Input form (includes due date picker)
│ │ ├── todo-item.js # Single todo item (edit, delete, complete)
│ │ └── todo-list.js # Renders all todos
│ ├── index.html # Entry point
│ └── styles.css # Global styles (if applicable)
│
├── tests/
│ ├── unitTest/
│ │ ├── setup.js
│ │ ├── todo-item.test.js
│ │ ├── todo-app.test.js
│ │ ├── todo-list.test.js
│ │ ├── todo-form.test.js
│ │ └── todo-model.test.js
│ ├── e2eTesting/
│ │ └── todo-app.spec.js # Playwright E2E tests
│
├── .github/
│ ├── workflows/
│ │ └── ci.yml
│
├── .eslintrc.json
├── jsdoc.conf.json
├── package.json
├── playwright.config.js
├── vite.config.js
├── LICENSE
└── README.md
`
## 🧱 Changes & Improvements

### 1. Repository Structure Overhaul
**Before:**  
All files were in a single `/src` folder with unclear separation between view, controller, and model logic.

**After:**
- Split into distinct directories:
    - `controller/` → main app logic
    - `tests/` → divided into `unitTest/` and `e2eTesting/`
    - `.github/workflows/` → CI configuration
- Improved maintainability and scalability for large projects.

---

### 2. Added Due Date Feature
**Enhancement:**  
Todos can now include a due date chosen from a date picker.

**Implementation Details:**
- Added `<input type="date">` to `todo-form.js`
- Passed `dueDate` through custom `add-todo` event
- Displayed it in `todo-item.js` under each task
- Styled `.due-date` text with smaller font and color emphasis

**Result:**  
Improved usability and task prioritization with visual deadlines.

---

### 3. Converted All CSS Units from px → rem
**Why:**  
To ensure better accessibility, scaling, and responsiveness across devices.

**Examples:**
- `padding: 10px;` → `padding: 0.625rem;`
- `font-size: 16px;` → `font-size: 1rem;`

**Impact:**  
Consistent sizing that respects browser zoom levels and user preferences.

### 4. Added unit and E2E testing 
**Enhancement:** 
To ensure all code runs as expected and works from start to finish

### 5. Added scripts and tests to workflow for ease of use 

### 6. UI enhancement got rid of twitchy UI

### 7. Code documentation and JSDoc Integration 
- added detailed JSDoc comments to all core files
- Generated structured API documentation with jsdoc.conf.json
- Improved code readability and maintainability

## Challenges encountered
### 1. Shadow DOM Visibility Issues in Testing
E2E tests initially failed because elements inside the Lit Shadow DOM couldn’t be selected.
Fix: Updated Playwright selectors with the >>> deep combinator to correctly locate nested elements.

### 2. Due Date Integration Logic
Adding due dates required refactoring event handling in both the form and item components.
Fix: Propagated the dueDate value through custom events and ensured it persisted in the controller’s data model.

### 3. npm Scripts and Vite Config Confusion
After removing the "root" line from vite.config.js, npm run dev stopped working.
Fix: Restored the correct relative paths and verified Vite’s root configuration matched project structure.

## Setup 
### Prerequisites
Before running the project, make sure you have:
- Node.js
- npm
- Git

1. Install Dependencies: npm install
2. Deploy: npm run dev 
3. Run Unit Tests: npm run test:unit
4. Run E2E tests: npm run test:e2e
5. if first time using: npx playwright install 

## Live Demo Link:
https://f51c4f48.lab9-the-final-warmup.pages.dev/

## Author 
-Joe Haynes 