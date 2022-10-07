export default (findResult, findOneByIdResult) => ({
  find: jest.fn().mockResolvedValue(findResult),
  findOneBy: jest.fn().mockResolvedValue(findOneByIdResult),
  save: jest.fn(),
  delete: jest.fn().mockResolvedValue(true),
  createQueryBuilder: jest.fn(() => ({
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue(findResult),
  })),
});
