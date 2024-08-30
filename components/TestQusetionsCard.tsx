"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { TestStoreType, useTestStore } from "@/store/test";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import { QuestionType } from "@/types/Package";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const QusetionsCard = () => {
  // Store data is fetched separately to prevent multiple renders on single data change.
  const testData = useTestStore((state: TestStoreType) => state.testData);
  const selectedSection = useTestStore(
    (state: TestStoreType) => state.selectedSection
  );
  const selectedQuestion = useTestStore(
    (state: TestStoreType) => state.selectedQuestion
  );

  const question: QuestionType =
    testData!.sections![selectedSection].questions![selectedQuestion];
  console.log({ question });
  return (
    <Card className="m-5 md:m-10  h-[500px]">
      <div className="p-2 bg-black text-white w-fit rounded-md">
        {testData!.sections[selectedSection].section_title}
      </div>
      <CardHeader>{question && question.question_title}</CardHeader>

      <CardContent>
        {question.options.length && (
          <RadioGroup defaultValue="">
            {question.options.map((item, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem
                  value={item.option_text}
                  id={item.option_text}
                />
                <Label htmlFor={item.option_text}>{item.option_text}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default QusetionsCard;
