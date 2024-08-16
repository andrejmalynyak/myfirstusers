import Modal from "@/components/ui/Modal";
import React, {ChangeEvent, memo} from "react";
import {Category} from "@/types/Categories";

interface AddModalProps {
    isAdding: boolean,
    closeAddModal: () => void,
    setNewTitle: (title: string) => void,
    setNewDuration: (duration: string) => void,
    selectedCategory: string,
    handleCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    categories: Category[],
    selectedSubcategory: string,
    handleSubcategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    subcategories: string[],
    addNewExample: () => void,
    readyToAdd: boolean,
}

const AddModal:React.FC<AddModalProps> = memo(({
                                                          isAdding,
                                                          closeAddModal,
                                                          setNewTitle,
                                                          setNewDuration,
                                                          selectedCategory,
                                                          handleCategoryChange,
                                                          categories,
                                                          selectedSubcategory,
                                                          handleSubcategoryChange,
                                                          subcategories,
                                                          addNewExample,
                                                          readyToAdd,
                                                      }) => {

        return (
            <>
                {isAdding && (
                    <Modal>
                        <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-purple-300">Add new example</h2>
                                <button onClick={closeAddModal} className="text-gray-400 hover:text-gray-200">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 text-sm font-semibold mb-1">Title</label>
                                    <input
                                        type="text"
                                        className="bg-gray-700 hover:bg-gray-600 transition-colors px-4 py-2 rounded-lg text-sm text-gray-300 w-full"
                                        placeholder="Title"
                                        onChange={e => setNewTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-semibold mb-1">Duration</label>
                                    <input
                                        type="text"
                                        className="bg-gray-700 hover:bg-gray-600 transition-colors px-4 py-2 rounded-lg text-sm text-gray-300 w-full"
                                        placeholder="Duration"
                                        onChange={e => setNewDuration(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm font-semibold mb-1">Category</label>
                                    <select
                                        name="category"
                                        id="cat"
                                        className="bg-gray-700 hover:bg-gray-600 transition-colors px-4 py-2 rounded-lg text-sm text-gray-300 w-full"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat.title} value={cat.title}>
                                                {cat.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {selectedCategory && (
                                    <div>
                                        <label
                                            className="block text-gray-300 text-sm font-semibold mb-1">Subcategory</label>
                                        <select
                                            name="subcategory"
                                            id="subcat"
                                            className="bg-gray-700 hover:bg-gray-600 transition-colors px-4 py-2 rounded-lg text-sm text-gray-300 w-full"
                                            value={selectedSubcategory}
                                            onChange={handleSubcategoryChange}
                                        >
                                            <option value="">Select a Tag</option>
                                            {subcategories.map(sub => (
                                                <option key={sub} value={sub}>
                                                    {sub}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <button
                                    onClick={addNewExample}
                                    className="bg-purple-600 px-4 py-2 rounded-full text-sm font-semibold text-white disabled:bg-purple-200 w-full mt-4"
                                    disabled={!readyToAdd}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </>
        )
    }
)

AddModal.displayName = "Card";

export { AddModal };
