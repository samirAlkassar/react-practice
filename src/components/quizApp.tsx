import { useEffect, useState } from "react"

type backgroundColors = {
    "DEFAULT": string
    "CORRECT": string
    "WRONG": string
}

type Button = {
    id: string,
    number: string,
    answer: string,
    correct: boolean
}

type Question = {
    id: number,
    question: string,
    choices: Button[]
}

const questions: Question[] = [
    {
        id: 1,
        question: "ما هو الكوكب الذي يُعرف باسم الكوكب الأحمر؟",
        choices: [
            { id: "q1a", "number": "A", "answer": "الزهرة", "correct": false },
            { id: "q1b", "number": "B", "answer": "المريخ", "correct": true },
            { id: "q1c", "number": "C", "answer": "المشتري", "correct": false },
            { id: "q1d", "number": "D", "answer": "زحل", "correct": false }
        ]
    },
    {
        id: 2,
        question: "ما هو أسرع حيوان بري في العالم؟",
        choices: [
            { id: "q2a", "number": "A", "answer": "الفهد", "correct": true },
            { id: "q2b", "number": "B", "answer": "الأسد", "correct": false },
            { id: "q2c", "number": "C", "answer": "النمر", "correct": false },
            { id: "q2d", "number": "D", "answer": "الذئب", "correct": false }
        ]
    },
    {
        id: 3,
        question: "ما هو العنصر الكيميائي الذي يرمز له بالرمز 'O'؟",
        choices: [
            { id: "q3a", "number": "A", "answer": "الهيدروجين", "correct": false },
            { id: "q3b", "number": "B", "answer": "الأوكسجين", "correct": true },
            { id: "q3c", "number": "C", "answer": "الكربون", "correct": false },
            { id: "q3d", "number": "D", "answer": "النيتروجين", "correct": false }
        ]
    },
    {
        id: 4,
        question: "ما هو أطول نهر في العالم؟",
        choices: [
            { id: "q4a", "number": "A", "answer": "نهر النيل", "correct": true },
            { id: "q4b", "number": "B", "answer": "نهر الأمازون", "correct": false },
            { id: "q4c", "number": "C", "answer": "نهر اليانغتسي", "correct": false },
            { id: "q4d", "number": "D", "answer": "نهر المسيسيبي", "correct": false }
        ]
    },
    {
        id: 5,
        question: "من هو مخترع المصباح الكهربائي؟",
        choices: [
            { id: "q5a", "number": "A", "answer": "نيكولا تسلا", "correct": false },
            { id: "q5b", "number": "B", "answer": "توماس إديسون", "correct": true },
            { id: "q5c", "number": "C", "answer": "ألبرت أينشتاين", "correct": false },
            { id: "q5d", "number": "D", "answer": "ألكسندر جراهام بيل", "correct": false }
        ]
    },
    {
        id: 6,
        question: "كم عدد الكواكب في المجموعة الشمسية؟",
        choices: [
            { id: "q6a", "number": "A", "answer": "7", "correct": false },
            { id: "q6b", "number": "B", "answer": "8", "correct": true },
            { id: "q6c", "number": "C", "answer": "9", "correct": false },
            { id: "q6d", "number": "D", "answer": "10", "correct": false }
        ]
    },
    {
        id: 7,
        question: "من هو أول رئيس للولايات المتحدة الأمريكية؟",
        choices: [
            { id: "q7a", "number": "A", "answer": "أبراهام لينكولن", "correct": false },
            { id: "q7b", "number": "B", "answer": "جورج واشنطن", "correct": true },
            { id: "q7c", "number": "C", "answer": "ثيودور روزفلت", "correct": false },
            { id: "q7d", "number": "D", "answer": "جون كينيدي", "correct": false }
        ]
    },
    {
        id: 8,
        question: "ما هو الحيوان الذي يُطلق عليه ملك الغابة؟",
        choices: [
            { id: "q8a", "number": "A", "answer": "النمر", "correct": false },
            { id: "q8b", "number": "B", "answer": "الأسد", "correct": true },
            { id: "q8c", "number": "C", "answer": "الدب", "correct": false },
            { id: "q8d", "number": "D", "answer": "الفيل", "correct": false }
        ]
    },
    {
        id: 9,
        question: "ما هو اسم أكبر محيط في العالم؟",
        choices: [
            { id: "q9a", "number": "A", "answer": "المحيط الهندي", "correct": false },
            { id: "q9b", "number": "B", "answer": "المحيط الأطلسي", "correct": false },
            { id: "q9c", "number": "C", "answer": "المحيط الهادئ", "correct": true },
            { id: "q9d", "number": "D", "answer": "المحيط المتجمد الشمالي", "correct": false }
        ]
    },
    {
        id: 10,
        question: "ما هو العنصر الأكثر وفرة في القشرة الأرضية؟",
        choices: [
            { id: "q10a", "number": "A", "answer": "الحديد", "correct": false },
            { id: "q10b", "number": "B", "answer": "الأوكسجين", "correct": true },
            { id: "q10c", "number": "C", "answer": "السيليكون", "correct": false },
            { id: "q10d", "number": "D", "answer": "الكربون", "correct": false }
        ]
    }
]
// const questions: Question[] = [
//     {
//         id: 1,
//         question: "What does HTML stand for?",
//         choices: [
//             { id: "q1a", number: "A", answer: "Hyper Trainer Marking Language", correct: false },
//             { id: "q1b", number: "B", answer: "Hyper Text Markup Language", correct: true },
//             { id: "q1c", number: "C", answer: "Hyper Transfer Machine Learning", correct: false },
//             { id: "q1d", number: "D", answer: "High Tech Modern Layout", correct: false }
//         ]
//     },
//     {
//         id: 2,
//         question: "Which of the following is NOT a valid HTML tag?",
//         choices: [
//             { id: "q2a", number: "A", answer: "<header>", correct: false },
//             { id: "q2b", number: "B", answer: "<blink>", correct: true },
//             { id: "q2c", number: "C", answer: "<article>", correct: false },
//             { id: "q2d", number: "D", answer: "<section>", correct: false }
//         ]
//     },
//     {
//         id: 3,
//         question: "What does the `z-index` property in CSS control?",
//         choices: [
//             { id: "q3a", number: "A", answer: "The horizontal position of an element", correct: false },
//             { id: "q3b", number: "B", answer: "The vertical position of an element", correct: false },
//             { id: "q3c", number: "C", answer: "The stacking order of elements", correct: true },
//             { id: "q3d", number: "D", answer: "The font size of an element", correct: false }
//         ]
//     },
//     {
//         id: 4,
//         question: "What is the purpose of `display: flex;` in CSS?",
//         choices: [
//             { id: "q4a", number: "A", answer: "Makes the element invisible", correct: false },
//             { id: "q4b", number: "B", answer: "Enables flexible box layout for positioning elements", correct: true },
//             { id: "q4c", number: "C", answer: "Centers an element vertically", correct: false },
//             { id: "q4d", number: "D", answer: "Changes text color", correct: false }
//         ]
//     },
//     {
//         id: 5,
//         question: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
//         choices: [
//             { id: "q5a", number: "A", answer: "var x = 10;", correct: false },
//             { id: "q5b", number: "B", answer: "let x = 10;", correct: false },
//             { id: "q5c", number: "C", answer: "const x = 10;", correct: false },
//             { id: "q5d", number: "D", answer: "define x = 10;", correct: true }
//         ]
//     },
//     {
//         id: 6,
//         question: "What does `===` do in JavaScript?",
//         choices: [
//             { id: "q6a", number: "A", answer: "Checks for value equality only", correct: false },
//             { id: "q6b", number: "B", answer: "Checks for both value and type equality", correct: true },
//             { id: "q6c", number: "C", answer: "Assigns a value", correct: false },
//             { id: "q6d", number: "D", answer: "Compares only numbers", correct: false }
//         ]
//     },
//     {
//         id: 7,
//         question: "What is the purpose of the `useEffect` hook in React?",
//         choices: [
//             { id: "q7a", number: "A", answer: "To fetch data and perform side effects", correct: true },
//             { id: "q7b", number: "B", answer: "To create components", correct: false },
//             { id: "q7c", number: "C", answer: "To update the UI immediately", correct: false },
//             { id: "q7d", number: "D", answer: "To replace `useState`", correct: false }
//         ]
//     },
//     {
//         id: 8,
//         question: "What does JSX stand for?",
//         choices: [
//             { id: "q8a", number: "A", answer: "JavaScript XML", correct: true },
//             { id: "q8b", number: "B", answer: "Java Syntax Extension", correct: false },
//             { id: "q8c", number: "C", answer: "JavaScript Extended", correct: false },
//             { id: "q8d", number: "D", answer: "JSON XML", correct: false }
//         ]
//     },
//     {
//         id: 9,
//         question: "Which of the following is NOT a React hook?",
//         choices: [
//             { id: "q9a", number: "A", answer: "useState", correct: false },
//             { id: "q9b", number: "B", answer: "useEffect", correct: false },
//             { id: "q9c", number: "C", answer: "useRender", correct: true },
//             { id: "q9d", number: "D", answer: "useRef", correct: false }
//         ]
//     },
//     {
//         id: 10,
//         question: "What does `event.preventDefault()` do in JavaScript?",
//         choices: [
//             { id: "q10a", number: "A", answer: "Stops the default behavior of an event", correct: true },
//             { id: "q10b", number: "B", answer: "Deletes an event", correct: false },
//             { id: "q10c", number: "C", answer: "Prevents a JavaScript error", correct: false },
//             { id: "q10d", number: "D", answer: "Creates a new event", correct: false }
//         ]
//     }
// ];


export const QuizApp = () => {
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [buttonState, setButtonState] = useState<boolean>(false);

    const handleNextQuestion = () => {
        if (!buttonState) {return}
        if ((questionIndex === questions.length - 1)) { setFinished(true); return}
        else { setQuestionIndex(questionIndex + 1) }
    }

    const buttonColors: backgroundColors = {
        "DEFAULT": "bg-slate-200",
        "CORRECT": "bg-emerald-400",
        "WRONG": "bg-red-400"
    }

    const restartQuiz = () => {
        setQuestionIndex(0);
        setScore(0)
        setFinished(false)
    }

    return (
        <div className="h-[100vh] w-full bg-[linear-gradient(45deg,tomato,orange,tomato)] font-sans flex justify-center flex-col gap-5 items-center p-4 md:p-0">
            <h1 className="text-6xl text-slate-900 font-bold">Quiz App</h1>
            <div className="bg-slate-700 md:px-7 md:pt-10 md:pb-8 px-5 pt-6 pb-5 rounded-lg flex flex-col items-end">

                {finished? 
                <div className="text-center text-4xl">
                    <h1>Your Final Score is <br/> {score} / {questions.length}</h1>
                    <button className="bg-emerald-300 text-black rounded-full px-4 py-2 text-lg mt-4" onClick={restartQuiz}>Restart Quize</button>
                    </div>
                 : <Questions buttonColors={buttonColors} questionIndex={questionIndex} setScore={setScore} buttonState={buttonState} setButtonState={setButtonState} />}
                {!finished && 
                <div className="flex justify-between items-center w-full pl-2 -mb-3">
                    <div className="pt-2">{questionIndex + 1} / {questions.length}</div>
                    <button className="text-xl pr-2 pl-4 pb-2 pt-4 active:scale-95" onClick={handleNextQuestion}>{questionIndex === questions.length - 1 ? "Finsh" : "Next"}</button>
                </div>}
            </div>
        </div>
    )
}



const Questions = ({ buttonColors, questionIndex,setScore,buttonState ,setButtonState }: { buttonColors: backgroundColors, questionIndex: number,setScore: any, buttonState: boolean, setButtonState: any}) => {
    const [choose, setChoose] = useState<string | null>(null);


    useEffect(() => {
        setButtonState(false)
    }, [questionIndex])

    const handleButtonClick = (buttonID: string,correct:boolean) => {
        if (!buttonState) {
            setButtonState(true)
            if (choose === buttonID) {
                setChoose(null)
            } else { setChoose(buttonID) }
            if (correct){setScore((prevScore: number) => prevScore + 1)}
        }
    }

    const { id, question, choices } = questions[questionIndex];

    return (
        <>
                <div key={id}>
                    <h3 className="mb-5 text-xl md:text-2xl max-w-[60ch]">{id}- {question}</h3>
                    <ul className="grid grid-cols-[auto_auto] gap-5 [&_button]:rounded-full [&_button]:text-black [&_span]:bg-blue-300 [&_span]:rounded-full
                     [&_button]:flex [&_span]:w-8 [&_span]:h-8 [&_span]:flex [&_span]:items-center
                      [&_span]:justify-center [&_button]:items-center [&_button]:pr-4 [&_button]:p-1 [&_span]:mr-2 [&_span]:max-h-6 [&_span]:md:max-h-none [&_li]:flex [&_li]:justify-start">
                        {choices.map(({ id, answer, number, correct }) => (
                            <li key={id}>
                                <button className={`${buttonState && correct ? buttonColors.CORRECT : buttonColors.DEFAULT}
                                 ${choose === id && !correct && buttonColors.WRONG} text-md md:text-lg`} onClick={() => handleButtonClick(id,correct)}>
                                    <span>{number}</span>{answer}
                                </button>
                            </li>

                        ))}
                    </ul>
                </div>
        </>
    )
} 