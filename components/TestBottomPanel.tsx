import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, CrossIcon, FlagIcon, X } from "lucide-react";
import { TestStoreType, useTestStore } from "@/store/test";

const TestBottomPanel = () => {
  // Store data is fetched separately to prevent multiple renders on single data change.
  const testData = useTestStore((state: TestStoreType) => state.testData);
  const selectedSection = useTestStore(
    (state: TestStoreType) => state.selectedSection
  );
  const selectedQuestion = useTestStore(
    (state: TestStoreType) => state.selectedQuestion
  );
  const updateQuestionSelection = useTestStore(
    (state: TestStoreType) => state.updateQuestionSelection
  );

  // Switch Questions.
  const switchQuestion = (change: number) => {
    const noOfQuestions =
      testData!.sections![selectedSection]!.questions!.length;
    const no = (noOfQuestions + selectedQuestion + change) % noOfQuestions;
    updateQuestionSelection(no);
  };

  return (
    <div className="flex justify-around">
      <Button variant="default" onClick={() => switchQuestion(-1)}>
        <ArrowLeft /> Previous
      </Button>
      <Button variant="secondary" className="hover:bg-red-400">
        <X /> Clear
      </Button>
      <Button variant="outline" className="bg-yellow-500">
        <FlagIcon /> Mark
      </Button>
      <Button variant="default" onClick={() => switchQuestion(+1)}>
        Save & Next <ArrowRight />
      </Button>
    </div>
  );
};

export default TestBottomPanel;
