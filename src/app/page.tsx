import { Board } from "./_board";

export default function Home() {
  return (
    <main className="grid min-h-svh items-center">
      <div className="py-12">
        <header className="pb-12">
          <h1 className="text-center text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Tic Tac Toe
          </h1>
        </header>
        <div className="px-4">
          <Board />
        </div>
      </div>
    </main>
  );
}
