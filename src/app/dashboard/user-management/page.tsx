

const page = () => {
    return (
        <div className="gradient1-bg min-h-screen">
            <div className="overflow-x-auto pt-20">
                <table className="table text-white">
                    {/* head */}
                    <thead className="text-white">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            image
                                        </div>
                                    </div>
                                    <div>
                                        <p>Name</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p>Email</p>
                            </td>
                            <td className="flex flex-col gap-2">
                                <button className="btn btn-sm btn-outline text-white">Make Admin</button>
                                <button className="btn btn-sm btn-outline text-white">Make User</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;