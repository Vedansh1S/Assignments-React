## ToDoAdvance – Advanced React To‑Do App

A polished to‑do list app built with **React** and **Vite**, featuring filtering, inline editing, progress tracking, and local storage persistence.

### Features

- **Add tasks**: Type a task and click the plus button (or press Enter) to add it.
- **Mark complete**: Click on a task row to toggle it as done / not done.
- **Edit tasks**: Click the edit icon, change the text, then press Enter or the check icon to save (Esc or the X icon cancels).
- **Filter view**: Switch between **All**, **Active**, and **Completed** tasks using the filter tabs.
- **Clear completed**: Use the “Clear Completed” button to remove all finished tasks at once.
- **Progress indicator**: See how many tasks are done and a circular percentage indicator at the top.
- **Persistent data**: Tasks are saved in `localStorage`, so your list stays even after refreshing.

### Tech Stack

- **React + Vite**
- **Hooks**: `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`
- **Styling**: Tailwind‑style utility classes via `index.css`

### How to Run

```bash
npm install
npm run dev
```

Then open the shown `http://localhost:****` URL in your browser.
