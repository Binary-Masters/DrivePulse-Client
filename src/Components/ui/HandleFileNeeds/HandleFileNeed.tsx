import Image from 'next/image';
import bgImage from '@/assests/bg.png'
const data = [
    {
        "image": "https://i.ibb.co/JkHMfXR/share.png",
        "title": "Share",
        "description": "Share through email, link, or social network. Unlimited downloads. No wait times."
    },
    {
        "image": "https://i.ibb.co/kJFVR5g/collaborate.png",
        "title": "Collaborate",
        "description": "Store and share any file type. Share folders of project files. Easily email large files."
    },
    {
        "image": "https://i.ibb.co/CvscYPQ/cloud.png",
        "title": "Store",
        "description": "Securely store your files in a centralized location, making it easy to organize, manage, and access."
    },
    {
        "image": "https://i.ibb.co/4Rf6L8H/access.png",
        "title": "Access",
        "description": "Enjoy convenient and quick access to your files from anywhere. Never forget your work at home."
    }
]


const HandleFileNeed = () => {
    return (
        <div className='py-20 relative bg-slate-200'>
             <Image
                alt="Mountains"
                src={bgImage}
                placeholder="blur"
                quality={100}
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                }}
            />
            <h2 className='text-5xl text-center font-bold'>Handles all of your file needs</h2>
            <p className='text-lg w-2/3 mx-auto text-center py-5 text-gray-600'>File storage made easy – including powerful features you won’t find anywhere else. Whether you’re sharing photos, videos, audio, or docs, MediaFire can simplify your workflow.</p>

            <div className='mx-5 md:mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-5'>
                {
                    data.map((item, index) => (
                        <div key={index} className="card rounded-md bg-slate-50 hover:shadow-md ">

                            <figure className="px-10 pt-10 flex items-center justify-center">
                                <Image src={item.image}
                                    width={90}
                                    height={90}
                                    alt="icons image"></Image>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h3 className='text-2xl font-bold'>{item.title}</h3>
                                <p className='text-gray-600'>{item.description}</p>
                            </div>

                        </div>

                    ))}
            </div>
        </div>
    );
};

export default HandleFileNeed;