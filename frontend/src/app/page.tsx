import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 bg-black">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-6xl font-bold tracking-wider text-[#149414] font-mono drop-shadow-[0_0_8px_rgba(14,107,14,0.6)]">
            Welcome to the pong game
          </h1>
          <div className="w-64 h-4 bg-[#149414] mt-4 rounded-sm shadow-[0_0_12px_rgba(14,107,14,0.7)]"></div>
        </div>
      </main>
    </div>
  );
}
