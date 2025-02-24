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

const questions_Easy: Question[] = [
    {
        id: 1,
        question: "ما هو لون السماء في يوم مشمس؟",
        choices: [
            { id: "q1a", number: "A", answer: "أحمر", correct: false },
            { id: "q1b", number: "B", answer: "أزرق", correct: true },
            { id: "q1c", number: "C", answer: "أخضر", correct: false },
            { id: "q1d", number: "D", answer: "أصفر", correct: false }
        ]
    },
    {
        id: 2,
        question: "كم عدد الأرجل للقطة؟",
        choices: [
            { id: "q2a", number: "A", answer: "اثنين", correct: false },
            { id: "q2b", number: "B", answer: "أربعة", correct: true },
            { id: "q2c", number: "C", answer: "ستة", correct: false },
            { id: "q2d", number: "D", answer: "ثمانية", correct: false }
        ]
    },
    {
        id: 3,
        question: "ما هو اسم صغير الكلب؟",
        choices: [
            { id: "q3a", number: "A", answer: "جرو", correct: true },
            { id: "q3b", number: "B", answer: "هر", correct: false },
            { id: "q3c", number: "C", answer: "عجل", correct: false },
            { id: "q3d", number: "D", answer: "فرخ", correct: false }
        ]
    },
    {
        id: 4,
        question: "ما هو الشيء الذي كلما أخذت منه كبر؟",
        choices: [
            { id: "q4a", number: "A", answer: "الحفرة", correct: true },
            { id: "q4b", number: "B", answer: "القلم", correct: false },
            { id: "q4c", number: "C", answer: "الكتاب", correct: false },
            { id: "q4d", number: "D", answer: "الكأس", correct: false }
        ]
    },
    {
        id: 5,
        question: "ما هو الشهر الذي يحتوي على 28 يومًا؟",
        choices: [
            { id: "q5a", number: "A", answer: "فبراير", correct: false },
            { id: "q5b", number: "B", answer: "كل الشهور", correct: true },
            { id: "q5c", number: "C", answer: "مارس", correct: false },
            { id: "q5d", number: "D", answer: "يناير", correct: false }
        ]
    },
    {
        id: 6,
        question: "ما هو الحيوان الذي يُضرب به المثل في الذكاء؟",
        choices: [
            { id: "q6a", number: "A", answer: "الثعلب", correct: true },
            { id: "q6b", number: "B", answer: "الأسد", correct: false },
            { id: "q6c", number: "C", answer: "القرد", correct: false },
            { id: "q6d", number: "D", answer: "الببغاء", correct: false }
        ]
    },
    {
        id: 7,
        question: "ما هو الشيء الذي يسمع بلا أذن ويتكلم بلا لسان؟",
        choices: [
            { id: "q7a", number: "A", answer: "الصدى", correct: true },
            { id: "q7b", number: "B", answer: "الساعة", correct: false },
            { id: "q7c", number: "C", answer: "التلفاز", correct: false },
            { id: "q7d", number: "D", answer: "الهاتف", correct: false }
        ]
    },
    {
        id: 8,
        question: "ما هو الشيء الذي له أسنان ولكنه لا يعض؟",
        choices: [
            { id: "q8a", number: "A", answer: "المشط", correct: true },
            { id: "q8b", number: "B", answer: "الفرشاة", correct: false },
            { id: "q8c", number: "C", answer: "السلك", correct: false },
            { id: "q8d", number: "D", answer: "السكين", correct: false }
        ]
    },
    {
        id: 9,
        question: "ما هو الشيء الذي ينبض دون قلب؟",
        choices: [
            { id: "q9a", number: "A", answer: "الساعة", correct: true },
            { id: "q9b", number: "B", answer: "الهاتف", correct: false },
            { id: "q9c", number: "C", answer: "الراديو", correct: false },
            { id: "q9d", number: "D", answer: "الكاميرا", correct: false }
        ]
    },
    {
        id: 10,
        question: "ما هو الشيء الذي تملكه ولكن يستخدمه الآخرون أكثر منك؟",
        choices: [
            { id: "q10a", number: "A", answer: "الاسم", correct: true },
            { id: "q10b", number: "B", answer: "الهاتف", correct: false },
            { id: "q10c", number: "C", answer: "السيارة", correct: false },
            { id: "q10d", number: "D", answer: "الكتاب", correct: false }
        ]
    }
]

const questions_Medium: Question[] = [
    {
        id: 1,
        question: "ما هو العنصر الكيميائي الذي يرمز له بالرمز 'O'؟",
        choices: [
            { id: "q1a", number: "A", answer: "ذهب", correct: false },
            { id: "q1b", number: "B", answer: "أكسجين", correct: true },
            { id: "q1c", number: "C", answer: "فضة", correct: false },
            { id: "q1d", number: "D", answer: "حديد", correct: false }
        ]
    },
    {
        id: 2,
        question: "من هو مؤلف رواية 'البؤساء'؟",
        choices: [
            { id: "q2a", number: "A", answer: "فيكتور هوغو", correct: true },
            { id: "q2b", number: "B", answer: "تشارلز ديكنز", correct: false },
            { id: "q2c", number: "C", answer: "دوستويفسكي", correct: false },
            { id: "q2d", number: "D", answer: "نجيب محفوظ", correct: false }
        ]
    },
    {
        id: 3,
        question: "ما هو الكوكب الأقرب إلى الشمس؟",
        choices: [
            { id: "q3a", number: "A", answer: "الزهرة", correct: false },
            { id: "q3b", number: "B", answer: "عطارد", correct: true },
            { id: "q3c", number: "C", answer: "الأرض", correct: false },
            { id: "q3d", number: "D", answer: "المريخ", correct: false }
        ]
    },
    {
        id: 4,
        question: "ما هو العدد الأولي من بين الأعداد التالية؟",
        choices: [
            { id: "q4a", number: "A", answer: "15", correct: false },
            { id: "q4b", number: "B", answer: "19", correct: true },
            { id: "q4c", number: "C", answer: "21", correct: false },
            { id: "q4d", number: "D", answer: "25", correct: false }
        ]
    },
    {
        id: 5,
        question: "في أي عام حدثت الحرب العالمية الثانية؟",
        choices: [
            { id: "q5a", number: "A", answer: "1939", correct: true },
            { id: "q5b", number: "B", answer: "1914", correct: false },
            { id: "q5c", number: "C", answer: "1945", correct: false },
            { id: "q5d", number: "D", answer: "1950", correct: false }
        ]
    },
    {
        id: 6,
        question: "ما هو البحر الذي يحيط بالمملكة العربية السعودية من الغرب؟",
        choices: [
            { id: "q6a", number: "A", answer: "البحر الأسود", correct: false },
            { id: "q6b", number: "B", answer: "المحيط الأطلسي", correct: false },
            { id: "q6c", number: "C", answer: "البحر الأحمر", correct: true },
            { id: "q6d", number: "D", answer: "بحر العرب", correct: false }
        ]
    },
    {
        id: 7,
        question: "كم عدد الأضلاع في الشكل السداسي؟",
        choices: [
            { id: "q7a", number: "A", answer: "4", correct: false },
            { id: "q7b", number: "B", answer: "5", correct: false },
            { id: "q7c", number: "C", answer: "6", correct: true },
            { id: "q7d", number: "D", answer: "8", correct: false }
        ]
    },
    {
        id: 8,
        question: "ما هو العضو المسؤول عن ضخ الدم في جسم الإنسان؟",
        choices: [
            { id: "q8a", number: "A", answer: "الكبد", correct: false },
            { id: "q8b", number: "B", answer: "الرئتان", correct: false },
            { id: "q8c", number: "C", answer: "القلب", correct: true },
            { id: "q8d", number: "D", answer: "المعدة", correct: false }
        ]
    },
    {
        id: 9,
        question: "ما هو الاسم العلمي للماء؟",
        choices: [
            { id: "q9a", number: "A", answer: "H2O", correct: true },
            { id: "q9b", number: "B", answer: "CO2", correct: false },
            { id: "q9c", number: "C", answer: "O2", correct: false },
            { id: "q9d", number: "D", answer: "NaCl", correct: false }
        ]
    },
    {
        id: 10,
        question: "ما هو أكبر كوكب في المجموعة الشمسية؟",
        choices: [
            { id: "q10a", number: "A", answer: "المريخ", correct: false },
            { id: "q10b", number: "B", answer: "زحل", correct: false },
            { id: "q10c", number: "C", answer: "المشتري", correct: true },
            { id: "q10d", number: "D", answer: "الأرض", correct: false }
        ]
    }
];


const questions_Hard: Question[] = [
    {
        id: 1,
        question: "ما هو الاسم العلمي لعملية تكوين الجبال نتيجة اصطدام الصفائح التكتونية؟",
        choices: [
            { id: "q1a", number: "A", answer: "التعرية", correct: false },
            { id: "q1b", number: "B", answer: "الأوروجينيز", correct: true },
            { id: "q1c", number: "C", answer: "التصحر", correct: false },
            { id: "q1d", number: "D", answer: "الانجراف القاري", correct: false }
        ]
    },
    {
        id: 2,
        question: "ما هو العدد الذري لعنصر اليورانيوم؟",
        choices: [
            { id: "q2a", number: "A", answer: "82", correct: false },
            { id: "q2b", number: "B", answer: "92", correct: true },
            { id: "q2c", number: "C", answer: "94", correct: false },
            { id: "q2d", number: "D", answer: "96", correct: false }
        ]
    },
    {
        id: 3,
        question: "أي من النظريات التالية تفسر أصل الكون؟",
        choices: [
            { id: "q3a", number: "A", answer: "نظرية الأوتار", correct: false },
            { id: "q3b", number: "B", answer: "نظرية الانفجار العظيم", correct: true },
            { id: "q3c", number: "C", answer: "نظرية التطور", correct: false },
            { id: "q3d", number: "D", answer: "ميكانيكا الكم", correct: false }
        ]
    },
    {
        id: 4,
        question: "ما هو العضو الذي يُطلق عليه لقب 'مركز الذاكرة' في الدماغ البشري؟",
        choices: [
            { id: "q4a", number: "A", answer: "المخيخ", correct: false },
            { id: "q4b", number: "B", answer: "اللوزة الدماغية", correct: false },
            { id: "q4c", number: "C", answer: "قرن آمون (الحُصين)", correct: true },
            { id: "q4d", number: "D", answer: "النخاع المستطيل", correct: false }
        ]
    },
    {
        id: 5,
        question: "من هو الفيزيائي الذي وضع معادلة الموجة في ميكانيكا الكم؟",
        choices: [
            { id: "q5a", number: "A", answer: "ألبرت أينشتاين", correct: false },
            { id: "q5b", number: "B", answer: "ماكس بلانك", correct: false },
            { id: "q5c", number: "C", answer: "إرفين شرودنغر", correct: true },
            { id: "q5d", number: "D", answer: "نيلز بور", correct: false }
        ]
    },
    {
        id: 6,
        question: "ما هو أعلى جبل في النظام الشمسي؟",
        choices: [
            { id: "q6a", number: "A", answer: "جبل إيفرست", correct: false },
            { id: "q6b", number: "B", answer: "جبل مونا كيا", correct: false },
            { id: "q6c", number: "C", answer: "أوليمبوس مونس", correct: true },
            { id: "q6d", number: "D", answer: "ماونا لوا", correct: false }
        ]
    },
    {
        id: 7,
        question: "ما هو الاسم الذي يطلق على دراسة تأثير القوى على السوائل المتحركة؟",
        choices: [
            { id: "q7a", number: "A", answer: "الديناميكا الهوائية", correct: false },
            { id: "q7b", number: "B", answer: "الديناميكا الحرارية", correct: false },
            { id: "q7c", number: "C", answer: "الهيدروديناميكا", correct: true },
            { id: "q7d", number: "D", answer: "الميكانيكا الكلاسيكية", correct: false }
        ]
    },
    {
        id: 8,
        question: "ما هو أول عنصر تم اكتشافه بواسطة التحليل الطيفي؟",
        choices: [
            { id: "q8a", number: "A", answer: "الهيدروجين", correct: false },
            { id: "q8b", number: "B", answer: "الهيليوم", correct: true },
            { id: "q8c", number: "C", answer: "النيون", correct: false },
            { id: "q8d", number: "D", answer: "الأكسجين", correct: false }
        ]
    },
    {
        id: 9,
        question: "ما هو القانون الفيزيائي الذي ينص على أن لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه؟",
        choices: [
            { id: "q9a", number: "A", answer: "قانون حفظ الطاقة", correct: false },
            { id: "q9b", number: "B", answer: "قانون نيوتن الثالث", correct: true },
            { id: "q9c", number: "C", answer: "قانون الجاذبية", correct: false },
            { id: "q9d", number: "D", answer: "قانون الشغل والطاقة", correct: false }
        ]
    },
    {
        id: 10,
        question: "ما هو المصطلح الذي يطلق على المادة التي لا يمكن أن تمر عبرها الإلكترونات بحرية؟",
        choices: [
            { id: "q10a", number: "A", answer: "الموصل", correct: false },
            { id: "q10b", number: "B", answer: "العازل", correct: true },
            { id: "q10c", number: "C", answer: "شبه الموصل", correct: false },
            { id: "q10d", number: "D", answer: "الموصل الفائق", correct: false }
        ]
    }
];


const questionsDefecutity: any = {
    "Easy": questions_Easy,
    "Medium": questions_Medium,
    "Hard":questions_Hard
}

export const QuizApp = () => {
    const [defecultiy, setDificulty] = useState<string>("");
    const [selected, setSelected] = useState<boolean>(false);

    const handleDefecultySelection = (DEFECULITY: string) => {
        setDificulty(DEFECULITY);
        setSelected(true)
    }

    return (
        <div className="h-[100vh] w-full text-white bg-[linear-gradient(45deg,tomato,orange,tomato)] font-sans flex justify-center flex-col gap-5 items-center p-4 md:p-0">
            <h1 className="text-6xl text-slate-900 font-bold">Quiz App</h1>
            {selected? <Quiz defecultiy={defecultiy} />: 
            <div className="flex flex-col items-center justify-center">
                <DefecultyButton onClick={()=>handleDefecultySelection("Easy")}>Easy</DefecultyButton>
                <DefecultyButton onClick={()=>handleDefecultySelection("Medium")}>Medium</DefecultyButton>
                <DefecultyButton onClick={()=>handleDefecultySelection("Hard")}>Hard</DefecultyButton>
            </div> }
        </div>
    )
}

const DefecultyButton = ({children, onClick}:{children?: React.ReactNode, onClick?: any}) => {
    return (
        <button onClick={onClick} className="text-black bg-slate-200 rounded-full w-52 py-3 mb-3 shadow-md border border-slate-300 active:scale-95">{children}</button>
    )
}

const Quiz = ({defecultiy}:{defecultiy:string}) => {
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [buttonState, setButtonState] = useState<boolean>(false);

    const buttonColors: backgroundColors = {
        "DEFAULT": "bg-slate-200",
        "CORRECT": "bg-emerald-400",
        "WRONG": "bg-red-400"
    }
    
    const handleNextQuestion = () => {
        if (!buttonState) { return }
        if ((questionIndex === (questionsDefecutity[defecultiy]).length - 1)) { setFinished(true); return }
        else { setQuestionIndex(questionIndex + 1) }
    }



    const restartQuiz = () => {
        setQuestionIndex(0);
        setScore(0)
        setFinished(false)
        setSelected(false)
        setDificulty("")
    }

    return (
        <>
            <div className="bg-slate-700 md:px-7 md:pt-10 md:pb-8 px-5 pt-6 pb-5 rounded-lg flex flex-col items-end">

                {finished ?
                    <div className="text-center text-4xl">
                        <h1>Your Final Score is <br /> {score} / {questionsDefecutity[defecultiy].length}</h1>
                        <button className="bg-emerald-300 text-black rounded-full px-4 py-2 text-lg mt-4" onClick={restartQuiz}>Restart Quize</button>
                    </div>
                    : <Questions defecultiy={defecultiy} buttonColors={buttonColors} questionIndex={questionIndex} setScore={setScore} buttonState={buttonState} setButtonState={setButtonState} />}
                {!finished &&
                    <div className="flex justify-between items-center w-full pl-2 -mb-3">
                        <div className="pt-2">{questionIndex + 1} / {questionsDefecutity[defecultiy].length}</div>
                        <button className="text-xl pr-2 pl-4 pb-2 pt-4 active:scale-95" onClick={handleNextQuestion}>{questionIndex === questionsDefecutity[defecultiy].length - 1 ? "Finsh" : "Next"}</button>
                    </div>}
            </div>
        </>
    )
}

const Questions = ({ buttonColors, questionIndex, setScore, buttonState, setButtonState,defecultiy }: {defecultiy:string, buttonColors: backgroundColors, questionIndex: number, setScore: any, buttonState: boolean, setButtonState: any }) => {
    const [choose, setChoose] = useState<string | null>(null);


    useEffect(() => {
        setButtonState(false)
    }, [questionIndex])

    const handleButtonClick = (buttonID: string, correct: boolean) => {
        if (!buttonState) {
            setButtonState(true)
            if (choose === buttonID) {
                setChoose(null)
            } else { setChoose(buttonID) }
            if (correct) { setScore((prevScore: number) => prevScore + 1) }
        }
    }

    const { id, question, choices } = questionsDefecutity[defecultiy][questionIndex];

    return (
        <>
            <div key={id}>
                <h3 className="mb-5 text-xl md:text-2xl max-w-[60ch]">{id}- {question}</h3>
                <ul className="grid grid-cols-[auto_auto] gap-5 [&_button]:rounded-full [&_button]:text-black [&_span]:bg-blue-300 [&_span]:rounded-full
                     [&_button]:flex [&_span]:w-8 [&_span]:h-8 [&_span]:flex [&_span]:items-center
                      [&_span]:justify-center [&_button]:items-center [&_button]:pr-4 [&_button]:p-1 [&_span]:mr-2 [&_span]:max-h-6 [&_span]:md:max-h-none [&_li]:flex [&_li]:justify-start">
                    {choices.map(({ id, answer, number, correct }:any) => (
                        <li key={id}>
                            <button className={`${buttonState && correct ? buttonColors.CORRECT : (choose === id && !correct) ? buttonColors.WRONG : buttonColors.DEFAULT} text-md md:text-lg`} onClick={() => handleButtonClick(id, correct)}>
                                <span>{number}</span>{answer}
                            </button>
                        </li>

                    ))}
                </ul>
            </div>
        </>
    )
} 
