"use client";

const changePassword: React.FC = () => {
  const handleChangeSubmit = (e) => {
    e.preventDefault();
    const oldPass = e.target.old.value;
    const newPass = e.target.new.value;
    console.log(oldPass, newPass);
  };
  return (
    <div>
      <p>Change Password</p>
      <form onSubmit={handleChangeSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Old Password</span>
          </label>
          <input
            type="password"
            name="old"
            placeholder="Old Password"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            type="password"
            name="new"
            placeholder="New Password"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Save To Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default changePassword;
