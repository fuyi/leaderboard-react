jest.dontMock('../CmsStore');

// test getter
describe('CmsStore', function() {
 it('is initialized with empty object', function() {
   var cmsstore = require('../CmsStore');
   expect(cmsstore.getAll()).toEqual({});
 });
});

