export interface Brand {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  logo?: string;
  logoAlt?: string;
  imagePath: string;
}

export interface MembershipGrade {
  value: string;
  label: string;
}

export interface SignupData {
  membershipGrade: string;
  recentBrands: string[];
  selectedBrands: string[];
  email: string;
}

export interface CompletedStep {
  id: string;
  step: number;
  data: SignupData;
}

export interface StepValidation {
  [key: number]: (data: SignupData) => boolean;
}
