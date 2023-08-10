import { PropsWithChildren, createContext, useContext, useState } from "react"

const StepUIContext = createContext<{
  currentStep: number
  setCurrentStep: (step: number) => void
  onBack: () => void
  onNext: () => void
} | null>(null)

export const useStepUIContext = () => {
  const context = useContext(StepUIContext)
  if (!context) {
    throw new Error("useStepUIContext must be used within a StepUIProvider")
  }
  return context
}

interface StepUIProviderProps {
  steps: any[]
}

export default function StepUIProvider({
  children,
}: PropsWithChildren<StepUIProviderProps>) {
  const [currentStep, setCurrentStep] = useState<number>(0)

  let value = {
    currentStep,
    setCurrentStep,
    onBack: () => {
      setCurrentStep((prev) => prev - 1)
    },
    onNext: () => {
      setCurrentStep((prev) => prev + 1)
    },
  }

  return (
    <StepUIContext.Provider value={value}>{children}</StepUIContext.Provider>
  )
}
