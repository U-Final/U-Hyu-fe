import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { StepContent } from "../components/StepContent";
import { type CompletedStepsProps } from "../types";

export const CompletedSteps: React.FC<CompletedStepsProps> = ({ completedSteps }) => (
  <div className="px-6 pb-32">
    <AnimatePresence initial={false}>
      {completedSteps.map((stepData, index) => (
        <motion.div
          key={stepData.id}
          layoutId={`step-${stepData.step}`}
          initial={{ opacity: 0, y: -30 }}
          animate={{
            opacity: 0.5,
            y: 0,
            transition: {
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut",
            },
          }}
          exit={{
            opacity: 0,
            y: -30,
            transition: { duration: 0.3 },
          }}
          className="mb-6"
          style={{
            zIndex: completedSteps.length - index,
            transform: `translateY(${index * 2}px)`,
          }}
        >
          <div className="space-y-6 bg-white p-6">
            <StepContent
              step={stepData.step}
              data={stepData.data}
              onUpdateData={() => {}}
              onToggleBrand={() => {}}
              disabled={true}
            />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);
