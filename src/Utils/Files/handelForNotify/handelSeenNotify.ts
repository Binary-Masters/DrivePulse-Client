const handelSeenNotifyFiles = (objectForNotify: any) => {
  const { setOpen, axiosPublic, refetchFiles, user } = objectForNotify;
  setOpen(false);
  axiosPublic
    .patch(`/notify-file?uid=${user?.uid}`)
    .then(() => {
      refetchFiles();
    })
    .catch();

  refetchFiles();
};

export default handelSeenNotifyFiles;
