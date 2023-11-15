export const getSavedBookIds = () => { // getSavedBookIds() retrieves bookIds from localStorage using the getItem() method
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds; // If there are no saved bookIds, return a new array
};

export const saveBookIds = (bookIdArr) => { // saveBookIds() accepts a bookId as a parameter and saves it to localStorage using the setItem() method
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const removeBookId = (bookId) => { // removeBookId() accepts a bookId as a parameter and removes the book from localStorage using the getItem() method
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) { // if there are no saved bookIds, return false
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};
