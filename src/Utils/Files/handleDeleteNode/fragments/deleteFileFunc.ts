import Swal from "sweetalert2";

const deleteFileFunc = (hookPropObj: any, fullPath: string): void => {
  const filePath = fullPath.split("/");
  const myPath = filePath[filePath.length - 1];

  const { deleteFile, axiosInstance, refetchFiles } = hookPropObj;
  deleteFile(fullPath)
    .then(() => {
      axiosInstance
        .delete(`/files?fullPath=${fullPath}`)
        .then((result) => {
          if (result.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted Permanentlly!",
              text: `${myPath} Has Been Deleted `,
              icon: "success",
            });
            refetchFiles();
          } else {
            Swal.fire({
              title: "Oppss!",
              text: "Something Went Wrong Please Try Again",
              icon: "error",
            });
          }
        })
        .catch();
    })
    .catch();
};

export default deleteFileFunc;
