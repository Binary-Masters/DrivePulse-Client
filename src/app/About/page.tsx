"use client";
import Button from "@/Utils/Button/Button";
import HandelButton from "../../Components/Button/HandelButton";

const AboutPage = () => {
  const handleEvent = ()=>{
    console.log('click');
  }
  return (
    <div>
      <h1>This Is About Page</h1>
      <HandelButton />
      <Button buttonName={"Primary"} event={handleEvent}/>
    </div>
  );
};

export default AboutPage;
