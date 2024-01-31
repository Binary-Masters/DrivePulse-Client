/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import img1 from "../../assests/images/about3.jpg"
import img2 from "../../assests/images/about4.jpg"
// TODO: Optimize code by not repeating
// Done: Make responsive UI

export default function Goals() {
	return (
		<div className="container py-12 mx-auto space-y-8">
			{/* goals */}
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-around px-4 mx-auto">
				<div className="">
					<h2 className=" text-3xl  font-bold lg:text-3xl text-slate-200">Our <span className="text-primary">Goals</span></h2>
					<p className="max-w-[700px] my-5 text-slate-200">
					At DrivePulse, we believe in the power of collaboration. Our platform is designed to seamlessly connect individuals and teams, enabling them to share files effortlessly and work together towards common goals. Whether you're a freelancer, a small business, or a large corporation, DrivePulse provides the tools you need to streamline your workflow and boost productivity. With advanced features and intuitive design, we're here to empower your success through effective file sharing
					</p>
				</div>
				
				<Image
					src={img1}
					width={ 400 }
					height={ 400 }
					alt="Our goals image"
					className="rounded-lg md:mx-auto"
				/>
			</div>
			
			{/* visions */}
			<div className="flex flex-col gap-y-5 my-5 lg:flex-row-reverse items-center justify-around px-4">
				<div className="text-right">
					<h2 className="text-2xl  font-bold lg:text-3xl text-slate-200"><span className="text-primary">Our </span>Visions</h2>
					<p className="max-w-[700px] my-5 text-slate-300">
					DrivePulse is not just another file sharing website; it's a revolution in digital collaboration. We're committed to pushing the boundaries of what's possible, offering cutting-edge solutions for sharing and managing files securely in today's fast-paced world. Our platform leverages the latest technologies to ensure reliability, speed, and privacy, giving users the confidence to share their valuable data with ease. Whether you're on the go or working from home, DrivePulse keeps you connected and in control of your files, so you can focus on what matters most. Join us in shaping the future of file sharing.
					</p>
				</div>
				
				<Image
					src={img2}
					width={ 400 }
					height={ 400 }
					alt="Our vision image"
					className="rounded-lg"
				/>
			</div>
		</div>
	);
}
