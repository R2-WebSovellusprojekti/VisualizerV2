# Web-ohjelmoinnin sovellusprojekti – Ryhmä 2

### Projektin GitHub-linkki: https://github.com/R2-WebSovellusprojekti
### Stoplight-linkki: https://r2-projekti.stoplight.io/docs/r2-websovellusprojekti/branches/main/v5wqfg22d9gtm-r2-web-sovellus-api

## Ryhmän jäsenet:

### siLtzi: Samuli Kuusisto
### Dibble117: Niko Kolehmainen
### HTV76: Hannu Väliahde
### ergosha: Miikka Tyvelä

# Projektin tarkoitus

Projektissa toteutettiin www-sivu ilmastomuutokseen liittyvän tiedon visualisointia varten. Sivulle haetaan ilmastomuutokseen liittyvää dataa useasta erillisestä julkisesta lähteestä. Datasta muodostetaan PostgreSQL-tietokanta, joka ladattiin Render-palvelulle. Sivulle toteutettiin erilaisia tietokannan dataa käyttäviä visualisointeja. Sivulla vierailija voi muuttaa visualisointien ulkonäköä ja tallentaa haluamansa näkymän. Ryhmämme toteutti palvelun käyttäen NodeJs-teknologiaa ja Reactia. Pyrkimyksenä on, että jokainen ryhmän jäsen toteuttaa jonkin visualisoinneista fullstack-kehittäjänä.


![erDiagram](https://user-images.githubusercontent.com/112494979/226402531-91ae8562-d370-4bb8-8386-ef670b6a5e57.PNG)
=======
                                                                          
## Tietokannan ER-Diagrammi

Jokaista visualisointia varten muodostetaan tietokantaan oma taulu. Lisäksi Muodostetaan taulu käyttätietojen rekisteröintiä varten. Tauluun tallennetaan käyttäjän suosikkinäkymän asetukset. 
Visualisoinnit 1-3 kertovat lämpötiloista ja co2 pitoisuuksista ilmakehässä. V1 näyttää viivagraafin mitatuista lämpötilatiedoista 1850-luvulta nykypäivään sekä pohjoisen pallonpuoliskon paleoklimatologiseen tutkimukseen perustuvan lämpötilamallin viimeiseltä 2000 vuodelta.
 V2 kuvaa viivagraafilla ilmakehän hiilidioksidipitoisuuksia Mauna Laolla tehtyjen mittausten ja jääkairauksilla saatujen näytteiden perusteella.  
 V3 on moniakselinen viivagraafi, jossa näytetään ilmakehän lämpötilan ja hiilidioksidipitoisuuksien muutokset 2 miljoonan vuoden ajalta. Graafiin tulee myös mahdollisuus näyttää ihmisen toiminnan merkkipaaluja kuten maanviljelyksen aloitus ja teollisuuden alku. 
 V4 ja V5 näyttävät co2 päästöjen lähteitä. V4 on pinottu viivagraafi joka näyttää maakohtaiset co2 päästöt.  Käyttäjä voi valita maat, joiden päästöt näytetään.
V5 näyttää co2 päästöt toimialoittain ja esittää tiedot piirakkakaavion muodossa.  Visualisointiin tulee myös mahdollisuus valita tarkempi erittely eri päästölähteistä.

![versio2](https://user-images.githubusercontent.com/112494979/226401937-72f1c8c7-6f6e-40b9-b7f1-24c72d4d8661.PNG)
=======

## Luonnos sivun ulkonäöstä

Sivulle tulee kolme erilaista näkymää. Ylimmässä näkymässä esitetään visulisoinnit 1-3, toisessa visualisoinnit 4-5 ja kolmenteen käyttäjä voi valita haluamansa visualisoinnit.  Sivusta tulee eri resoluutioille skaalautuva. Skaalautuvuus toteutetaan Bootstrap-kirjastoa käyttäen.

## Sovelluskoodin testaus

Sovelluksen koodin toiminnan testauksessa käytettiin pelkän käyttäjätestauksen lisäksi omia testausohjelmia, jotka luotiin ja suoritettiin Visual Studio Codessa. Testeissä käytettiin React-sovellusten suosimaa Jest-testauskehystä. 
Verkkosovelluksen käyttöliittymän (frontend) testitiedostot luotiin testaamaan nappien, lomakkeiden ja komponenttien renderöinti ja toiminta eri käyttötilanteissa.
Esimerkki käyttötilanteesta: Käyttäjä kirjautuu sisään ja näkyviin tulee profiilinappi jossa on käyttäjän nimi. Testiohjelma olettaa profiilinapin renderöityvän kun käyttäjä kirjautuu sisään ja testi on onnistunut kun testikoodi löytää tarvitsemansa oletuksen. Kun käyttäjä kirjautuu ulos sovelluksesta, profiilinappi ei ole enää näkyvissä. Testiohjelma olettaa että profiilinappi ei ole renderöity, ja testi on onnistunut jos profiilinappia ei löydy.
Frontendin eri toimintaosista tehtiin neljä (4) testitiedostoa joissa on yhteensä kaksikymmentäkolme (23) eri testiä.
Verkkosovelluksen taustalla toimiva osa (backend) vastaa sovelluksen logiikasta, tietokantakyselyistä ja palvelinpuolella tapahtuvista toiminnoista. Backendin testikoodit käsittävät rajapintojen toimintoja eri tilanteissa ja ne luotiin yhteen (1) tiedostoon jossa testejä on yhteensä kuusi (6) kappaletta.
Testeissä luodaan uusi käyttäjä tietokantaan, kirjaudutaan sovellukseen ja lopuksi poistetaan käyttäjä tietokannasta. Lisäksi testataan myös käyttötoimintojen virhetilanteet.

### Käyttöohjeet testaukseen Visual Studio Codessa:
### Frontend:
Avaa terminaali ’frontend’-kansiosta tai siirry terminaalin sisällä kansioon.
Suorita komento ’npm test’. Jos testit eivät käynnisty suoraan, suorita kaikki painamalla ’a’. Terminaaliin ilmestyy hyväksytyt sekä mahdolliset hylätyt testit.
Jos haluat tarkastella mitä testiohjelmat tarkalleen testaavat, paina ’w’ jonka jälkeen ’p’ ja kirjoita hakusanaksi haluamasi testitiedosto: App, DeleteUser, Signin tai Signup. Vain yksittäin suoritetut testit näyttävät testien sisällön.
Testit voi lopettaa painamalla ’w’ jonka jälkeen ’q’.

### Backend:
Avaa terminaali ’backend’-kansiosta tai siirry terminaalin sisällä kansioon.
Suorita komento ’npm test’. Terminaaliin ilmestyy hyväksytyt sekä mahdolliset hylätyt testit. Kaikki kuusi (6) testiä näkyvät myös terminaalissa.
Testit voi lopettaa komennolla ’Ctrl + c’.



