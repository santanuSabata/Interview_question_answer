# CB Academy – Interview Question App

> **LEARN. ANALYZE. SUCCEED.**

A professional frontend interview preparation and assessment web application built with **React.js** and **Vite**. All questions are dynamically fetched from a single source of truth (`public/questions.json`) without any external backend, database, or API dependencies.

---

## Key Features

1. **Pure Frontend Architecture**:
   - Zero external databases or backend APIs required.
   - Dynamic JSON question fetching using `fetch('/questions.json')`.
   - Client-side evaluation and scoring logic.

2. **Supported Question Formats**:
   - **Single Select (`single_select`)**: Radio options with single answer evaluation.
   - **Multiple Select (`multiple_select`)**: Checkbox options with exact multi-choice validation.
   - **Descriptive / Text (`text`)**: Interactive textarea responses marked for review with model answers provided upon completion.

3. **Interactive Test-Taking Experience**:
   - **Customizable Interview Session**: Filter by category (SQL, JavaScript, React, Python, Excel, Power BI, WordPress) and difficulty (Beginner, Intermediate, Advanced).
   - **Random Question Shuffling**: Fisher-Yates randomization.
   - **Configurable Countdown Timer**: 10, 15, 20, 30 (default), 45 minutes or untimed practice, with a warning notification when under 5 minutes remain and automated submission at 00:00.
   - **Dynamic Progress Bar**: Live percentage and question progress indicators.
   - **Question Palette & Navigation**: Color-coded states (Grey: Unanswered, Green: Answered, Amber: Marked for Review, Blue: Current Active Question).
   - **Mark for Review**: Flag questions to revisit before final submission.
   - **Submission Confirmation**: Summary modal detailing answered, unanswered, and flagged questions.

4. **In-Depth Results & Answer Review**:
   - Total Questions, Attempted, Skipped, Correct, Wrong, and Needs Review metrics.
   - Total marks obtained, percentage accuracy, and time spent.
   - Detailed side-by-side comparison between submitted answers and expected answers with rich technical explanations.
   - Filter review questions by status (`All`, `Correct`, `Wrong`, `Needs Review`, `Skipped`) and category.
   - Print / Save as PDF support.
   - One-click [Retry Interview] to practice again.

---

## Adding New Questions to `public/questions.json`

To add, edit, or remove questions, edit `public/questions.json`. The React application will automatically load the changes without altering any React code.

### 1. Single Select Example
```json
{
  "id": 101,
  "question": "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
  "type": "single_select",
  "options": [
    "O(1)",
    "O(log n)",
    "O(n)",
    "O(n log n)"
  ],
  "answer": [
    "O(log n)"
  ],
  "explanation": "Searching in a balanced BST splits the search space in half at each node step, yielding O(log n) time complexity.",
  "category": "Data Structures",
  "difficulty": "Intermediate",
  "marks": 1
}
```

### 2. Multiple Select Example
```json
{
  "id": 102,
  "question": "Which of the following are valid HTTP methods?",
  "type": "multiple_select",
  "options": [
    "GET",
    "POST",
    "FETCH",
    "DELETE"
  ],
  "answer": [
    "GET",
    "POST",
    "DELETE"
  ],
  "explanation": "GET, POST, and DELETE are official standard HTTP request methods. FETCH is a browser Web API, not an HTTP method verb.",
  "category": "Web Fundamentals",
  "difficulty": "Beginner",
  "marks": 2
}
```

### 3. Descriptive / Text Example
```json
{
  "id": 103,
  "question": "What is a Pivot Table in Excel?",
  "type": "text",
  "answer": [
    "A Pivot Table is an interactive tool used to summarize, organize, and calculate large datasets into structured reporting formats."
  ],
  "explanation": "Pivot Tables allow dragging fields into rows, columns, filters, and values to aggregate metrics effortlessly.",
  "category": "Excel",
  "difficulty": "Beginner",
  "marks": 2
}
```

---

## Setup & Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# 1. Clone repository & install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build
```

---

## Project Structure

```
├── public/
│   └── questions.json            # Single source of truth for questions data
├── src/
│   ├── components/
│   │   ├── ConfirmSubmitModal.tsx # Submission confirmation modal
│   │   ├── ErrorDisplay.tsx       # Error screen with retry action
│   │   ├── Header.tsx             # CB Academy branding header
│   │   ├── Loading.tsx            # Animated loading state
│   │   ├── ProgressBar.tsx        # Dynamic progress tracker
│   │   ├── QuestionCard.tsx       # Multi-type question rendering card
│   │   ├── QuestionNavigation.tsx # Color-coded question palette
│   │   ├── ResultCard.tsx         # Score metrics and performance grade
│   │   └── Timer.tsx              # Countdown timer with warning states
│   ├── pages/
│   │   ├── Home.tsx               # Landing dashboard & session setup
│   │   ├── Interview.tsx          # Active assessment layout
│   │   └── Result.tsx             # Comprehensive result & answer review
│   ├── services/
│   │   └── questionService.ts     # Data loading & filtering service
│   ├── utils/
│   │   ├── calculateResult.ts     # Evaluation & scoring algorithm
│   │   └── shuffleQuestions.ts    # Fisher-Yates shuffle
│   ├── types.ts                   # TypeScript interfaces & types
│   ├── App.tsx                    # Root application component
│   ├── main.tsx                   # React DOM root entry
│   └── index.css                  # Tailwind styles
├── metadata.json
├── package.json
└── vite.config.ts
```
