import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const authors = [
  {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House'
  },
  {
    id: 'scott-allen',
    firstName: 'Scott',
    lastName: 'Allen'
  },
  {
    id: 'dan-wahlin',
    firstName: 'Dan',
    lastName: 'Wahlin'
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (author) => `${author.firstName.toLowerCase()}-${author.lastName.toLowerCase()}`;

class AuthorApi {
  static getAllAuthors() {
    return delay().then(() => [...authors]);
  }

  static saveAuthor(author) {
    /* eslint-disable no-param-reassign */
    author = Object.assign({}, author); // to avoid manipulating object passed in.
    return delay().then(() => {
      const minAuthorNameLength = 3;
      if (author.firstName.length < minAuthorNameLength) {
        return Promise.reject(`First Name must be at least ${minAuthorNameLength} characters.`);
      }

      if (author.lastName.length < minAuthorNameLength) {
        return Promise.reject(`Last Name must be at least ${minAuthorNameLength} characters.`);
      }

      if (author.id) {
        const existingAuthorIndex = authors.findIndex(a => a.id === author.id);
        authors.splice(existingAuthorIndex, 1, author);
      } else {
        //Just simulating creation here.
        //The server would generate ids for new authors in a real app.
        //Cloning so copy returned is passed by value rather than by reference.
        /* eslint-disable no-param-reassign */
        author.id = generateId(author);
        authors.push(author);
      }

      return author;
    });
  }

  static deleteAuthor(authorId) {
    return delay().then(() => {
      const indexOfAuthorToDelete = authors.findIndex(author => author.id === authorId);
      authors.splice(indexOfAuthorToDelete, 1);
      return authorId;
    });
  }
}

export default AuthorApi;