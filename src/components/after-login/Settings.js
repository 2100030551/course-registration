import React, { useState } from "react";
import "../../styles/after-login.css"; // Updated import path

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: "light", // Default theme
    language: "en", // Default language
  });

  const languageOptions = {
    en: { title: "Account Settings", save: "Save Settings", notifications: "Enable Notifications", theme: "Theme", language: "Language" },
    es: { title: "Configuración de la Cuenta", save: "Guardar Configuración", notifications: "Activar Notificaciones", theme: "Tema", language: "Idioma" },
    fr: { title: "Paramètres du Compte", save: "Enregistrer les Paramètres", notifications: "Activer les Notifications", theme: "Thème", language: "Langue" },
    de: { title: "Kontoeinstellungen", save: "Einstellungen Speichern", notifications: "Benachrichtigungen Aktivieren", theme: "Thema", language: "Sprache" },
    jp: { title: "アカウント設定", save: "設定を保存", notifications: "通知を有効にする", theme: "テーマ", language: "言語" },
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  const selectedLanguage = languageOptions[settings.language] || languageOptions.en;

  return (
    <div className={`settings ${settings.theme}`}>
      <h1>{selectedLanguage.title}</h1>
      <form onSubmit={handleSubmit}>
        {/* Notifications */}
        <div>
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            {selectedLanguage.notifications}
          </label>
        </div>

        {/* Theme Selection */}
        <div>
          <label>
            {selectedLanguage.theme}:
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>

        {/* Language Selection */}
        <div>
          <label>
            {selectedLanguage.language}:
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="jp">Japanese</option>
            </select>
          </label>
        </div>

        <button type="submit">{selectedLanguage.save}</button>
      </form>
    </div>
  );
};

export default Settings;
