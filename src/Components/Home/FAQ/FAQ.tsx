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
                <p className="text-slate-400 font-medium">Have a any question?</p>
            </div>
        <div className=" flex flex-col md:flex-row gap-5 max-w-6xl mx-auto items-center px-3">
           <div className="md:w-[40%]">
                <Lottie animationData={animation}/>
           </div>
           <div className=" w-full md:w-[60%]">
           <Accordion className="space-y-2">
            <AccordionItem style={{backdropFilter:"blur(150px)"}} className="rounded-md">
                <AccordionItemHeading>
                    <AccordionItemButton className="bg-transparent text-xl font-bold text-slate-300 border border-slate-500 p-3 rounded-md">
                        Question-1?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="text-slate-300">
                        Exercitation in fugiat est ut ad ea cupidatat ut in
                        cupidatat occaecat ut occaecat consequat est minim minim
                        esse tempor laborum consequat esse adipisicing eu
                        reprehenderit enim.
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem style={{backdropFilter:"blur(150px)"}} className="rounded-md">
                <AccordionItemHeading>
                    <AccordionItemButton className="bg-transparent text-xl font-bold text-slate-300 border border-slate-500 p-3 rounded-md">
                        Question-2?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="text-gray-400">
                        Exercitation in fugiat est ut ad ea cupidatat ut in
                        cupidatat occaecat ut occaecat consequat est minim minim
                        esse tempor laborum consequat esse adipisicing eu
                        reprehenderit enim.
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem style={{backdropFilter:"blur(150px)"}} className="rounded-md">
                <AccordionItemHeading>
                    <AccordionItemButton className="bg-transparent text-xl font-bold text-slate-300 border border-slate-500 p-3 rounded-md">
                        Question-3?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="text-gray-400">
                        Exercitation in fugiat est ut ad ea cupidatat ut in
                        cupidatat occaecat ut occaecat consequat est minim minim
                        esse tempor laborum consequat esse adipisicing eu
                        reprehenderit enim.
                    </div>
                </AccordionItemPanel>
            </AccordionItem >
            <AccordionItem style={{backdropFilter:"blur(150px)"}} className="rounded-md">
                <AccordionItemHeading>
                    <AccordionItemButton className="bg-transparent text-xl font-bold text-slate-300 border border-slate-500 p-3 rounded-md">
                        Question-4?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="text-gray-400">
                        Exercitation in fugiat est ut ad ea cupidatat ut in
                        cupidatat occaecat ut occaecat consequat est minim minim
                        esse tempor laborum consequat esse adipisicing eu
                        reprehenderit enim.
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