# 🏥 Sanitätshäuser Deutschland - Web App

Eine interaktive Web-Anwendung zur Anzeige aller Sanitätshäuser in Deutschland auf einer OpenStreetMap.

## 📋 Features

- **Interaktive Karte**: Alle Sanitätshäuser werden auf einer OpenStreetMap angezeigt
- **Farbcodierte Marker**: 
  - 🟢 Grün: 4+ Sterne Bewertung
  - 🟠 Orange: 3+ Sterne Bewertung  
  - 🔴 Rot: Unter 3 Sterne
  - ⚫ Grau: Keine Bewertung verfügbar
- **Suchfunktion**: Suche nach Stadt, PLZ oder Telefonnummer
- **Filter**: Filtere nach Bewertungen (4+ oder 3+ Sterne)
- **Responsive Design**: Funktioniert auf Desktop und Mobile
- **Detaillierte Informationen**: Name, Adresse, Telefon, Bewertung und Anzahl der Reviews

## 🚀 Installation & Start

1. **Klonen oder Downloaden** der Dateien in einen Ordner
2. **Öffnen** der `index.html` Datei in einem modernen Webbrowser
3. **Fertig!** Die App lädt automatisch und zeigt alle Sanitätshäuser an

### Alternative: Lokaler Server (empfohlen)

Für die beste Performance können Sie einen lokalen Server starten:

```bash
# Mit Python 3
python -m http.server 8000

# Mit Node.js (falls npx verfügbar)
npx serve .

# Mit PHP
php -S localhost:8000
```

Dann öffnen Sie: `http://localhost:8000`

## 🎯 Verwendung

### Karte navigieren
- **Zoom**: Mausrad oder +/- Buttons
- **Verschieben**: Klicken und ziehen
- **Marker anklicken**: Öffnet Popup mit Details

### Suche
- Geben Sie eine Stadt, PLZ oder Telefonnummer in das Suchfeld ein
- Drücken Sie "Suchen" oder Enter
- Die Karte zeigt nur passende Ergebnisse

### Filter
- Wählen Sie eine Mindestbewertung aus dem Dropdown
- Klicken Sie "Filtern"
- Nur Sanitätshäuser mit der gewählten Mindestbewertung werden angezeigt

### Liste
- Klicken Sie auf einen Eintrag in der rechten Liste
- Die Karte zentriert sich automatisch auf das gewählte Sanitätshaus
- Das Popup öffnet sich automatisch

## 📊 Datenquelle

Die Daten stammen von [Gelbe Seiten](https://www.gelbeseiten.de/suche/sanit%c3%a4tshaus/bundesweit) und wurden für diese Demo-Anwendung aufbereitet.

**Enthaltene Informationen:**
- Name des Sanitätshauses
- Vollständige Adresse
- Telefonnummer
- Bewertung (0-5 Sterne)
- Anzahl der Reviews
- Geografische Koordinaten

## 🛠️ Technische Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Karte**: Leaflet.js mit OpenStreetMap
- **Design**: Responsive CSS Grid & Flexbox
- **Keine Backend-Abhängigkeiten**: Läuft komplett im Browser

## 📱 Browser-Kompatibilität

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🔧 Anpassungen

### Weitere Sanitätshäuser hinzufügen

Fügen Sie neue Einträge zum `sanitaetshausData` Array in `script.js` hinzu:

```javascript
{
    name: "Name des Sanitätshauses",
    address: "Vollständige Adresse",
    phone: "Telefonnummer",
    rating: 4.5, // 0-5
    reviews: 10, // Anzahl der Bewertungen
    lat: 51.1657, // Breitengrad
    lng: 10.4515, // Längengrad
    website: "https://website-url.de"
}
```

### Styling anpassen

Bearbeiten Sie die `styles.css` Datei für Design-Änderungen.

## 📄 Lizenz

Diese Anwendung ist Open Source und kann frei verwendet werden.

## 🤝 Beitragen

Verbesserungsvorschläge und Bug-Reports sind willkommen!

---

**Hinweis**: Diese Anwendung ist eine Demo-Version mit einer Auswahl von Sanitätshäusern aus Deutschland. Für eine vollständige Datenbank wären weitere Sanitätshäuser hinzuzufügen. 