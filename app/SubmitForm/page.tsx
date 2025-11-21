"use client";

import { useState } from "react";
import { MonthEntry } from "@/types/MonthEntry";

export default function SubmitForm() {
    const [month, setMonth] = useState<number | "">("");
    const [year, setYear] = useState<number | "">("");

    const [wants, setWants] = useState<string>("");
    const [needs, setNeeds] = useState<string>("");
    const [savings, setSavings] = useState<string>("");

    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

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

        const numWants = Number(wants);
        const numNeeds = Number(needs);
        const numSavings = Number(savings);

        const total = numWants + numNeeds + numSavings;

        const newEntry: MonthEntry = {
            month,
            year,
            wants: numWants,
            needs: numNeeds,
            savings: numSavings,
            total,
        };

        console.log("Submitted entry:", newEntry);
        alert("Report submitted!");

        // resets the fields
        setMonth(0);
        setYear(0);
        setWants("");
        setNeeds("");
        setSavings("");
        
        closeForm();
    }

    return (
        <main>
            <button onClick={openForm}>Add Monthly Report</button>

            {isFormOpen && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <h1>Budgeting Report Form</h1>

                        <label>Month:</label>
                        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                            <option value="">Select Month</option>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>

                        <label>Year:</label>
                        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
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

                        <label htmlFor="wants">Wants:</label>
                        <input
                            type="number"
                            id="wants"
                            value={wants}
                            onChange={(e) => setWants(e.target.value)}
                        />

                        <label htmlFor="needs">Needs:</label>
                        <input
                            type="number"
                            id="needs"
                            value={needs}
                            onChange={(e) => setNeeds(e.target.value)}
                        />

                        <label htmlFor="savings">Savings:</label>
                        <input
                            type="number"
                            id="savings"
                            value={savings}
                            onChange={(e) => setSavings(e.target.value)}
                        />

                        <button type="submit">Submit</button>
                        <button type="button" onClick={closeForm}>Cancel</button>
                    </form>
                </div>
            )}
        </main>
    );
}
