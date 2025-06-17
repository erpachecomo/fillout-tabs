import Tabs from "./components/Tabs";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-[100vh]">
      <div className="w-full grow-1"></div>
      <div className="w-full absolute bottom-0">
        <Tabs />
      </div>
    </main>
  );
}
