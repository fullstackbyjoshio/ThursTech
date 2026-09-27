import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Seo from "../components/ui/Seo";
import OptimizedImage from "../components/ui/OptimizedImage";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
      if (active) {
        setProject(data);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <div className="container-page py-20 text-sm text-navy-700/80">Loading...</div>;

  if (!project) {
    return (
      <div className="container-page py-20 text-center">
        <p className="font-display font-bold text-xl mb-2">Project not found</p>
        <Link to="/projects" className="text-blue-600 font-semibold">Back to projects</Link>
      </div>
    );
  }

  const gallery = Array.isArray(project.gallery) ? project.gallery : [];

  return (
    <>
      <Seo title={`${project.title} | THURSTECH Projects`} description={project.description || `${project.title} — a THURSTECH project.`} path={`/projects/${project.id}`} image={project.cover_image} />
      <section className="container-page py-14 sm:py-16 max-w-3xl">
        <p className="text-blue-600 font-semibold text-sm mb-2">{project.service}</p>
        <h1 className="text-3xl font-extrabold mb-3">{project.title}</h1>
        <p className="text-sm text-navy-700/80 mb-8">{project.location}</p>

        {project.cover_image && (
          <OptimizedImage src={project.cover_image} alt={project.title} width={1200} height={675} loading="eager" fetchPriority="high" decoding="async" frameClassName="w-full mb-8" />
        )}

        {project.description && <p className="text-navy-700/80 leading-relaxed mb-8">{project.description}</p>}

        {gallery.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <OptimizedImage key={i} src={src} alt={`${project.title} photo ${i + 1}`} width={800} height={800} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
