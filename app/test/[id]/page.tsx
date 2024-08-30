"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QuestionType, SectionType, TestType } from "@/types/Package";
import { surrealConnection, surrealDatabase } from "@/utils/surreal/surreal";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { RecordId, jsonify } from "surrealdb.js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import TestSectionAccordian from "@/components/TestSectionAccordian";
import TestQusetionsCard from "@/components/TestQusetionsCard";
import TestBottomPanel from "@/components/TestBottomPanel";
import { useTranslations } from "next-intl";
import { useTestStore } from "@/store/test";

const TestPage = () => {
  useEffect(() => {
    getTestData();
  }, []);

  const params = useParams();
  const tests = useTestStore((state: any) => state);

  const getTestData = async () => {
    await tests.getTestData(params.id);
  };

  const t = useTranslations("Tests");

  return (
    <div>
      {tests.testData ? (
        <div>
          {/* Start: Top Bar */}
          <Card className="relative">
            <CardHeader className="flex-row justify-between text-xl font-medium">
              <div>{tests.testData ? tests.testData.test_title : ""}</div>
              <div>{tests.testData ? tests.testData.duration.hours() : ""}</div>
              <Button>{t("submitBtn")}</Button>
            </CardHeader>
          </Card>
          {/* End: Top Bar */}
          {/* Start: Accordian section */}
          <TestSectionAccordian />
          {/* End: Accordian section */}
          {/* Start: Question & Answers */}
          <TestQusetionsCard />
          {/* End: Question & Answers */}
          {/* Start: Bottom Panel */}
          <TestBottomPanel />
          {/* End: Bottom Panel */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TestPage;
