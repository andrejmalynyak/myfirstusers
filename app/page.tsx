'use client';

import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {Example} from "@/types/Example";
import {Header} from "@/app/components/Header";
import {Filter} from "@/app/components/Filter";
import {CardTable} from "@/app/components/CardTable";
import {ExampleModal} from "@/app/components/ExampleModal";
import {AddModal} from "@/app/components/AddModal";

const categories = [
    {title: 'ACQUISITION', items: ['Content', 'SEO', 'Sales', 'Social', 'Ads']},
    {title: 'CONVERSION', items: ['Copyrighting', 'Landing Page']},
    {title: 'MORE', items: ['Retention', 'Brand', 'Referral', 'Creative']},
    {title: 'NEWSLETTER', items: []},
];

const initialExamples = [
    {title: 'Same interview. 700x reach.', duration: '30 secs', tag: 'Social'},
    {title: 'Posting seltzer. Making money.', duration: '2 mins', tag: 'Creative'},
    {title: 'The saleswoman closing 33% of cold pitches', duration: '2 min', tag: 'Sales'},
    {title: 'A full-time "pizza influencer"', duration: '2 mins', tag: 'Content'},
];

const MarketingDashboard = () => {
    const [examples, setExamples] = useState<Example[]>(initialExamples);
    const [selectedExample, setSelectedExample] = useState<Example | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDuration, setNewDuration] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const currentCategory = categories.find(cat => cat.title === selectedCategory);
    const subcategories = currentCategory ? currentCategory.items : [];

    const handleCategoryChange = useCallback((event) => {
        setSelectedCategory(event.target.value);
        setSelectedSubcategory('');
    }, []);

    const handleSubcategoryChange = useCallback((event) => {
        setSelectedSubcategory(event.target.value);
    }, [])

    const addExample = useCallback(() => {
        setIsAdding(true);
    }, []);

    const readyToAdd = useMemo(() => !!(newTitle && newDuration && selectedSubcategory), [newDuration, newTitle, selectedSubcategory]);

    const closeAddModal = useCallback(() => {
        setNewDuration('');
        setNewTitle('');
        setSelectedCategory('');
        setSelectedSubcategory('');
        setIsAdding(false);
    }, [])

    const addNewExample = useCallback(() => {
        if (readyToAdd) {
            setExamples(prevExamples => [
                {
                    title: newTitle,
                    duration: newDuration,
                    tag: selectedSubcategory,
                },
                ...prevExamples,
            ]);
            closeAddModal();
        }
    }, [closeAddModal, newDuration, newTitle, readyToAdd, selectedSubcategory])

    const router = useRouter();
    const searchParams = useSearchParams();

    const filteredExamples = useMemo(() => {
        if (!selectedFilter) return examples;
        return examples.filter(example => example.tag === selectedFilter);
    }, [selectedFilter, examples]);

    const openModal = useCallback((example: Example) => {
        setSelectedExample(example);
        router.push(`?example=${encodeURIComponent(example.title)}`, undefined, {shallow: true});
    }, [router]);

    const closeModal = useCallback(() => {
        setSelectedExample(null);
        router.push('/', undefined, {shallow: true});
    }, [router]);

    useEffect(() => {
        const exampleTitle = searchParams.get('example');

        if (exampleTitle) {
            const newExample = examples.find(example => example.title === exampleTitle);

            if (newExample && newExample.title !== selectedExample?.title) {
                setSelectedExample(newExample);
            }
        } else if (selectedExample !== null) {
            setSelectedExample(null);
        }
    }, [searchParams, examples, selectedExample]);

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <Header/>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                <Filter
                    categories={categories}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                />
                <CardTable
                    addExample={addExample}
                    filteredExamples={filteredExamples}
                    openModal={openModal}
                />
            </div>
            <ExampleModal selectedExample={selectedExample} closeModal={closeModal}/>
            <AddModal
                isAdding={isAdding}
                closeAddModal={closeAddModal}
                setNewTitle={setNewTitle}
                setNewDuration={setNewDuration}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                categories={categories}
                selectedSubcategory={selectedSubcategory}
                handleSubcategoryChange={handleSubcategoryChange}
                subcategories={subcategories}
                addNewExample={addNewExample}
                readyToAdd={readyToAdd}
            />
        </div>
    );
};

export default MarketingDashboard;
