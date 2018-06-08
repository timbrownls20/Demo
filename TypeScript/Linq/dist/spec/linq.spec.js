//import('../linq');
describe('Test', function () {
    it('jasmine works', function () {
        expect(true).toBe(true);
    });
});
// describe('Linq', () => {
//   let objectUnderTest: Array<Personnel>;
//   beforeEach(() => {
//     objectUnderTest = new Array<Personnel>();
//     objectUnderTest.push({ Id : 0, PersonnelType: 1 } as Personnel);
//     objectUnderTest.push({ Id : 1, PersonnelType: 1 } as Personnel);
//     objectUnderTest.push({ Id : 1, PersonnelType: 10 } as Personnel);
//     objectUnderTest.push({ Id : 3, PersonnelType: 10 } as Personnel);
//   });
//   it('first of default can find first item', () => {
//     let results = objectUnderTest.firstOrDefault((x) => x.Id === 1);
//     expect(results).toBeDefined();
//     expect(results.Id === 1).toBe(true);
//     expect(results.PersonnelType === 1).toBe(true);
//   });
//   it('first of default can find first item', () => {
//     let results = objectUnderTest.firstOrDefault((x) => x.Id === 20);
//     expect(results).toBeNull();
//   });
// });
var Personnel = /** @class */ (function () {
    function Personnel() {
    }
    return Personnel;
}());
//# sourceMappingURL=linq.spec.js.map