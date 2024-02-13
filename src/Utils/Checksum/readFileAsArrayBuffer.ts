const readFileAsArrayBuffer = (file: Blob): Promise<ArrayBuffer> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result instanceof ArrayBuffer) {
				resolve(reader.result);
			} else {
				reject(new Error("Unexpected result type"));
			}
		};
		reader.onerror = () => {
			reject(new Error("Error reading file"));
		};
		reader.readAsArrayBuffer(file);
	});
};

export default readFileAsArrayBuffer;
