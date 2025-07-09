export interface Brand {
  id: string
  name: string
  color: string
  bgColor: string
  textColor: string
}

export interface MembershipGrade {
  value: string
  label: string
}

export interface SignupData {
  membershipGrade: string
  recentBrands: string[]
  selectedBrands: string[]
  email: string
}

export interface StepProps {
  onNext: () => void
  onBack?: () => void
}
