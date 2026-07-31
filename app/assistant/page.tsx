import type { Metadata } from "next";
import { Assistant } from "@/components/Assistant";

export const metadata: Metadata = {
  title: "Research Assistant",
  description:
    "Ask about the AI Opportunity Inventory, or — as a community member — run the full research memo workflow with an AI research coach.",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-8 sm:py-10">
      <Assistant />
    </div>
  );
}
