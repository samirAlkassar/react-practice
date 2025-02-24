import {useReducer } from "react";
import {Button} from "../components/theme"

type Book = {
    title: string,
    author: string,
    year: number,
    price: number
}
const booksData: Book[] = [
    { title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999, price: 25 },
    { title: "Clean Code", author: "Robert C. Martin", year: 2008, price: 30 },
    { title: "JavaScript: The Good Parts", author: "Douglas Crockford", year: 2008, price: 20 },
    { title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2011, price: 22 }
];

type Action = 
    | { type: "SORT_PRICE_LOW_TO_HIGH" }
    | { type: "SORT_PRICE_HIGH_TO_LOW" }
    | { type: "FILTER_BY_YEAR"; year: number }
    | { type: "RESET" };

//user reducer custom hook for filtring and sorting
const bookReducer = (state:Book[], action:Action): Book[] => {
    switch (action.type){
        case "SORT_PRICE_LOW_TO_HIGH":
            return [...state].sort((a,b)=> a.price - b.price);
        case "SORT_PRICE_HIGH_TO_LOW":
            return [...state].sort((a,b)=> b.price - a.price);
        case "FILTER_BY_YEAR":
            return state.filter(prev=> prev.year > action.year);
        case "RESET":
            return booksData;
        default:
            return state;
    }
};

export const useBooks = () => {
    const [books, dispatch] = useReducer(bookReducer, booksData);

    return{
    books,
    sortPriceLowToHigh: () => dispatch({type: "SORT_PRICE_LOW_TO_HIGH"}),
    sortPriceHighToLow: () => dispatch({type: "SORT_PRICE_HIGH_TO_LOW"}),
    filterByYear: (year: number) => dispatch({type: "FILTER_BY_YEAR",year}),
    restBooks: () => dispatch({type: "RESET"}),
    }
}

export const BookStore = () => {
    const {books, sortPriceHighToLow, sortPriceLowToHigh, filterByYear, restBooks}= useBooks();
    return (
        <div className="absolute inset-0 bg-slate-800 flex justify-center">
            <div className="mt-16">
                <h1 className="text-7xl font-bold mb-4 text-center">Book <span className="text-green-600">Store</span></h1>
                
                <div className="flex gap-2 mb-5 mt-10">
                    <Button onClick={sortPriceLowToHigh} size="small" theme="blue">sort: price low to high</Button>
                    <Button onClick={sortPriceHighToLow} size="small" theme="green">sort: price high to low</Button>
                    <Button onClick={()=>filterByYear(2000)} size="small" theme="dark">Books after year 2000</Button>
                    <Button onClick={restBooks} size="small" theme="light">reset</Button>
                </div>


                <Table columns={["Title", "Author", "Year", "Price"]} data={books} />
                
            </div>
        </div>
    )
}


type tableProps ={
    columns: string[];
    data: any[];
}
export const Table: React.FC<tableProps> = ({ columns, data }) => {
    return (
      <table className="border text-left">
        <thead>
          <tr className="[&_th]:border [&_th]:p-2 bg-slate-600 bg-opacity-40">
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="[&_td]:border [&_td]:p-2 [&_td]:pr-16 [&_td]:text-left">
              {columns.map((col) => (
                <td key={col}>{row[col.toLowerCase()]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };