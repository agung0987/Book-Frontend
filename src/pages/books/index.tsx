import { BooksType } from "@/types/books.type";
import BookView from "../views/book";

const BookPage = (props: {books: BooksType[]}) => {
    const {books} = props;
    return (
        <div>
            <BookView books={books}/>
        </div>
      );
}

export default BookPage;

export async function getServerSideProps() {
    // fetch data 
    const res = await fetch('http://127.0.0.1:3000/api/books');
    const response  = await res.json();

    return {
        props: {
            books: response.data
        }
    }
}