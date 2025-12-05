// Component: Graph Carousel 
// Author: Ryan Hwang
// Email: hwangr@bu.edu

"use client";

import { useEffect, useState } from "react";
import { getDatabase } from "@/app/db";
import { MonthEntry } from "@/types/MonthEntry";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

type PieSlice = {
  name: string;
  value: number;
  color: string;
};

type LinePoint = {
  month: string;
  spending: number;
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function GraphCarousel() {
  const [spendingData, setSpendingData] = useState<LinePoint[]>([]);
  const [lastMonthData, setLastMonthData] = useState<PieSlice[]>([]);
  const [currentYearData, setCurrentYearData] = useState<PieSlice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const db = await getDatabase();
        const months: MonthEntry[] = await db.finances.find().exec();

        months.sort((a, b) => a.year - b.year || a.month - b.month);

        if (!months.length) {
          setLoading(false);
          return;
        }

        const linePoints: LinePoint[] = months.map((m) => ({
          month: MONTH_NAMES[m.month - 1],
          spending: Number(m.total),
        }));
        setSpendingData(linePoints);

        const last = months[months.length - 1];
        setLastMonthData([
          { name: "Wants", value: Number(last.wants), color: "blue" },
          { name: "Needs", value: Number(last.needs), color: "green" },
          { name: "Savings", value: Number(last.savings), color: "orange" },
        ]);

        const currentYear = last.year;
        const yearEntries = months.filter((m) => m.year === currentYear);
        const yearTotals = {
          wants: yearEntries.reduce((sum, m) => sum + Number(m.wants), 0),
          needs: yearEntries.reduce((sum, m) => sum + Number(m.needs), 0),
          savings: yearEntries.reduce((sum, m) => sum + Number(m.savings), 0),
        };
        setCurrentYearData([
          { name: "Wants", value: yearTotals.wants, color: "blue" },
          { name: "Needs", value: yearTotals.needs, color: "green" },
          { name: "Savings", value: yearTotals.savings, color: "orange" },
        ]);

        setLoading(false);
      } catch (err) {
        console.error("Failed to load finance data:", err);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full flex justify-center pt-4 px-2 sm:px-4">
      <div className="relative max-w-xl w-full">
        <Carousel className="w-full">
          <CarouselContent className="px-8">
            {/* line chart for spending over time */}
            <CarouselItem>
              <div className="p-4 border rounded-xl bg-white">
                <h2 className="text-center text-xl font-bold">Spending Over Time</h2>
                <div style={{ width: "100%", height: 300 }}>
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

            {/* pie chart for prev month budget */}
            <CarouselItem>
              <div className="p-4 border rounded-xl bg-white">
                <h2 className="text-center text-xl font-bold">Last Month</h2>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={lastMonthData} dataKey="value" nameKey="name" label>
                        {lastMonthData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CarouselItem>

            {/* pie chart for current year budgets */}
            <CarouselItem>
              <div className="p-4 border rounded-xl bg-white">
                <h2 className="text-center text-xl font-bold">Current Year Totals</h2>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={currentYearData} dataKey="value" nameKey="name" label>
                        {currentYearData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* arrows to move between graphs */}
          <CarouselPrevious className="left-2 w-10 h-10 rounded-full bg-white text-blue-500 flex items-center justify-center">
            &lt;
          </CarouselPrevious>
          <CarouselNext className="right-2 w-10 h-10 rounded-full bg-white text-blue-500 flex items-center justify-center">
            &gt;
          </CarouselNext>


        </Carousel>
      </div>
    </div>

  );
}