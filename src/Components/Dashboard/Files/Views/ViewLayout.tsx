import FolderMoreInfo from "@/Components/FolderMorInfo/FolderMoreInfo";
import icons from "../icons";
import NodePreview from "../Preview/NodePreview";
import nodeClickHandler from "@/Utils/Files/nodeClickHandler";

interface ViewLayoutProps {
	hookPropObj: any;
	view: string;
}

export default function ViewLayout({ hookPropObj, view }: ViewLayoutProps) {
	// Get className, height, width etc properties according to view
	const getLayoutDataByView = (view: string) => {
		let gridClasses = "hidden";
		let thumbnailHeight = 0;
		let thumbnailWidth = 0;

		if (view === "medium") {
			gridClasses =
				"grid-cols-4 grid md:grid-cols-6 lg:grid-cols-10 gap-8";
			thumbnailHeight = 100;
			thumbnailWidth = 100;
		}
		if (view === "large") {
			gridClasses =
				"grid-cols-2 grid md:grid-cols-4 lg:grid-cols-6 gap-8";
			thumbnailHeight = 130;
			thumbnailWidth = 130;
		}

		return { gridClasses, thumbnailWidth, thumbnailHeight };
	};

	const { filesData, fileName, downloadUrl } = hookPropObj;
	const { gridClasses, thumbnailWidth, thumbnailHeight } =
		getLayoutDataByView(view);
	return (
		<div className={`${gridClasses} items-center mx-3`}>
			{filesData?.map((file, index) => (
				<div
					onClick={() =>
						nodeClickHandler(
							hookPropObj,
							file?.type,
							file?.fullPath
						)
					}
					className="relative cursor-pointer"
					key={index}
				>
					<div className="w-full">
						{file.contentType.startsWith("image/") ? (
							<NodePreview
								thumbnail={file.thumbnail}
								height={thumbnailHeight}
								width={thumbnailWidth}
							/>
						) : (
							icons?.map((elem) => {
								if (elem.contentType === file.contentType)
									return (
										<elem.icon className="w-full h-full text-white" />
									);
							})
						)}
					</div>
					<div>
						<h2 className="text-white">
							{(file?.name).slice(0, 10)}
						</h2>
					</div>
					<div className="absolute text-xl text-white -right-4 top-4">
						<FolderMoreInfo
							info={file}
							fileName={fileName}
							downloadUrL={downloadUrl}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
