// Component: BigNumber 
// Author: Ryan Gilbert
// Email: ryanjg@bu.edu

export default function BigNumber({ title, value, change }: { title: string, value: number, change: number }){

    const color = change > 0 ? "border-green-500" : "border-red-500";
    const changeClass = "border-3 w-32 aspect-square text-white bg-gray-600 rounded-lg flex flex-col items-center justify-center " + color;
    const changeText = (change > 0 ? "˄": "˅") + " $" + change;

    return (
        <div className={changeClass}>
            <p className="text-2xl p-2">{title}</p>
            <p className="text-3xl p-2">${value}</p>
            <p className="text-xl">{changeText}</p>
        </div>

    )
}