"use client";

const HandelButton = () => {
  const handelClick = () => {
    console.log("Hello");
  };
  return (
    <div>
      <button onClick={handelClick} className="btn btn-accent">
        Click
      </button>
    </div>
  );
};

export default HandelButton;
