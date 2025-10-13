import { Step } from '@lib/types/auth/auth';
import React from 'react'

type OtpStepProps = {
    email: string | null;
    setStep: (step: Step) => void;
};

export default function OtpStep({ email, setStep }: OtpStepProps) {
  return (
    <div>
      
    </div>
  )
}
