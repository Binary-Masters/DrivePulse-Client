import PageCover from "@/Components/Shared/PageCover/PageCover";
import { Metadata } from "next";
import contactImg from "../../assests/images/contact.jpg";
import ContactForm from "@/Components/Shared/ContactForm/ContactForm";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
export const metadata: Metadata = {
  title: "Contact | DrivePulse",
  description: "This Is contact Page ,It Is A File Sharing Website",
};
//   console.log(contactImg);
const Contact = () => {
  return (
    <div>
      <PageCover img={contactImg} />
      <h2 className="text-center text-4xl font-bold mt-10 border-b border-black w-fit mx-auto">Have a any Question ?</h2>
      <div className="grid items-center grid-cols-2 gap-5 mt-10 max-w-6xl mx-auto shadow-md p-4 rounded-md border mb-10">
        <div className=" space-y-10 px-5">
          <div className="flex items-center gap-5">
            <MdLocationOn  className="text-2xl"/>
            <div>
              <h2 className="text-xl font-semibold uppercase">Our Address</h2>
              <p className="font-medium text-gray-400">Dhaka</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
          <MdPhone className="text-2xl"/>
            <div>
              <h2 className="text-xl font-semibold uppercase">Phone number</h2>
              <p className="font-medium text-gray-400">Mobile: 01739 859756</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <MdEmail className="text-2xl" />
            <div>
              <h2 className="text-xl font-semibold uppercase">Email</h2>
              <p className="font-medium text-gray-400">binarymasters810@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
