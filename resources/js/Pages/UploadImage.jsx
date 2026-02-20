import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Upload, CheckCircle } from "lucide-react";
import Result from "@/Components/Result";

export default function UploadImage() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [showResult, setShowResult] = useState(false);

    return (
        <MainLayout>

            {/* ===== UPLOAD + PREVIEW (SATU GRUP) ===== */}
            {!showResult && (
                <div className="max-w-5xl mx-auto px-6">
                    {/* UPLOAD */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Unggah Gambar Maggot
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Unggah gambar maggot yang akan dianalisis kondisinya
                    </p>

                    <div className="bg-white py-8 rounded-lg border-2 border-dashed border-gray-300  text-center hover:border-green-400 transition-colors cursor-pointer">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Upload size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            Seret dan lepas gambar di sini
                        </h3>
                        <p className="text-gray-600 mb-4">atau</p>
                        <button
                            onClick={() => setUploadedImage("dummy")}
                            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Pilih File
                        </button>
                        <p className="text-sm text-gray-500 mt-4">
                            Format: JPG, PNG (Maksimal 5MB)
                        </p>
                    </div>

                    {/* PREVIEW (MUNCUL SETELAH UPLOAD) */}
                    {uploadedImage && (
                        <div className="mt-8 bg-gray-50 rounded-lg p-6 border">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle
                                    size={20}
                                    className="text-green-600"
                                />
                                <span>Gambar berhasil diunggah</span>
                            </div>

                            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-6">
                                [Preview Gambar Maggot]
                            </div>

                            <button
                                onClick={() => setShowResult(true)}
                                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                            >
                                Analisis Gambar
                            </button>
                        </div>
                    )}
                </div>
            )}


            {/* ===== RESULT (FILE TERPISAH) ===== */}
            {showResult &&

                <Result image={uploadedImage}
            />}
        </MainLayout>
    );
}
