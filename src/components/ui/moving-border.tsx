"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/utils/cn";

export function Button({
  borderRadius = "1.75rem",
  children,
  className,
}: {
  borderRadius?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className="relative h-16 w-40 p-[1px] overflow-visible"
      style={{ borderRadius }}
    >
      <MovingBorder />
      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center rounded-full bg-black text-white",
          className
        )}
      >
        {children}
      </div>
    </button>
  );
}

function MovingBorder() {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    progress.set((time / 2000) * length);
  });

  const x = useTransform(progress, (v) =>
    pathRef.current ? pathRef.current.getPointAtLength(v).x : 0
  );
  const y = useTransform(progress, (v) =>
    pathRef.current ? pathRef.current.getPointAtLength(v).y : 0
  );

  const transform = useMotionTemplate`
    translateX(${x}px) translateY(${y}px)
    translate(-50%, -50%)
  `;

  return (
    <>
      <svg className="absolute inset-0 h-full w-full">
        <rect
          ref={pathRef}
          width="100%"
          height="100%"
          rx="28"
          ry="28"
          fill="none"
        />
      </svg>

      <motion.div
        style={{ transform }}
        className="absolute h-6 w-6 rounded-full
        bg-[radial-gradient(#38bdf8_40%,transparent_60%)]"
      />
    </>
  );
}
