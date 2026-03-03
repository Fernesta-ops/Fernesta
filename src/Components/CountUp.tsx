import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
};

function CountUp({
  end,
  durationMs = 1400,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const runAnimation = () => {
      hasStarted.current = true;
      const startAt = performance.now();

      const update = (currentTime: number) => {
        const elapsed = currentTime - startAt;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - (1 - progress) * (1 - progress);
        setValue(Math.round(end * eased));
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [durationMs, end]);

  return (
    <span ref={ref} className="count-up">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default CountUp;
