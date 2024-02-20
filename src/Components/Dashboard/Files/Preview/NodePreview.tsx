import Image from "next/image";

interface NodePreviewChildren {
	thumbnail: string,
	height: number,
	width: number,
}

export default function NodePreview({thumbnail, height, width}: NodePreviewChildren) {
	console.log(thumbnail);
	return (
		<div>
			<Image 
				src={thumbnail}
				alt="Preview"
				width={ height }
				height={ width }
				className="w-full h-full rounded-md"
			/>
		</div>
	);
}
