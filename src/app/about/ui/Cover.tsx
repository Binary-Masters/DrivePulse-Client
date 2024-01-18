import Image from "next/image"

export default function Cover() {
	return <div>
		
		<div className="relative">
			<Image 
				src="https://picsum.photos/2000/600"
				alt="Cover Photo"
				height={ 600 }
				width={ 2000 }
			/>
			{/* overlay */}
			<div className="absolute top-0 left-0 z-10 w-full h-full bg-gradient-to-br from-black">
				<h1 className="absolute text-6xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">About Us</h1>
			</div>
		</div>
	</div>
}
