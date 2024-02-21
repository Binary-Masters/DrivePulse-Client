import FilesPage from "@/Components/Dashboard/Files/FilesPage";
import FilesProvider from "@/providers/FilesProvider";

export default function Page({ params }: { params: { id: string } }) {
	return (
		<div className="min-h-screen gradient1-bg">
			<FilesProvider>
				<FilesPage id={ params.id }/>
			</FilesProvider>
		</div>
	);
};
