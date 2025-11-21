/*
 * History Page
 * Author: Seth Culberson
 * Email: sethculb@bu.edu
 * 
 * Page to display user's budgeting history.
 */
"use client";
import { useState } from "react";
import { MonthEntry } from "@/types/MonthEntry";

export default function History({monthEntries} : {monthEntries: MonthEntry[]}) {
    const [entries, setEntries] = useState(monthEntries);

    return (
        <div className="">
            <h2 className="">History</h2>
            {entries.map((m : MonthEntry) => (
                <div key={String(m.month)+"/"+String(m.year)} className="">
                    <p className="">Date: {m.month+"/"+m.year}</p>
                    <p className="">Wants: ${m.wants}</p>
                    <p className="">Needs: ${m.needs}</p>
                    <p className="">Savings: ${m.savings}</p>
                    <p className="">Total Budget: ${m.total}</p>
                </div>
            ))}
        </div>
    );
}