"use client";

import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
const ChangePassword = () => {
  const { updateUserPassword, credential } = useAuth();
  const handleChangeSubmit = async (e) => {
    e.preventDefault();
    const oldPass = e.target.old.value;
    const newPass = e.target.new.value;
    await credential(oldPass)
      .then(async () => {
        // User successfully re-authenticated, now update the password
        await updateUserPassword(newPass);
      })
      .then(() => {
        Swal.fire({
          title: "Congratulations",
          text: "Your Have Changed Your Password",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Opps!!",
          text: `Invalid Your Old Password `,
          icon: "success",
        });
      });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Change Password</h1>
      <form onSubmit={handleChangeSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Old Password</span>
          </label>
          <input
            type="password"
            name="old"
            placeholder="Old Password"
            className="input input-outline input-accent"
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
            className="input input-outline input-accent"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-accent">
            Save To Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
