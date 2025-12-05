// Component: Report Form
// Author: Jason Lian
// Email: jlian16@bu.edu


"use client";
import { getDatabase } from "../db";
import { useState } from "react";
import { MonthEntry } from "@/types/MonthEntry";
import Link from "next/link";

export default function Report() {
    const [month, setMonth] = useState<number | "">("");
    const [year, setYear] = useState<number | "">("");

    const [wants, setWants] = useState<string>("");
    const [needs, setNeeds] = useState<string>("");
    const [savings, setSavings] = useState<string>("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!month || !year) {
            alert("Please select a month and year.");
            return;
        }

        if (wants === "" || needs === "" || savings === "") {
            alert("Please enter all fields.");
            return;
        }

        if (parseInt(wants) < 0  || parseInt(needs) < 0 || parseInt(savings) < 0) {
            alert("Fields can not be negative.");
            return;
        }

        const numWants = Number(wants);
        const numNeeds = Number(needs);
        const numSavings = Number(savings);

        const total = numWants + numNeeds + numSavings;

        const newEntry: MonthEntry = {
            id: crypto.randomUUID(), // creates secure random ID
            month,
            year,
            wants: numWants,
            needs: numNeeds,
            savings: numSavings,
            total,
        };

        console.log("Submitted entry:", newEntry);
                getDatabase()
            .then((collection) => {
                collection.finances.insert({
                    ...newEntry
                })
            })
            .catch((err) => {
                console.error("Failed to submit report:", err);
            });
        alert("Report submitted!");

        // resets the fields
        setMonth(0);
        setYear(0);
        setWants("");
        setNeeds("");
        setSavings("");
        
    }

    return (
    <main className="flex flex-col items-center py-10">
        <div className="mt-8 w-full bg-white shadow-xl rounded-xl p-6 border max-w-[70%] md:max-w-sm ">
            <form onSubmit={handleSubmit} className="space-y-5">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Budgeting Report Form
                </h1>

                {/* Month */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Month</label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Select Month</option>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Year */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Year</label>
                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Select Year</option>
                        {Array.from({ length: 10 }).map((_, i) => {
                            const y = 2020 + i;
                            return (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Wants */}
                <div className="flex flex-col">
                    <label htmlFor="wants" className="mb-1 font-medium">Wants</label>
                    <input
                        type="number"
                        id="wants"
                        value={wants}
                        onChange={(e) => setWants(e.target.value)}
                        className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Needs */}
                <div className="flex flex-col">
                    <label htmlFor="needs" className="mb-1 font-medium">Needs</label>
                    <input
                        type="number"
                        id="needs"
                        value={needs}
                        onChange={(e) => setNeeds(e.target.value)}
                        className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Savings */}
                <div className="flex flex-col">
                    <label htmlFor="savings" className="mb-1 font-medium">Savings</label>
                    <input
                        type="number"
                        id="savings"
                        value={savings}
                        onChange={(e) => setSavings(e.target.value)}
                        className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <br />

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
                    >
                        Submit
                    </button>
        
                    <Link href="/">
                        <button
                            type="button"
                            className="px-5 py-2 bg-gray-300 text-black rounded-md shadow hover:bg-gray-400 transition"
                        >
                            Back/Cancel
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    </main>
);

}

