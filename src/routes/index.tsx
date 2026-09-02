import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PinGate } from "@/components/sections/PinGate";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "For Aishu — A Birthday Access Pass" },
      {
        name: "description",
        content:
          "A fantasy 3D birthday card for Aishu: six glowing fandom worlds, a cake to cut, a candle to blow out, and a letter.",
      },
      { property: "og:title", content: "For Aishu — A Birthday Access Pass" },
      {
        property: "og:description",
        content: "Enter the PIN and step through the gate into six little worlds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GatePage,
});

function GatePage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen bg-background">
      <PinGate onUnlock={() => navigate({ to: "/card" })} />
    </main>
  );
}
