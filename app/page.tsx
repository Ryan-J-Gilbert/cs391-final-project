// Component: Home page (except carousel) 
// Author: Ryan Gilbert
// Email: ryanjg@bu.edu

"use client";

import Image from "next/image";
import BigNumber from "@/components/BigNumber";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";


//example data
const spendingData = [
  { month: "Jan", spending: 400 },
  { month: "Feb", spending: 300 },
  { month: "Mar", spending: 500 },
  { month: "Apr", spending: 700 },
  { month: "May", spending: 600 },
];
const lastMonthData = [
  { name: "Wants", value: 300, color: "blue", },
  { name: "Needs", value: 500, color: "green" },
  { name: "Savings", value: 200, color: "orange" },
];
const currentYearData = [
  { name: "Wants", value: 2400, color: "blue" },
  { name: "Needs", value: 3100, color: "green" },
  { name: "Savings", value: 1500, color: "orange" },
];

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-evenly pt-10 dark">
        <BigNumber title="Wants" value={100} change={10} />
        <BigNumber title="Needs" value={200} change={5} />
        <BigNumber title="Savings" value={50} change={-5} />
      </div>

      <div className="flex flex-col items-center pt-10 w-full">
        <Carousel className="max-w-xl">
          <CarouselContent>
            {/* line graph */}
            <CarouselItem>
              <div className="p-4 border rounded-xl bg-white">
                <h2 className="text-center text-xl font-bold">Spending Over Time</h2>
                <div>
                  <ResponsiveContainer>
                    <LineChart data={spendingData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="spending" stroke="blue" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CarouselItem>
            {/* pie chart of prev month */}
            <CarouselItem>
              <div className="bg-white p-4 rounded-xl border">
                <h2 className="text-center text-xl font-bold">Last Month</h2>
                <div>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={lastMonthData}
                        dataKey="value"
                        nameKey="name"
                        label
                      >
                        {lastMonthData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={entry.color}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CarouselItem>
            {/* pie chart of current year */}
            <CarouselItem>
              <div className="bg-white p-4 rounded-xl border">
                <h2 className="text-center text-xl font-bold">Current Year</h2>
                <div>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={currentYearData}
                        dataKey="value"
                        nameKey="name"
                        label
                      >
                        {currentYearData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={entry.color}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="flex justify-evenly pb-4">
          <Link href="/report"><Button variant="outline" className="m-4">New Report</Button></Link>
          <Link href="/history"><Button variant="outline" className="m-4">History</Button></Link>
        </div>
      </div>
    </div>
  );

}
