"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Label } from "recharts";
import { Input } from "postcss";
import { PackageType, TestType } from "@/types/Package";

import { Separator } from "./ui/separator";
import TestInfoCard from "./TestInfoCard";
import { surrealConnection, surrealDatabase } from "@/utils/surreal/surreal";
import { RecordId, jsonify } from "surrealdb.js";
import { useTranslations } from "next-intl";
import { Badge } from "./ui/badge";

const PackageDetails: FC<PackageType> = (props) => {
  const t = useTranslations("Packages");
  const [tests, settests] = useState<TestType[]>();

  const getTests = async () => {
    await surrealConnection();
    const testData = await surrealDatabase.query<Array<TestType[]>>(
      `select * from tests where package_id = ${props.id}`
    );
    settests(testData[0]);
    // console.table({ testData });
  };

  useEffect(() => {
    getTests();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
        // variant="outline"
        // className="bg-gradient-to-br from-cyan-200 to-cyan-600 text-white"
        >
          {t("viewBtn")}
        </Button>
      </DialogTrigger>
      <DialogContent className="lg ">
        <div className="bg-black absolute p-2 w-fit text-white rounded-md">
          {" "}
          Package Details
        </div>
        <DialogHeader className="flex-row justify-between mt-10">
          <div className="">
            <DialogTitle>{props.package_name}</DialogTitle>
            <DialogDescription>{props.package_subtitle}</DialogDescription>
          </div>
          <DialogTitle>${props.package_cost}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{props.package_description}</DialogDescription>
        <DialogDescription>Total Purchases: 10</DialogDescription>
        <Separator />
        {/* <DialogContent> */}
        <DialogTitle>Tests</DialogTitle>
        {tests?.map((value, index) => {
          console.log({ value });
          return <TestInfoCard key={index} {...value} />;
        })}

        {/* </DialogContent> */}
        <DialogFooter className="sm:justify-start ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDetails;
