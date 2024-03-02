import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const handleStoreChangeFileRestore = (
  hookPropObj: any,
  fullPath: string,
  id: string
) => {
 const {router, axiosInstance, refetchFiles } = hookPropObj;
  const filePath = fullPath.split("/");
  const myPath = filePath[filePath.length - 1];
  Swal.fire({
    title: "Are you sure?",
    text: `You want to Restore ${myPath} `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Restore it!",
  }).then((result) => {
    if (result.isConfirmed) {
     axiosInstance
        .patch(`/store-file?id=${id}`, { store: "Local" })
        .then(() => {
          refetchFiles();
          Swal.fire({
            title: `${myPath} has been Restored`,
            text: `Want To Go Files Page`,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Go!",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/dashboard/files");
            }
          });
        })
        .catch();
    }
  });
};

export default handleStoreChangeFileRestore;
