/*
 * History Page
 * Author: Seth Culberson
 * Email: sethculb@bu.edu
 * 
 * Page to display user's budgeting history.
 */

"use client";
import { useState, useEffect } from "react";
import { MonthEntry } from "@/types/MonthEntry";
import { getDatabase } from "../db";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function History() {
    const [entries, setEntries] = useState([] as MonthEntry[]);

    useEffect(() => {
        getDatabase().then((collection) => {
            const query = collection.finances.find();
            const _ = query.$.subscribe((months: MonthEntry[]) => {
                setEntries(months);
            })
        })
        .catch((err) => {
            console.error("Failed to fetch month entries:", err);
        });
    }, []);

    return (
        <div className="bg-white min-h-screen p-[calc(10px+2vw)]">
            <h2 className="text-[calc(12px+2vw)] text-center md:text-left">History | <Link href="/" className="hover:border-b-2 border-black text-[calc(12px+2vw)]">Back</Link></h2>
            {/* Mapping for each month entry to a display card. */}
            <ul className="">
            {entries.map((m : MonthEntry) => (
                <li key={m.id} className="flex flex-col border border-white rounded-md p-2 m-4">
                    <Card className="pl-[10%] pr-[10%] bg-gray-50 text-center">
                        <p className="text-[calc(12px+2vw)]">Date: {m.month+"/"+m.year}</p>
                        <div className="flex gap-4 justify-between pt-[calc(5px+1vw)] pb-[calc(5px+1vw)]">
                            <p className="inline text-blue-600 text-[calc(8px+2vw)]">Wants: ${m.wants}</p>
                            <p className="inline text-green-500 text-[calc(8px+2vw)]">Needs: ${m.needs}</p>
                            <p className="inline text-orange-500 text-[calc(8px+2vw)]">Savings: ${m.savings}</p>
                        </div>
                        <p className="text-[calc(12px+2vw)]">Total Budget: ${m.total}</p>
                    </Card>
                </li>
            ))}
            </ul>
        </div>
    );
}