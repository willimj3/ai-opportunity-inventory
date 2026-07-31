import type { Metadata } from "next";
import { Assistant } from "@/components/Assistant";

export const metadata: Metadata = {
  title: "Research Assistant",
  description:
    "Ask anything about real-world AI projects tackling public problems — or, as a program member, get coached from first idea to a published research memo.",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-8 sm:py-10">
      <Assistant />
    </div>
  );
}
