import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Link href="/dashboard" className="text-2xl text-white font-bold bg-purple-500 p-2 rounded">Go to DashBoard</Link>
    </div>
  );
}
