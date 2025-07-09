import type React from 'react';

interface StepTitleProps {
  children: React.ReactNode;
}

export const StepTitle: React.FC<StepTitleProps> = ({ children }) => {
  return <h1 className="text-2xl font-bold text-gray-900">{children}</h1>;
};
