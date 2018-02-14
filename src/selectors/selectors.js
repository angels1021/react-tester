export const formatAuthorsForDropdown = (authors) => authors.map(author => ({
  value: author.id,
  text: `${author.firstName} ${author.lastName}`
}));

