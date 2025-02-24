import { useEffect, useState } from "react"
import { Button } from "./theme";


export const Counter = () => {
    const [counter, setCounter] = useState<number>(() => {
        return Number(((localStorage.getItem("counter"))) || 0)
        }
    );
    const [history,setHistory] = useState<number[]>([0]);
    const [step ,setStep] = useState<number>(1);
    const [historyIndex, setHistoryIndex] = useState<number>(0);
    
    useEffect(() => {
        if (counter !== history[historyIndex]) {
            const newHistory = history.slice(0, historyIndex + 1); // Trim history ahead of index
            setHistory([...newHistory, counter]); 
            setHistoryIndex(newHistory.length);
        }
    }, [counter]);
    
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "+" || event.key === "=") {
                increaseCounter();
            } else if (event.key === "-") {
                decreaseCounter();
            } else if (event.ctrlKey && event.key === "z") {
                undoCounter();
            } else if (event.ctrlKey && event.key === "y") {
                redoCounter();
            }
        };
    
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [counter, historyIndex]); // Dependencies to ensure correct state updates

    const increaseCounter = () => {
        setCounter(prev => Math.min(prev + step, 100));
        console.log(history,counter)
    }
    const decreaseCounter = () => {
        setCounter(prev => Math.max(prev - step, 0))
        console.log(history,counter)
    }

    
    const undoCounter = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setCounter(history[historyIndex - 1]);
        }
    };

    const redoCounter = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setCounter(history[historyIndex + 1]);
        }
    };

    return (
        <div className="flex justify-center flex-col items-center absolute gap-5 inset-0 bg-orange-200">
            <p className={`text-red-500 text-md cursor-default ${counter>= 90? "opacity-100":"opacity-0"}`}>⚠️ Approaching limit!</p>
            <div className="flex gap-5 items-end">
                <Button onClick={decreaseCounter} disabled={counter === 0} className={counter === 0? "cursor-not-allowed":""}>-</Button>
                <div className="text-black text-9xl font-semibold">{counter? counter : 0}</div>
                <Button onClick={increaseCounter} disabled={counter === 100} className={counter === 100? "cursor-not-allowed":""}>+</Button>
            </div>
            <div className="flex gap-2">
                <input 
                    className="rounded-md bg-slate-800 p-2"
                    type="number" 
                    value={step}
                    min={0}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setStep(Math.max(1, parseFloat(e.target.value) || 1))}/>
                <Button theme="red" onClick={()=> setCounter(0)}>Reset</Button>
                <Button theme="green" onClick={()=> localStorage.setItem("counter",JSON.stringify(counter))}>Save</Button>
            </div>
            <div className="flex gap-2">
                <Button theme="light" size="large" onClick={undoCounter}>Undo</Button>
                <Button theme="light" size="large" onClick={redoCounter}>Redo</Button>
            </div>
        </div>
    )
}