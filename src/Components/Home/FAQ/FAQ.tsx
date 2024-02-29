/* eslint-disable react/no-unescaped-entities */
"use client"
import Lottie from "lottie-react";
import animation from "../../../assests/lottie-animation/faqs.json"
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
const FAQ = () => {
    return (
        <div className="py-10">
            <div className="text-center w-fit mx-auto">
                <h1 className="text-4xl md:text-5xl font-semibold text-slate-300">FA<span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">Qs</span></h1>
                <p className="text-slate-400 font-medium">Have any question?</p>
            </div>
            <div className=" flex flex-col md:flex-row gap-5 max-w-6xl mx-auto items-center px-3">
                <div className="md:w-[40%]">
                    <Lottie animationData={animation} />
                </div>
                <div className=" w-full md:w-[60%]">
                    <Accordion className="space-y-2">
                        <AccordionItem style={{ backdropFilter: "blur(150px)" }} className="rounded-md">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-transparent text-xl font-bold text-slate-300 border border-slate-500 p-3 rounded-md">
                                    What is DrivePulse ?
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className="text-slate-300">
                                    DrivePulse is a secure file sharing platform to make it easier to manage   larger files.
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem style={{ backdropFilter: "blur(150px)" }} className="rounded-md">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-transparent text-xl font-bold text-slate-300 border border-slate-500 p-3 rounded-md">
                                    Why should you use DrivePulse ?
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className="text-gray-400">
                                    DrivePulse has end-to-end encryption for messages and secure file sharing options. You can share your files securely through DrivePulse.That's why you should use DrivePulse.
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem style={{ backdropFilter: "blur(150px)" }} className="rounded-md">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-transparent text-xl font-bold text-slate-300 border border-slate-500 p-3 rounded-md">
                                    Can I access my files from any device or location?
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className="text-gray-400">
                                    Absolutely! Our platform is accessible from any internet-enabled device, including desktops, laptops, tablets, and smartphones. Whether you're at home, in the office, or on the go, you can securely access your files whenever you need them.
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem >
                        <AccordionItem style={{ backdropFilter: "blur(150px)" }} className="rounded-md">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-transparent text-xl font-bold text-slate-300 border border-slate-500 p-3 rounded-md">
                                    Why DrivePulse is different from other file sharing platforms ?
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className="text-gray-400">
                                    DrivePulse is different from other file sharing platforms because, users can easily share files with their friends and communicate with them in real-time, all within the same interface.
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>

                    </Accordion>

                </div>
            </div>
        </div>
    );
};

export default FAQ;