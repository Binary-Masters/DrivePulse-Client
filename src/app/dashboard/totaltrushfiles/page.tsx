import TrushFiles from "@/Components/Dashboard/Files/TrushFiles";
import FilesProvider from "@/providers/FilesProvider";

const totaltrushfiles = () => {
  return (
    <div className="min-h-screen gradient1-bg">
      <FilesProvider>
        <TrushFiles />
      </FilesProvider>
    </div>
  );
};

export default totaltrushfiles;
