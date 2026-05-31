# Internshala Internship Portal Clone

A premium, highly interactive, and responsive web application replicating the core user experience of Internshala's Internship Search and Filtering Portal. Built with a modern aesthetic, fluid micro-interactions, robust multivariable state management, and strict TypeScript compilation.

---

## 🚀 Key Features

*   **🔍 Multi-Field Global Search**: Instantly query across internship titles, profile categories, company names, and specific locations.
*   **⚙️ Advanced Multivariable Filters**:
    *   **Profile Filter**: Match specific internship domains.
    *   **Location / Work From Home**: Dedicated toggle and search filter for remote or physical locations.
    *   **Duration Cap**: Easily filter out internships exceeding your preferred duration (e.g. 1 Month, 3 Months, 6 Months).
    *   **Minimum Stipend Threshold**: Fine-tune listings based on minimum monthly compensation using live numerical filtering.
*   **⚡ Dynamic Sorting Options**:
    *   **Newest**: Sorts by the latest creation timestamp (`postedOnDateTime`).
    *   **Highest Stipend**: Ranks opportunities based on maximum starting salary.
    *   **Shortest Duration**: Displays shorter engagements first.
*   **📱 Responsive Mobile-First Design**: Optimized layouts for both desktop sidebars and responsive slide-out mobile filters.
*   **🦾 Strict TypeScript Typing**: Zero-strictness bypasses; full interface guarantees for internship models, filters, context types, and custom hook helpers.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) for highly performant routing and server-side ready structure.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for fluid responsive grids, smooth animations, and glassmorphic header navigation.
- **Data Flow**: [React Context API](https://react.dev/reference/react/createContext) (`DataContext`) providing global application state for loaded internships, filters, and loading sequences.
- **HTTP Client**: [Axios](https://axios-http.com/) for handling robust API interactions.
- **Custom Hook**: `useFilteredInternships` to encapsulate all complex client-side multi-parameter filter matching and sorting operations efficiently using `useMemo`.

---

## 📂 Project Structure

```text
frontend/
├── app/                  # Next.js App Router (Layouts & Main Page)
├── components/           # Reusable UI Components
│   ├── FilterSection.tsx # Small, isolated filter input/selector components
│   ├── FilterSidebar.tsx # Main filters panel (supports desktop & mobile overlay)
│   ├── InternshipCard.tsx# Premium card rendering internship specifics & metadata
│   ├── InternshipList.tsx# Grid layout with active count, sorting controls, & listings
│   └── SearchBar.tsx     # Global text search bar with search icons
├── context/              # State management
│   └── DataContext.tsx   # Fetches data from Internshala endpoints & holds filter state
├── hooks/                # Custom React Hooks
│   └── useFilteredInternships.ts # Handles multi-filter logic & sorting operations
├── public/               # Static assets & brand logos
└── package.json          # Project dependencies & build commands
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have **Node.js (v18+)** and **npm** installed on your system.

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Set up the Environment Variables:
   Create a `.env.local` file inside the `frontend` folder and specify the target endpoint (or use the automatic built-in fallback):
   ```env
   NEXT_PUBLIC_API_URL=https://internshala.com/hiring/search
   ```

### Running Locally

To run the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the application.

---

## 🏗️ Production Build & Verification

To verify full TypeScript compilation and compile the optimized static production pages:
```bash
npm run build
```

This commands executes `next build`, performing standard type checking, asset compilation, and page optimization.
