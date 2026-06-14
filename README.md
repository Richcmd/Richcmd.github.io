# RICH CMD v7.6.3 — AGF Groenten NASA Shelf Data

Deze update verwerkt de nieuw aangeleverde foto's van de groenten-afdeling in een AGF-groenten schaplijst met NASA-nummers.

## Nieuw

- Nieuwe AGF-kaart: **Groenten schaplijst / NASA**.
- Knop **Groentenlijst inladen** op de AGF-pagina.
- 45 groenten-/schapartikelen verwerkt uit de foto’s.
- NASA-nummers worden aan AGF-productprofielen toegevoegd.
- Duplicaten worden voorkomen op basis van NASA-nummer of productnaam.
- Minder scherp leesbare entries krijgen het label **controle**.
- CSV-bestand toegevoegd: `agf-groenten-schaplijst-v763.csv`.
- Diagnostiek bevat AGF Groenten NASA checks.

## Belangrijk beleid

- Bestaande AGF-data wordt niet gewist.
- Bestaande producten worden alleen aangevuld als NASA/categorie ontbreekt.
- Items met label **controle** kun je later handmatig corrigeren op basis van het papieren schapplan.
- De hoofdflow blijft AGF/HACCP-gericht.
- Shiftleider Pro blijft standalone.

## Testadvies

Test na upload vooral: AGF → Groenten schaplijst / NASA → Groentenlijst inladen, zoeken op NASA/productnaam, Bonus/Quick Check, Bestelbeheer-context en Diagnostiek → AGF Groenten NASA checks.
