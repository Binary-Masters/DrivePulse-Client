import useGetFiles from "@/Hooks/useGetFiles";
import { useState } from "react";

export default function GridView() {
	const { filesData } = useGetFiles();
	const [layoutSize, setLayoutSize] = useState<"small" | "medium" | "large">(
		"medium"
	);

	let size = 12;
	if (layoutSize === "medium") size = 24;
	else if (layoutSize === "large") size = 32;
	
	const handleOnClickFolder = () => {

	}
	
	const handleOnClickFile = () => {

	}

	return (
		<div className="flex items-center justify-start gap-4">
			{filesData.map(({ _id, name, thumbnail }) => (
				<div key={_id} className={`text-white w-${size}`}>
					
					{/* Node thumbnail or icon */}
					<div className={`h-${size} border`}>
						{thumbnail && "thumbnail exists"}
					</div>
					
					{/* Node name */}
					<div className={`relative max-w-${size}`}>
						<p className="absolute w-full text-center">
							{/* Converting names into wrappable array of characters */}
							{name.split("").map((char: string) => (
								<span className="inline-block" key={_id + char}>
									{char}
								</span>
							))}
						</p>
					</div>
					
				</div>
			))}
		</div>
	);
}
