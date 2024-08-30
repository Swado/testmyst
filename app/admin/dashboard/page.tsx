import { useTranslations } from "next-intl";
import React, { PureComponent } from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

const AdminDashbaord = () => {
  return (
    <div className="grid grid-col-3">
      Dashboard
      {/* <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default AdminDashbaord;

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
];
