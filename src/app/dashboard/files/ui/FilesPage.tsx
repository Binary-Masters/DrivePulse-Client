// Components
import NavigationFolder from "@/Components/Dashboard/Files/Folder/NavigationFolder"
import FilesLayout from "@/Components/Dashboard/Files/NewComponents/FilesLayout";

// Icons
import { FiArrowUpCircle, FiPlusCircle } from "react-icons/fi";

// Styles
import styles from "./styles.module.css";

export default function FilesPage() {
	return <div className="px-4 pt-24">
		<div>
			<div className="flex items-center justify-between">
				<NavigationFolder/>
				<div className="flex items-center text-xl text-white gap-4">
					<span className={ styles.btn }>
						<FiArrowUpCircle/>
						Upload
					</span>
					<span className={ styles.btn }>
						<FiPlusCircle/>
						New Folder
					</span>
				</div>
			</div>
			<div>
				<FilesLayout/>
			</div>
		</div>
	</div>
}
