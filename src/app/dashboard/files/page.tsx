import FilesPage from "./ui/FilesPage";
import FilesProvider from "@/providers/FilesProvider";

const files = () => {
  return (
    <div className="min-h-screen gradient1-bg">
      <FilesProvider>
        <FilesPage />
      </FilesProvider>
    </div>
  );
};

export default files;
