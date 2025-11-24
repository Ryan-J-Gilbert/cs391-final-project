// Component: BigNumber 
// Author: Ryan Gilbert
// Email: ryanjg@bu.edu

export default function BigNumber({ title, value, change }: { title: string, value: number, change: number }){

    const color = change > 0 ? "text-green-500" : "text-red-500";
    const changeClass = "text-xl " + color;
    const changeText = (change > 0 ? "˄": "˅") + " $" + change;

    return (
        <div className="w-32 aspect-square bg-blue-500 rounded-lg flex flex-col items-center justify-center">
            <p className="text-2xl p-2">{title}</p>
            <p className="text-3xl p-2">${value}</p>
            <p className={changeClass}>{changeText}</p>
        </div>

    )
}