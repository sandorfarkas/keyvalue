const sinon = require('sinon');
const Io = require('./io');
let fs;
let io;

beforeEach(() => {
  fs = {
    writeFile() {
    },
    readFileSync() {
      return '[["",{}]]'; // empty map as array
    },
    existsSync() {
      return true;
    }
  };
  io = Io({inMemoryDb: false, _fs: fs});
});

test('save should not call writeFile if in memory DB', () => {
  const fsWriteFileSpy = sinon.spy(fs, 'writeFile');
  io = Io({inMemoryDb: true, fs});

  io.save([]);

  expect(fsWriteFileSpy.callCount).toBe(0);
  fsWriteFileSpy.restore();
});

test('save should call writeFile if not in memory DB', () => {
  const fsWriteFileSpy = sinon.spy(fs, 'writeFile');

  io.save([]);

  expect(fsWriteFileSpy.callCount).toBe(1);
  fsWriteFileSpy.restore();
});

test('read should return elements from file if not in memory DB and file exist', () => {
  const result = io.read();

  expect(result.size).toBe(1);
});

test('read should return zero elements if in memory DB', () => {
  io = Io({inMemoryDb: true, _fs: fs});
  const result = io.read();

  expect(result.size).toBe(0);
});

test('read should return zero elements if file not exist', () => {
  fs = {
    existsSync() {
      return false;
    }
  };

  io = Io({inMemoryDb: false, _fs: fs});
  const result = io.read();

  expect(result.size).toBe(0);
});
