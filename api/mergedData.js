import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

// for merged promises
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
// GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
// GET AUTHOR
// Create an object that has book data and an object named authorObject
});

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((bookObject) => {
    const booksInside = bookObject.map((book) => getSingleBook(book.firebaseKey));
    Promise.all(booksInside).then(() => {
      getSingleAuthor(firebaseKey).then((authorObject) => resolve({ bookObject, authorObject }));
    });
  }).catch(reject);
});

export { getBookDetails, deleteAuthorBooksRelationship, getAuthorDetails };

// const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
//   getAuthorBooks(firebaseKey).then((bookObject) => {
//     for (const item in bookObject.author) {
//       getSingleAuthor(item.author_id).then((authorObject) => resolve({ ...bookObject, authorObject }));
//     }
//   }).catch(reject);
// });
