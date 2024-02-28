'use client'

interface AllFilesPreview {
    fullPath:string
}

const AllFilesPreview: React.FC<AllFilesPreview> = ({ fullPath }) => {
    const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        const modalElement = document.getElementById('my_modal_4');
        if (modalElement) {
            (modalElement as HTMLDialogElement).close();
        }
    };
    console.log(fullPath);

    return (
        <dialog id="my_modal_4" className="modal max-w-xs mx-auto">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm text-black btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-black text-lg mb-5">AllFiles Preview</h3>
                <form>
                    <p className="text-black">This is File Preview {fullPath}</p>

                </form>
                

            </div>
        </dialog>
    );
};

export default AllFilesPreview;