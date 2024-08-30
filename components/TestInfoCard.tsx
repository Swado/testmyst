"use client";
import React, { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { TestType } from "@/types/Package";
import { useRouter } from "next/navigation";

const TestInfoCard: FC<TestType> = (props) => {
  console.log({ props });

  const navigate = useRouter();

  const navigateToTest = () => {
    navigate.replace(`/test/${props.id.id}`);
  };

  return (
    <Card className="p-0" onClick={navigateToTest}>
      <CardHeader className="p-4">
        <CardTitle>{props.test_title}</CardTitle>
        <div className="flex flex-row justify-around">
          <CardDescription>Total Marks: 30</CardDescription>
          <CardDescription>Total Time: 3hrs</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default TestInfoCard;
