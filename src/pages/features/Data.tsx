import DataForm from "@/components/Dashboard/Data/DataForm";
import StepIndicator from "@/components/StepIndicator";

const Data = () => {
    return ( 
        <div className="h-screen flex flex-col mt-4 justify-center items-center">
            <StepIndicator currentStep={1} />
            <DataForm />
        </div>
     );
}
export default Data;