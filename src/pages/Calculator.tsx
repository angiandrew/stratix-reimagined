import PublicLayout from "@/components/redesign/PublicLayout";
import SavingsCalculator from "@/components/SavingsCalculator";

const Calculator = () => (
  <PublicLayout>
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <SavingsCalculator />
      </div>
    </div>
  </PublicLayout>
);

export default Calculator;
