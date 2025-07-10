import React from 'react';
import { type StepTitleProps } from '../types';

export const StepTitle: React.FC<StepTitleProps> = ({ children }) => (
  <h1 className="text-2xl font-bold text-gray-900 mb-6">{children}</h1>
);
