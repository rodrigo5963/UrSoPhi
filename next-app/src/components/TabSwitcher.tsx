import { Dispatch, SetStateAction } from "react";

interface Props {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export default function TabSwitcher({ activeTab, setActiveTab }: Props) {
  return (
    <div className="tabs card">
      <button
        className={`tab-btn ${activeTab === "text" ? "active" : ""}`}
        onClick={() => setActiveTab("text")}
      >
        Generador de Texto
      </button>
      <button
        className={`tab-btn ${activeTab === "image" ? "active" : ""}`}
        onClick={() => setActiveTab("image")}
      >
        Generador de Imágenes
      </button>
    </div>
  );
}
