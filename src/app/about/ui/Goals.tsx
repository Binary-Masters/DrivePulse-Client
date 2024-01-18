import Image from "next/image";

// TODO: Optimize code by not repeating
// TODO: Make responsive UI

export default function Goals() {
	return (
		<div className="container py-12 mx-auto space-y-8">
			{/* goals */}
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-around px-4 mx-auto">
				<div className="">
					<h2 className=" text-2xl  font-bold lg:text-3xl">Our Goals</h2>
					<p className="max-w-[700px] my-5">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu
						fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum.
					</p>
				</div>
				
				<Image
					src="https://picsum.photos/400"
					width={ 400 }
					height={ 400 }
					alt="Our goals image"
					className="rounded-lg md:mx-auto"
				/>
			</div>
			
			{/* visions */}
			<div className="flex flex-col gap-y-5 my-5 lg:flex-row-reverse items-center justify-around px-4">
				<div className="text-right">
					<h2 className="text-2xl  font-bold lg:text-3xl ">Our Visions</h2>
					<p className="max-w-[700px] my-5">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu
						fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum.
					</p>
				</div>
				
				<Image
					src="https://picsum.photos/400"
					width={ 400 }
					height={ 400 }
					alt="Our vision image"
					className="rounded-lg"
				/>
			</div>
		</div>
	);
}
