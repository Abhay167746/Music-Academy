'use client'
import { useSearchParams } from "next/navigation";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const course = searchParams.get("course");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-black dark:text-white">
          Sign up for {course}
        </h1>

        <form className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-zinc-800"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-zinc-800"
          />
          <button className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded font-semibold">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
