const sinon = require('sinon');
const fs = require('fs');
const mockFs = () => {
  return {
    writeFile() {

    }
  }
}
const Io = require('./io');
const io = Io(mockFs);
const db = [];

test('IO save should create store.db if not exist', () => {
  // const fsWriteFile = sinon.spy(mockFs, 'writeFile');
	// 	keyvalue.createNew(TEST_KEY);

	// 	expect(storeAddSpy.callCount).toBe(1);
	// 	storeAddSpy.restore();
  
  // io.save(db);
  
  // console.log(fs.existsSync("store.db"));

  //expect(fs.existsSync("store.db")).toBeTruthy();
});