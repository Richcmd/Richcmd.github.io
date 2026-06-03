# RICH CMD v6.7.19 — Shiftleider Dropdown Stability Hotfix

Deze build voegt een aparte Shiftleider-module toe voor de Vers Avondshift.

## Nieuw

- Shiftleider-dashboard met datum, weeknummer, beschikbare uren, geplande vuluren en ruimte/tekort.
- Teamplanning met naam, werktijd, pauze, beschikbare tijd en toegewezen paden.
- Vulplanning per vast pad: AGF, Panklaar, Maaltijden, Vlees/Vis/Kip, Zuivel en Delicatesse.
- Overige takenlijst met standaard shiftleider-taken en snelle taaktoevoeging.
- Automatische taak: Nee-verkoop houdbaar op dinsdag en donderdag.
- Onderbrekingen & bijzonderheden-log voor klanten, collega’s, incidenten, kassa en overig.
- Shiftklaar report met kopiëren en opslaan naar Communicatie.
- Vandaag toont een compacte Shiftleider-kaart zodra de module actief is.
- Diagnostiek bevat v6.7.16-checks.

## Technisch

- Versie: v6.7.16
- Cache: rich-cmd-cache-v6716
- Assets: ?v=6716


## v6.7.16 — Shiftleider Planning Polish

- Shiftplanning per pad staat nu onder elkaar in één venster in plaats van losse padblokken.
- Medewerkerstijden hebben standaardkeuzes: start 16:00/17:00 en eind 19:00/20:00, met optioneel een andere tijd.
- Pauze wordt automatisch berekend: 4 uur werken = 15 minuten, 6 uur werken = 30 minuten.
- Maaltijdvergoeding wordt gesignaleerd bij starten om/rond 16:00 en werken na 19:00.
- Overige taken verdwijnen niet meer na afronden: ze kleuren groen en schuiven naar onderen.


## v6.7.18 — Shiftleider Compact Planning & Extra Tools

- Shiftplanning per pad compacter en mobielvriendelijker gemaakt.
- Paden tonen padnaam, status, persoon, automatisch gegenereerde start/eindtijd en vulduur.
- Vuluren/minuten worden aangepast via een compact ⏱-icoon.
- Notities worden aangepast via ✎ en zijn alleen zichtbaar wanneer gevuld.
- Status wijzig je via de statuspill; dubbele statusvelden zijn verwijderd.
- Extra features: Kopieer vulplanning, Planningcheck en Wijzigingslog.


## v6.7.18 — Shiftleider Pad & Planning Extras

- Pad **Kaas/Vleeswaren** toegevoegd na **Vlees/Vis/Kip**.
- Shiftplanning blijft compact in één venster met 7 vaste paden.
- Nieuwe feature: **Auto-verdeel vrije paden** op basis van resterende ruimte per medewerker.
- Nieuwe feature: **Kopieer open punten** voor snelle overdracht.
- Nieuwe feature: **Eindcheck** met open paden, open taken en planningchecks vóór het shiftklaar report.
- Versie/cache/assets bijgewerkt naar v6.7.19 / rich-cmd-cache-v6719 / ?v=6719.


## v6.7.19 — Shiftleider Dropdown Stability Hotfix

- Persoon-dropdown in Shiftplanning sluit niet meer direct bij openen.
- Oorzaak opgelost: de select gebruikt nu change-handling in plaats van click-rendering.
- Kaas/Vleeswaren, Auto-verdeel vrije paden, Kopieer open punten en Eindcheck blijven behouden.
- Versie/cache/assets bijgewerkt naar v6.7.19 / rich-cmd-cache-v6719 / ?v=6719.
