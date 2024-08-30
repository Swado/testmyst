import PackageCard from "@/components/PackageCard";
import PackageDetails from "@/components/PackageDetails";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { PackageType } from "@/types/Package";
import { createClient } from "@/utils/supabase/server";
import { surrealConnection, surrealDatabase } from "@/utils/surreal/surreal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "postcss";
import { List } from "postcss/lib/list";
import React from "react";
import { Label } from "recharts";
const AdminPackagesPage = async () => {
  // const supabase = createClient();

  // const { data, error } = await supabase.from("packages").select();

  await surrealConnection();

  const data = await surrealDatabase.select<PackageType>("packages");

  return (
    <div className="p-5">
      <Card>
        <CardHeader className="bg-cover bg-gray-700 w-fit rounded-xl text-white">
          <CardTitle>Draft Packages</CardTitle>
        </CardHeader>
        <CardContent className="mt-10 grid grid-cols-3">
          {data.map((value, index) => (
            <PackageCard key={index} {...value} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPackagesPage;

// const packageData: PackageType[] = [
//   {
//     packageCost: 2,
//     packageName: "Test1",
//     packageSubtitle: "Physics",
//     packageDescription: "test for physics students",
//     packageImgUrl: "/images/dog1.jpeg",
//     id: "1",
//   },
//   {
//     packageCost: 5,
//     packageName: "Test2",
//     packageSubtitle: "Physics",
//     packageDescription: "test for physics students",
//     packageImgUrl: "/images/dog2.jpg",
//     id: "2",
//   },
// ];
