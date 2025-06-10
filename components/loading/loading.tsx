import ElectrobayIcon from "@/public/logo/electrobay-icon";

export default function Loading() {
  return (
    <main className="flex justify-center items-center w-full h-full min-h-[65vh]">
      <h1 className="text-6xl font-bold flex items-center justify-center">
        L<ElectrobayIcon className="w-[50px]" />
        ADING...
      </h1>
    </main>
  );
}
