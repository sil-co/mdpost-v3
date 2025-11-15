"use client";

import { createContext, useContext, useState } from "react";


type Language = "en" | "ja";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useContext must be used inside LanguageProvider");
    return context;
}
