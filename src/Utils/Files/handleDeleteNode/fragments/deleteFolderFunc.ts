import getFolderPathData from "@/Utils/FolderNavigation/getFolderPathData";
import Swal from "sweetalert2";

const deleteFolderFunc = async (hookPropObj: any, fullPath: string) => {
  const { axiosInstance, user, setPath, refetchFiles } = hookPropObj;
  const { currentPath, parentPath } = getFolderPathData(
    fullPath,
    "folder",
    user
  );

  const { data } = await axiosInstance.get(
    `/files?rootdir=${user?.uid}&path=${currentPath}`
  );

  if (data.length) {
    Swal.fire({
      title: "Folder not empty",
      text: "Cannot delete non-empty folders",
      icon: "error",
    });
  } else {
    axiosInstance
      .delete(`/files?fullPath=${fullPath}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          refetchFiles();
          Swal.fire({
            title: `Folder deleted successfully`,
            icon: "success",
          }).then(() => {
            setPath(parentPath);
          });
        } else {
          Swal.fire({
            title: "Something went Wrong",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: error.message,
          icon: "error",
        });
      });
  }
};

export default deleteFolderFunc;
