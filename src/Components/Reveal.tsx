import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      className={`reveal${className ? ` ${className}` : ""}`}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: delayMs / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
