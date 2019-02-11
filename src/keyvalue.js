function Keyvalue(Token, store) {
	return {
		createNew(key) {
			if (!this.validateKey(key)) {
				return {};
			}
			const newToken = Token().createNew();
			const entry = { token: newToken, key: key };
			store.add(entry);
			return entry;
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

module.exports = Keyvalue;