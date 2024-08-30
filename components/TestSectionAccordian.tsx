"use client";
import { QuestionType, SectionType, TestType } from "@/types/Package";
import { surrealConnection, surrealDatabase } from "@/utils/surreal/surreal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import React, { FC, useEffect } from "react";
import { useTestStore } from "@/store/test";
import { Badge } from "./ui/badge";
import { useTranslations } from "next-intl";

const TestSectionAccordian = () => {
  // Get Sections data from store
  const testData = useTestStore((state: any) => state.testData);
  const selectedSection = useTestStore((state: any) => state.selectedSection);
  const selectedQuestion = useTestStore((state: any) => state.selectedQuestion);
  const updateSectionSelection = useTestStore(
    (state: any) => state.updateSectionSelection
  );
  const updateQuestionSelection = useTestStore(
    (state: any) => state.updateQuestionSelection
  );

  const t = useTranslations("Tests");

  console.log("sections: ", testData.sections);
  return (
    <Accordion
      type="single"
      collapsible
      className="px-5 my-2"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{t("testSections")}</AccordionTrigger>
        <AccordionContent className="flex-col">
          <div className="flex">
            {testData.sections &&
              testData.sections.map((section: SectionType, index: number) => (
                <div className="flex-row m-2" key={index}>
                  <Badge
                    variant={index == selectedSection ? "default" : "secondary"}
                    onClick={() => updateSectionSelection(index)}
                  >
                    {section.section_title}
                  </Badge>
                </div>
              ))}
          </div>
          <div className=" align-middle">
            {testData &&
              testData.sections[selectedSection].questions.map(
                (question: any, index: number) => {
                  return (
                    <Badge
                      className="m-1"
                      key={question.id}
                      variant={
                        index == selectedQuestion ? "default" : "secondary"
                      }
                      onClick={() => updateQuestionSelection(index)}
                    >
                      {index + 1}
                    </Badge>
                  );
                }
              )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TestSectionAccordian;
