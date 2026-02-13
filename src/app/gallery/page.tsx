"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getGalleryImages, type GalleryImage } from "@/lib/api";

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [filter, setFilter] = useState<"All" | "Events" | "Awards" | "Community">("All");

    useEffect(() => {
        async function loadImages() {
            const data = await getGalleryImages();
            setImages(data);
        }
        loadImages();
    }, []);

    const filteredImages = filter === "All" ? images : images.filter(img => img.category === filter);

    return (
        <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Capturing the moments that define our chapter.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-full shadow-sm max-w-md mx-auto border border-gray-100">
                        {["All", "Events", "Awards", "Community"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat as any)}
                                className={`py-2 px-6 rounded-full font-medium transition-all ${filter === cat ? "bg-primary text-white shadow-md" : "text-gray-500 hover:text-primary"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    <AnimatePresence>
                        {filteredImages.map((image) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="break-inside-avoid"
                            >
                                <div className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <span className="text-primary text-xs font-bold uppercase tracking-wider mb-1">{image.category}</span>
                                        <h3 className="text-white font-bold text-lg">{image.alt}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    );
}
