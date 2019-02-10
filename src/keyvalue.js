module.exports = Keyvalue;

function Keyvalue(Token) {
	return {
		createNew(key) {
			const newToken = Token().createNew();
			return this.validateKey(key) ? `${newToken}/${key}` : {};
		},
		validateKey(key) {
			for (const c of key) {
				if (isInvalidChar(c)) return false;
			}			
			return true;
		}
	}
}

function isInvalidChar(char) {
	const charCode = char.charCodeAt(0);
	return char == "." || char == "$" || char == "#" || char == "[" || char == "]" || char == "/" || (charCode >= 0 && charCode <= 31) || charCode == 127;
}