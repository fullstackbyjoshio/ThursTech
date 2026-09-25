import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Seo from "../components/ui/Seo";
import SectionHeading from "../components/ui/SectionHeading";
import EmptyState from "../components/ui/EmptyState";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase.from("projects").select("*").order("project_date", { ascending: false });
      if (active) {
        if (!error && data) setProjects(data);
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
        title="Our Projects | THURSTECH Nigeria Limited"
        description="Real AC installation, repair and servicing projects completed by THURSTECH Nigeria Limited."
        path="/projects"
      />
      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="Projects" title="Our Work" description="Real projects, with real before, during and after photos." />

        <div className="mt-10">
          {loading ? (
            <p className="text-sm text-navy-700/50">Loading projects...</p>
          ) : projects.length === 0 ? (
            <EmptyState
              title="Project gallery coming soon"
              description="Completed installations and repairs will appear here with real photos as they are added through the admin dashboard."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p) => (
                <Link key={p.id} to={`/projects/${p.id}`} className="border border-silver-200 hover:border-blue-600 transition-colors">
                  <div className="aspect-video bg-silver-100 flex items-center justify-center overflow-hidden">
                    {p.cover_image ? (
                      <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <span className="text-xs text-navy-700/40">No image</span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm">{p.title}</p>
                    <p className="text-xs text-navy-700/60 mt-1">{p.location} &bull; {p.service}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
