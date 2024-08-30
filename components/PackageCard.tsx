import React, { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { PackageType } from "@/types/Package";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import PackageDetails from "./PackageDetails";

const PackageCard: FC<PackageType> = (props) => {
  return (
    <div>
      <Card className=" w-[300px] col-span-1">
        {/* TODO: sort resizing issue */}
        {/* <Image
          src={props.package_img ?? "/images/dog1.jpeg"}
          alt="Package image"
          width={200}
          height={100}
          className="rounded-sm object-contain w-full"
        /> */}
        <CardHeader className="flex-row justify-between items-center">
          <div className="">
            <div className="text-lg">{props.package_name}</div>
            <div className="text-md font-thin">{props.package_subtitle}</div>
          </div>
          <div className="text-md ">${props.package_cost}</div>
        </CardHeader>
        <CardContent>
          <div className="text-md ">{props.package_description}</div>
        </CardContent>
        <CardFooter>
          {/* Dialog for Package details */}
          <PackageDetails {...props} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default PackageCard;
