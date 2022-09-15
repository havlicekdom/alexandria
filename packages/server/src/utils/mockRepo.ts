export default (findResult, findOneByIdResult) => ({
  find: jest.fn().mockResolvedValue(findResult),
  findOneBy: jest.fn().mockResolvedValue(findOneByIdResult),
  save: jest.fn(),
  delete: jest.fn().mockResolvedValue(true),
});
