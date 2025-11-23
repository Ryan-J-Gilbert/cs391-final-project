import NavBar from "./components/NavBar"

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen p-4">
      <NavBar />
      <h1>Welcome to the Budgeting App</h1>
      <p>Manage your finances effectively!</p>
    </div>
  );
}
