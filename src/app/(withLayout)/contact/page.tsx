import PageCover from "@/Components/Shared/PageCover/PageCover";
import { Metadata } from "next";
import contactImg from "../../../assests/images/contact.jpg";
import ContactForm from "@/Components/Shared/ContactForm/ContactForm";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
export const metadata: Metadata = {
  title: "Contact | DrivePulse",
  description: "This Is contact Page ,It Is A File Sharing Website",
};
//   console.log(contactImg);
const Contact = () => {
  return (
    <div className="gradient1-bg pb-10">
      <PageCover img={contactImg} text={"Contact Us"}/>
      <h2 className="text-center text-3xl  md:text-4xl font-bold mt-10 border-b border-primary w-fit mx-auto text-slate-300">Have any <span className="text-primary">Question</span>?</h2>
      <div style={{backdropFilter:"blur(100px)"}} className="grid items-center grid-cols-1 md:grid-cols-2 gap-5 mt-10 max-w-6xl md:mx-auto shadow-md p-4 rounded-md border mx-3">
        <div className=" space-y-10 px-5">
          <div className="flex items-center gap-1">
            <MdLocationOn  className="text-5xl text-primary"/>
            <div>
              <h2 className="text-xl text-slate-300 font-bold uppercase">Our Address</h2>
              <p className="font-medium text-gray-300">Dhaka</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
          <MdPhone className="text-4xl text-primary"/>
            <div>
              <h2 className="text-xl text-slate-300 font-bold uppercase">Phone number</h2>
              <p className="font-medium text-gray-300">Mobile: 01739 ******</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-4xl text-primary" />
            <div>
              <h2 className="text-xl text-slate-300 font-bold uppercase">Email</h2>
              <p className="font-medium text-gray-300">binarymasters110@gmail.com</p>
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
