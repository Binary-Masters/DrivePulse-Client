import React from 'react';

interface Props {
    currentPath: string[];
    onNavigate: (path: string[]) => void
}
const NavigationFolder: React.FC<Props> = ({ currentPath, onNavigate }) => {
    const handleNavigateBack = () => {
        console.log('Navigating back...');
        const newPath = currentPath.slice(0, -1);
        onNavigate(newPath);
      };
    return (
        <div className="flex items-center gap-2">
            <button onClick={handleNavigateBack} className="text-xl cursor-pointer">
                My File
            </button>
            {/* Render other elements in the navigation bar */}
            {currentPath.map((folder, index) => (
                <span key={index}>
                    <span className="mx-1"> &gt; </span>
                    <span>{folder}</span>
                </span>
            ))}
        </div>
    );
};

export default NavigationFolder;