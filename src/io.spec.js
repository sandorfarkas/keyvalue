const sinon = require('sinon');
const mockFs = () => {
  return {
    writeFile() {
    },
    readFileSync() {
      return '[["",{}]]'; // empty map as array
    },
    existsSync() {
    }
  }
}
const fs = mockFs();
const Io = require('./io');
const io = Io(fs);

test('save should call writeFile', () => {
  const fsWriteFileSpy = sinon.spy(fs, 'writeFile');

  io.save([]);

  expect(fsWriteFileSpy.callCount).toBe(1);
	fsWriteFileSpy.restore();
});

test('read should call readFileSync', () => {
  const fsReadFileSyncSpy = sinon.spy(fs, 'readFileSync');

  io.read();

  expect(fsReadFileSyncSpy.callCount).toBe(1);
	fsReadFileSyncSpy.restore();
});

test('fileExists should call existsSync', () => {
  const fsExistsSyncSpy = sinon.spy(fs, 'existsSync');

  io.fileExists();

  expect(fsExistsSyncSpy.callCount).toBe(1);
	fsExistsSyncSpy.restore();
});