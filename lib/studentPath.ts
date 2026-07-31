// The student contributor path — single source for the landing page and the
// assistant page so the language never drifts between the two.
export const STUDENT_PATH = [
  {
    n: "1",
    title: "Verify you're a member",
    body: "On the assistant page, enter the email you joined with. Not a member yet? The interest form takes two minutes.",
  },
  {
    n: "2",
    title: "Pitch your idea",
    body: "Describe the AI opportunity in a sentence or two. The assistant immediately searches everything in the bank — and every idea another student has already claimed — so you know within a minute whether yours is open.",
  },
  {
    n: "3",
    title: "Develop the memo, with a guide",
    body: "If your idea holds up, it's recorded under your name and you get a structured path: a memo template, staged feedback on each section, and a coach that demands real sources — and won't write it for you.",
  },
  {
    n: "4",
    title: "Editors take it from there",
    body: "When your draft meets the bar, the assistant submits it to the human editors, who decide what gets published.",
  },
] as const;
