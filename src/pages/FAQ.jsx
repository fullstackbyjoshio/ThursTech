import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import Seo from "../components/ui/Seo";
import SectionHeading from "../components/ui/SectionHeading";
import EmptyState from "../components/ui/EmptyState";

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-silver-200">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between py-4 text-left font-medium">
        {question}
        <ChevronDown size={18} className={`transition-transform shrink-0 ml-4 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-4 text-sm text-navy-700/80 leading-relaxed">{answer}</p>}
    </div>
  );
}

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (active) {
        if (!error && data) setFaqs(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Seo
        title="Frequently Asked Questions | THURSTECH"
        description="Answers to common questions about AC sales, installation, repair and servicing from THURSTECH Nigeria Limited."
        path="/faq"
      />
      <section className="container-page py-16 sm:py-20 max-w-2xl">
        <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" />
        <div className="mt-8">
          {loading ? (
            <p className="text-sm text-navy-700/80">Loading...</p>
          ) : faqs.length === 0 ? (
            <EmptyState title="FAQs coming soon" description="Common questions and answers will appear here once added through the admin dashboard." />
          ) : (
            faqs.map((f) => <FaqItem key={f.id} question={f.question} answer={f.answer} />)
          )}
        </div>
      </section>
    </>
  );
}
