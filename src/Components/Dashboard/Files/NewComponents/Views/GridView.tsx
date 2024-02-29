import { useState } from "react";
import handleOnClickNode from "@/Utils/Files/nodeEventHandlers/handleOnClickNode";
import icons from "../../icons";
import NodeThumbnail from "../../Thumbnail/NodeThumbnail";
import { FaFile } from "react-icons/fa";

export default function GridView({ hookPropObj }) {
	const { filesData } = hookPropObj;
	const [layoutSize, setLayoutSize] = useState<"small" | "medium" | "large">(
		"small"
	);

	let size = 18;
	if (layoutSize === "medium") size = 24;
	else if (layoutSize === "large") size = 32;
	size = size * 4; //converting tailwind unit into pixels

	return (
		<div className="flex items-center justify-start py-6 gap-6">
			{filesData.map(
				({ _id, name, thumbnail, type, fullPath, contentType }) => (
					<div
						onClick={() =>
							handleOnClickNode(hookPropObj, type, fullPath)
						}
						key={_id}
						className={`text-white`}
						style={{ width: size }}
					>
						{/* Node thumbnail or icon */}
						<div style={{ height: size }}>
							{thumbnail ? (
								<NodeThumbnail
									thumbnail={thumbnail}
									height={size}
									width={size}
								/>
							) : (
								<div style={{ fontSize: size }}>
									{icons.map((elem) => {
										if (elem.contentType === contentType)
											return <elem.icon />;
									})}
								</div>
							)}
						</div>

						{/* Node name */}
						<div className={`relative max-w-${size}`}>
							<p className="absolute w-full text-sm text-center">
								{/* Converting names into wrappable array of characters */}
								{name.split("").map((char: string) => (
									<span
										className="inline-block"
										key={_id + char}
									>
										{char}
									</span>
								))}
							</p>
						</div>
					</div>
				)
			)}
		</div>
	);
}
