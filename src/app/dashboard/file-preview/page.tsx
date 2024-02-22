'use client'
import { useRouter } from "next/navigation";


const AllFilePreview = (downloadUrL) => {
    const router=useRouter();
    console.log('File Clicked', downloadUrL);
    router.push(downloadUrL);

    return (
        <div className="pt-28">
            <p className="text-white">Link Clicked</p>
            {/* <Link href='https://www.google.com'>Click To Go</Link> */}
        </div>
    );
};

export default AllFilePreview;