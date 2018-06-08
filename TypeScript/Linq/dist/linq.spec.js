// import('./linq');
// describe('Linq', () => {
//     let objectUnderTest: Array<EncounterPersonnel>;
//   beforeEach(() => {
//     objectUnderTest = new Array<EncounterPersonnel>();
//     objectUnderTest.push({ Id : 0, PersonnelTypeId: 1 } as EncounterPersonnel);
//     objectUnderTest.push({ Id : 1, PersonnelTypeId: 1 } as EncounterPersonnel);
//     objectUnderTest.push({ Id : 1, PersonnelTypeId: 10 } as EncounterPersonnel);
//     objectUnderTest.push({ Id : 3, PersonnelTypeId: 10 } as EncounterPersonnel);
//   });
//   it('first of default can find first item', () => {
//     let results = objectUnderTest.firstOrDefault((x) => x.Id === 1);
//     expect(results).toBeDefined();
//     expect(results.Id === 1).toBe(true);
//     expect(results.PersonnelTypeId === 1).toBe(true);
//   });
//   it('first of default can find first item', () => {
//     let results = objectUnderTest.firstOrDefault((x) => x.Id === 20);
//     expect(results).toBeNull();
//   });
// });
//# sourceMappingURL=linq.spec.js.map