import { CONTACT_EMAIL, INTEREST_FORM_URL, SUBSTACK_URL, UT_INVENTORY_URL } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule-strong bg-paper-sunken">
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="label text-ink-faint mb-3">The Initiative</p>
            <p className="text-sm leading-relaxed text-ink-soft max-w-xs">
              A multi-stakeholder effort to identify, catalogue, and analyze AI use
              cases that advance major societal goals, led by the University of
              Texas School of Law AI Innovation and Law Program.
            </p>
          </div>
          <div>
            <p className="label text-ink-faint mb-3">Links</p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a href={UT_INVENTORY_URL} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  Program page at Texas Law ↗
                </a>
              </li>
              <li>
                <a href={INTEREST_FORM_URL} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                  Join the community ↗
                </a>
              </li>
              {SUBSTACK_URL ? (
                <li>
                  <a href={SUBSTACK_URL} className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                    Published memos ↗
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
          <div>
            <p className="label text-ink-faint mb-3">Contact</p>
            <p className="text-sm text-ink-soft">
              Questions and press inquiries:
              <br />
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:text-accent-deep transition-colors">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-rule pt-5">
          <p className="text-xs leading-relaxed text-ink-faint max-w-3xl">
            The AI Opportunity Inventory and its research assistant support legal and
            policy research; nothing on this site is legal advice. Assistant
            conversations are AI-generated and reviewed workflows include human
            editorial oversight before publication. Raw Opportunity Bank entries are
            community submissions and appear as submitted, without endorsement.
          </p>
        </div>
      </div>
    </footer>
  );
}
