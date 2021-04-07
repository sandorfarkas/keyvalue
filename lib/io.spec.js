const Io = require('./io');

test('save should not call writeFile if in memory DB', () => {
  const { writeFileSpy, io } = setup({ inMemoryDb: true });

  io.save([]);

  expect(writeFileSpy).not.toHaveBeenCalled();
});

test('save should call writeFile if not in memory DB', () => {
  const { writeFileSpy, io } = setup();

  io.save([]);

  expect(writeFileSpy).toHaveBeenCalled();
});

test('read should return elements from file if not in memory DB and file exist', () => {
  const { io } = setup();

  const result = io.read();

  expect(result.size).toBe(1);
});

test('read should return zero elements if in memory DB', () => {
  const { io } = setup({ inMemoryDb: true });

  const result = io.read();

  expect(result.size).toBe(0);
});

test('read should return zero elements if file not exist', () => {
  const { io } = setup({ existsSync: false });
  const result = io.read();

  expect(result.size).toBe(0);
});

const setup = ({ inMemoryDb = false, existsSync = true } = {}) => {
  const writeFileSpy = jest.fn();
  const fs = {
    writeFile: writeFileSpy,
    readFileSync: () => '[["",{}]]', // empty map as array
    existsSync: () => existsSync,
  };
  const io = Io({ inMemoryDb, _fs: fs });
  return { writeFileSpy, io };
};
