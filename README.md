# Zucker-Tracker (PWA für Android)

Eine vollständig lokal arbeitende PWA für zusätzliche Snacks und Getränke. Ohne Framework, Konto, Backend und Build-Schritt.

## Funktionen
- Ein-Tipp-Erfassung über Favoriten, eigene Einträge mit Datum und Uhrzeit
- Favoriten hinzufügen und bearbeiten (auf „Favoriten verwalten“ tippen)
- Einträge von heute bearbeiten und löschen
- 7-Tage-Summe und Tagesdurchschnitt, 30-Tage-Balkendiagramm und weitere Kennzahlen
- Eigene Referenzlinie, bewusst **kein** gesundheitliches Limit
- IndexedDB auf dem Gerät, JSON-Export und -Import, offline nutzbar nach erstem erfolgreichem Laden

**Wichtig:** Die angegebenen Zuckerwerte der initialen Favoriten sind lediglich **Beispielwerte**, keine geprüften Produktdaten. Passe sie auf deine üblichen Portionsgrößen an. Es wird nur erfasster Gesamtzucker gezählt, nicht der vollständige Tageskonsum.

## Projektstruktur
```
zucker-tracker/
├── index.html           Oberfläche
├── styles.css           Design / Smartphone-Layout
├── app.js               Funktionalität und IndexedDB
├── manifest.webmanifest PWA-Konfiguration
├── sw.js                Offline-Cache
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## Lokal am PC testen
Öffne den Ordner in Visual Studio Code. Mit Python:
```bash
python -m http.server 8080
```
Dann im Desktop-Browser `http://localhost:8080` öffnen. `file://` per Doppelklick ist nicht geeignet.

## Auf Android installieren – empfohlener Weg: GitHub Pages
1. Neues **öffentliches** GitHub-Repository erstellen, z. B. `zucker-tracker`.
2. Alle Projektdateien inklusive Ordner `icons/` in das **Wurzelverzeichnis** des Repositories hochladen.
3. Unter **Settings → Pages**: „Deploy from a branch“, Branch `main`, Ordner `/(root)` wählen, speichern.
4. Sobald die Bereitstellung fertig ist, auf Android **Chrome** öffnen und `https://DEINNAME.github.io/zucker-tracker/` aufrufen.
5. Im Chrome-Menü (⋮) „App installieren“ bzw. „Zum Startbildschirm hinzufügen“ wählen. Je nach Chrome-/Android-Version variiert die Beschriftung.
6. App einmal online laden; danach kann sie offline starten. Für ein Update später online die Seite neu laden; bei dieser einfachen Cache-first-Version **die Versionsnummer in `sw.js` erhöhen**, z. B. von `v1` auf `v2`, und Seite erneut öffnen.

Hinweis: Der Quellcode ist bei einem öffentlichen Repository öffentlich; **deine persönlichen Einträge werden nicht hochgeladen**, sondern bleiben in IndexedDB im Browserprofil auf dem Gerät.

## Alternative: Im eigenen WLAN vom PC testen
Am PC `python -m http.server 8080 --bind 0.0.0.0` starten und am Android-Gerät die lokale PC-IP unter `http://PC-IP:8080` besuchen. Die Ansicht funktioniert; Service Worker/PWA-Installation benötigen aber normalerweise **HTTPS** oder `localhost` und funktionieren bei einfachen lokalen HTTP-IP-Adressen nicht vollständig. Für PWA-Tests am Handy deshalb GitHub Pages/HTTPS verwenden.

## Backup / Datenschutz
- „JSON exportieren“ speichert Einträge, Favoriten und Referenzlinie als Datei.
- „JSON importieren“ ersetzt nach Bestätigung die lokalen Daten durch den Inhalt dieser Datei.
- Die App macht keine Cloud-Synchronisierung. Löschen von Browserdaten / Änderung des Browserprofils kann lokale Daten löschen.
- Zeitzone: Tag wird nach lokaler Gerätezeit bestimmt; bereits erfasste Einträge behalten ihr lokales Datum.
- Die Auswertung zählt Tage ohne Eintrag als 0 g **erfassten Zucker**, was nicht bedeutet, dass an diesen Tagen kein Zucker gegessen wurde.

## Bekannte Grenzen / nächste Ausbaustufen
- Vergangene Tage können über „Eigener Eintrag“ nachträglich hinzugefügt werden; Bearbeiten/Löschen erfolgt in dieser Version nur über die heutige Liste.
- Favoriten können bearbeitet, aber noch nicht gelöscht oder sortiert werden.
- Keine Barcodes, Cloud-Synchronisierung, Produktdatenbank oder automatische Nährwertanalyse.
