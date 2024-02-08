"use client";
const Edit = () => {
  const updateValue = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;
    const email = e.target.email.value;
    const image = e.target.image.value;
    // console.log(name, number, email, image);
    const Data = {
      name,
      number,
      email,
      image,
    };
    // console.log(Data)
  };
  return (
    <div>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col ">
          <div className="card flex-shrink-0  shadow-2xl bg-slate-100 w-auto ">
            <form onSubmit={updateValue} className="card-body ">
              <p className="text-center text-3xl">Update Information</p>

              <div className="grid grid-cols-2 w-auto gap-6 ">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    // defaultValue={data.titles}
                    name="name"
                    type="text"
                    placeholder="title"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Number</span>
                  </label>
                  <input
                    // defaultValue={data.mark}
                    name="number"
                    type="number"
                    placeholder="Number"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                // defaultValue={data.image}
                name="image"
                type="text"
                placeholder="Image Url"
                className="input input-bordered"
                required
              />

              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                // defaultValue={user?.email}
                name="email"
                type="text"
                placeholder="Email"
                className="input input-bordered"
                required
                
              />
              <div className="form-control mt-6">
                <button className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
