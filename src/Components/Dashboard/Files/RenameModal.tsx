
const RenameModal: React.FC = () => {
    const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        const modalElement = document.getElementById('my_modal_4');
        if (modalElement) {
            (modalElement as HTMLDialogElement).close();
        }
    };
    return (
        <dialog id="my_modal_4" className="modal max-w-xs mx-auto">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-black text-lg mb-5">Rename</h3>
                <form>
                    <div className="form-control">
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control mt-6 flex flex-row right-2 gap-2 ">
                        <button onClick={closeModal} className="btn">cancel</button>
                        <button className="btn ">ok</button>
                    </div>
                </form>

            </div>
        </dialog>
    );
};

export default RenameModal;