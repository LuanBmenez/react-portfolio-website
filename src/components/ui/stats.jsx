import { useEffect, useState } from "react";

const useCount = (value, enabled) => {
  const [count, setCount] = useState(enabled ? value : 0);

  useEffect(() => {
    if (!enabled) return;
    let rafId;
    const duration = 700;
    const start = performance.now();
    const from = 0;
    const to = value;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const val = Math.floor(from + (to - from) * t);
      setCount(val);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value, enabled]);

  return count;
};

export const Stats = ({ months = 0, projects = 0, technologies = 0, visible = false }) => {
  const monthsCount = useCount(months, visible);
  const projectsCount = useCount(projects, visible);
  const techCount = useCount(technologies, visible);

  return (
    <dl className="grid grid-cols-3 gap-6 py-6">
      <div className="text-center p-4 rounded-lg bg-secondary/50">
        <dt className="text-2xl font-bold text-primary">
          <span aria-live="polite" aria-atomic="true">{monthsCount}</span>+
        </dt>
        <dd className="text-sm text-muted-foreground">Meses estudando</dd>
      </div>

      <div className="text-center p-4 rounded-lg bg-secondary/50">
        <dt className="text-2xl font-bold text-primary">
          <span aria-live="polite" aria-atomic="true">{projectsCount}</span>+
        </dt>
        <dd className="text-sm text-muted-foreground">Projetos</dd>
      </div>

      <div className="text-center p-4 rounded-lg bg-secondary/50">
        <dt className="text-2xl font-bold text-primary">
          <span aria-live="polite" aria-atomic="true">{techCount}</span>+
        </dt>
        <dd className="text-sm text-muted-foreground">Tecnologias</dd>
      </div>
    </dl>
  );
};

export default Stats;
