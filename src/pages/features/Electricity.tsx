import ElectricityForm from "@/components/Dashboard/Electricity/ElectricityForm";
import StepIndicator from "@/components/StepIndicator";

const Electricity = () => {
    return ( 
        <div className="h-screen flex flex-col mt-4 justify-center items-center">
                        <StepIndicator currentStep={1} />
            
            <ElectricityForm/>
        </div>
     );
}
 
export default Electricity;