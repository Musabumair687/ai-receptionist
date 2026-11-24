import { BackendStatus } from "@/components/backend-status";

export default function Home() {
  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-4xl content-center gap-10 px-6 py-16 sm:px-12">
      <header className="border-l-4 border-teal-700 pl-5 sm:pl-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">AI Receptionist</h1>
        <p className="mt-4 max-w-md text-lg text-slate-600">
          Welcome to the clinic receptionist prototype.
        </p>
      </header>
      <BackendStatus />
    </main>
  );
}
