import { BooksType } from "@/types/books.type";
import BooksView from "../views/book";

const Keyword = async (props: {keyword: BooksType[]})=>{
    const {keyword} = props;
    const res = await fetch(`http://127.0.0.1:3000/api/books?sortByTitle=${keyword}`);
    const response  = await res.json();
    return(
        <div>
            <BooksView />
        </div>
    );
}
export default Keyword;