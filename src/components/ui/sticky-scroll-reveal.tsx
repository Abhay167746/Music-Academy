// "use client";
// import React, { useRef } from "react";
// import { useMotionValueEvent, useScroll } from "framer-motion";
// import { motion } from "framer-motion";

// export const StickyScroll = ({
//   content,
// }: {
//   content: {
//     title: string;
//     description: string;
//   }[];
// }) => {
//   const [activeCard, setActiveCard] = React.useState(0);
//   const ref = useRef<any>(null);
//   const { scrollYProgress } = useScroll({
//     container: ref,
//     offset: ["start start", "end start"],
//   });
//   const cardLength = content.length;

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const cardsBreakpoints = content.map((_, index) => index / cardLength);
//     cardsBreakpoints.forEach((breakpoint, index) => {
//       if (latest > breakpoint - 0.2 && latest <= breakpoint) {
//         setActiveCard(() => index);
//       }
//     });
//   });

//   const backgroundColors = [
//     "var(--slate-900)",
//     "var(--black)",
//     "var(--neutral-900)",
//   ];
//   const linearGradients = [
//     "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
//     "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
//     "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
//   ];
//   return (
//     <motion.div
//       animate={{
//         backgroundColor: backgroundColors[activeCard % backgroundColors.length],
//       }}
//       className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10"
//       ref={ref}
//     >
//       <div className="div relative flex items-start px-4">
//         <div className="max-w-2xl">
//           {content.map((item, index) => (
//             <div key={item.title + index} className="my-20">
//               <motion.h2
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-2xl font-bold text-slate-100"
//               >
//                 {item.title}
//               </motion.h2>
//               <motion.p
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-kg text-slate-300 max-w-sm mt-10"
//               >
//                 {item.description}
//               </motion.p>
//             </div>
//           ))}
//           <div className="h-40" />
//         </div>
//       </div>
//       <motion.div
//         animate={{
//           background: linearGradients[activeCard % linearGradients.length],
//         }}
//         className="hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden"
//       ></motion.div>
//     </motion.div>
//   );
// };

"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export const StickyScroll = ({
  content,
}: {
  content: {
    title: string;
    description: string;
  }[];
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      content.length - 1,
      Math.floor(latest * content.length)
    );
    setActiveCard(index);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--neutral-900)",
    "var(--black)",
  ];

  const gradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  return (
    <motion.section
      ref={containerRef}
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex justify-center py-32"
    >
      <div className="max-w-7xl w-full px-6 flex gap-16">
        {/* LEFT CONTENT */}
        <div className="flex-1">
          {content.map((item, index) => (
            <div key={item.title + index} className="mb-32">
              <motion.h2
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-3xl font-bold text-white"
              >
                {item.title}
              </motion.h2>

              <motion.p
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="mt-6 text-lg text-slate-300 max-w-xl"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>

        {/* RIGHT STICKY PREVIEW */}
        <motion.div
          animate={{
            background: gradients[activeCard % gradients.length],
          }}
          className="hidden lg:block w-80 h-60 rounded-xl sticky top-32"
        />
      </div>
    </motion.section>
  );
};
