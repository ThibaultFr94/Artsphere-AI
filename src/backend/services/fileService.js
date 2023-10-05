const getExtensionFromMimeType = (mimeType) => {
	const extensions = {
		"image/jpeg": "jpg",
		"image/png": "png",
		"image/gif": "gif",
		"image/webp": "webp",
		"image/avif": "avif",
		"image/svg+xml": "svg",
	};

	return extensions[mimeType];
};

export { getExtensionFromMimeType };
