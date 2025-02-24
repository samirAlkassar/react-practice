import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "blue" | "green" | "red";

export const Theme = () => {
    const [theme, setTheme] = useState<Theme>("light");
    const [fade, setFade] = useState(false);
  
    useEffect(() => {
      setFade(true);
      const timeout = setTimeout(() => setFade(false), 200); // Fade animation duration
      return () => clearTimeout(timeout);
    }, [theme]);
  
  interface backgroundColorType {
    "light": string,
    "dark":string,
    "blue":string,
    "green":string
    "red":string
  }
  interface themeButtonsType {
    id: number,
    theme: typeof theme,
    backgroundColor: string,
    textColor: string
  }
  const themeButtons: themeButtonsType[] = [
    { id: 1, theme: "light", backgroundColor: "bg-white", textColor: "text-black" },
    { id: 2, theme: "dark", backgroundColor: "bg-black", textColor: "text-white" },
    { id: 3, theme: "blue", backgroundColor: "bg-blue-500", textColor: "text-white" },
    { id: 4, theme: "green", backgroundColor: "bg-green-600", textColor: "text-white" },
    { id: 5, theme: "red", backgroundColor: "bg-red-600", textColor: "text-white" },
  ]
  const backgroundColor:backgroundColorType = {
    "light": "bg-slate-300",
    "dark": "bg-slate-900",
    "blue": "bg-sky-200",
    "green": "bg-emerald-200",
    "red": "bg-red-200"
  }
  return (
    <div className='flex flex-col gap-10 mt-6 justify-center items-center'>
      <div
        className={`transition-all duration-100 ease-in absolute inset-0 -z-30 ${fade ? "opacity-50" : "opacity-100"} ${backgroundColor[theme]}`} />
      <div className='flex gap-3'>
        {themeButtons.map(({ id, theme, backgroundColor, textColor }) => (
          <button
            key={id}
            onClick={() => (setTheme(theme))}
            className={`py-1 px-4 rounded-sm ${backgroundColor} ${textColor}`}>
            {theme}
            <span className='sr-only'>{`toggle ${theme} theme`}</span>
          </button>
        ))}
      </div>

      <Button size="small" theme={theme}>Click the button</Button>
    </div>
  )
}

export const Button = ({ theme = "light", size = "medium", children, className, onClick, disabled }: 
  { theme?: "light" | "dark" | "blue" | "green"|"red", 
    size?: "small" | "medium" | "large", 
    children?: React.ReactNode 
  className?: string
  onClick?:any
  disabled?:boolean}) => {
  const buttonSize = {
    "small": " bg-opacity-70 py-1 px-3 rounded-md shadow-md text-sm hover:bg-opacity-30 active:scale-95",
    "medium": "py-2 px-4 rounded-lg shadow-sm text-md hover:shadow-lg hover:bg-slate-600 active:scale-95",
    "large": " py-4 px-6 rounded-xl shadow-md text-xl hover:shadow-xl hover:scale-105 active:scale-95"
  }

  const buttonTheme = {
    "light": "bg-slate-700 text-white hover:bg-slate-600",
    "dark": "bg-white text-black hover:bg-gray-200",
    "blue": "bg-sky-600 text-white hover:bg-sky-500",
    "green": "bg-emerald-600 text-white hover:bg-emerald-500",
    "red": "bg-red-600 text-white hover:bg-red-500"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${className} transition-all duration-200 ease-in ${buttonSize[size]}
      ${buttonTheme[theme]
      }`}>
      {children}
      <span className='sr-only'>click button</span>
    </button>
  )
}