import "./BookPage.Module.css";
import BookTable from "../components/book/Book.Table";

const BooksPage = () => {
  return (
    <>
      <div className="book-page-container">
        <BookTable />
      </div>
    </>
  );
};

export default BooksPage;
