import expect from 'expect';
import { formatAuthorsForDropdown } from './selectors';

describe("Authors selectors", () => {
  describe('formatAuthorsForDropdown', () => {
    it('should return authors data formatted for use in a dropdown', () => {
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
        }
      ];

      const expected = [
        {
          value: 'cory-house',
          text: 'Cory House'
        },
        {
          value: 'scott-allen',
          text: 'Scott Allen'
        }
      ];

      expect(formatAuthorsForDropdown(authors)).toEqual(expected);
    });
  });
});

