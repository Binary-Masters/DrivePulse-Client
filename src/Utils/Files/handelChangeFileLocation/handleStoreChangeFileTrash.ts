import Swal from "sweetalert2";


const handleStoreChangeFileTrash = (hookPropObj: any,
 fullPath: string,
 id: string) => {
  const {router, axiosInstance, refetchFiles } = hookPropObj;
 const filePath = fullPath.split("/");
 const myPath = filePath[filePath.length - 1];
 Swal.fire({
   title: "Are you sure?",
   text: `You want to delete ${myPath} `,
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "Yes, delete it!",
 }).then((result) => {
   if (result.isConfirmed) {
    axiosInstance
       .patch(`/store-file?id=${id}`, { store: "Trush" })
       .then(() => {
         refetchFiles();
         Swal.fire({
           title: `${myPath} has been deleted`,
           text: `Want To Go Trush Page`,
           icon: "success",
           showCancelButton: true,
           confirmButtonColor: "#3085d6",
           cancelButtonColor: "#d33",
           confirmButtonText: "Yes, Go!",
         }).then((result) => {
           if (result.isConfirmed) {
             router.push("/dashboard/totaltrushfiles");
           }
         });
       })
       .catch();
   }
 });
};

export default handleStoreChangeFileTrash;