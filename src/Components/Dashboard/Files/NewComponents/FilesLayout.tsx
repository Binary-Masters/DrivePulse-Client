"use client"

import {useState} from "react"
import ListView from "./Views/ListView";
import GridView from "./Views/GridView";


export default function FilesLayout() {
	const [view, setView] = useState<"list" | "grid">("grid");
	
	return <div>
		{ view === "list" ? <ListView/> : <GridView/> }
	</div>
}
