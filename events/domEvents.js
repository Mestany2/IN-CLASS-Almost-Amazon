import { getAuthors, getSingleAuthor } from '../api/authorData';
import { deleteBook, getBooks, getSingleBook } from '../api/bookData';
import { deleteAuthorBooksRelationship, getAuthorDetails, getBookDetails } from '../api/mergedData';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import viewAuthor from '../pages/viewAuthor';
import viewBook from '../pages/viewBook';

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(() => {
          getBooks(user.uid).then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(user);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(user, bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      console.warn('VIEW BOOK', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');
      getBookDetails(firebaseKey).then(viewBook);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE AUTHOR', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors(user.uid).then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm(user);
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((bookObj) => addAuthorForm(bookObj));
    }

    if (e.target.id.includes('view-author-btn')) {
      console.warn('VIEW author', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');
      getAuthorDetails(firebaseKey).then(viewAuthor);
    }
  });
};
// CLICK EVENT EDITING/UPDATING AN AUTHOR

export default domEvents;
