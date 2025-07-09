import React from 'react';

interface StepTitleProps {
  children: React.ReactNode;
}

export const StepTitle: React.FC<StepTitleProps> = ({ children }) => (
  <h1 className="text-2xl font-bold text-gray-900 mb-6">{children}</h1>
);
