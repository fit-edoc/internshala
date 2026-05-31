# Internshala Clone - Frontend (Next.js)

This subdirectory contains the Next.js frontend code for the Internshala Internship Portal Clone. It connects to the Internshala hiring endpoint to pull live data and provides premium sorting and multi-filter controls.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=https://internshala.com/hiring/search
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### 4. Build for Production
```bash
npm run build
```

---

## 🛠️ Tech Stack & Key Files
- **State & Data Fetching**: [context/DataContext.tsx](context/DataContext.tsx)
- **Search & Filtering Logic**: [hooks/useFilteredInternships.ts](hooks/useFilteredInternships.ts)
- **UI Components**:
  - [components/FilterSidebar.tsx](components/FilterSidebar.tsx) — Multivariable filters (Profile, Location, Duration, Stipend)
  - [components/InternshipList.tsx](components/InternshipList.tsx) — Main grid container with dynamic sorting controls
  - [components/InternshipCard.tsx](components/InternshipCard.tsx) — Renders company profile, location tags, stipend details, and durations
  - [components/SearchBar.tsx](components/SearchBar.tsx) — Dynamic text search component
