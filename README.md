#Web-ohjelmoinnin sovellusprojekti – Ryhmä 2

Ryhmän jäsenet
Niko Kolehmainen	Dibble117
Samuli Kuusisto	siLtzi
Miikka Tyvelä	ergosha
Hannu Väliahde	HTV76

Projektin GitHub-linkki: https://github.com/R2-WebSovellusprojekti/R2-WebSovellusprojekti

# Projektin tarkoitus

Projektissa toteutettiin www-sivu ilmastomuutokseen liittyvän tiedon visualisointia varten. Sivulle haetaan ilmastomuutokseen liittyvää dataa useasta erillisestä julkisesta lähteestä. Datasta muodostetaan PostgreSQL-tietokanta, joka ladattiin Render-palvelulle. Sivulle toteutettiin erilaisia tietokannan dataa käyttäviä visualisointeja. Sivulla vierailija voi muuttaa visualisointien ulkonäköä ja tallentaa haluamansa näkymän. Ryhmämme toteutti palvelun käyttäen NodeJs-teknologiaa ja Reactia. Pyrkimyksenä on, että jokainen ryhmän jäsen toteuttaa jonkin visualisoinneista fullstack-kehittäjänä.


![erDiagram](https://user-images.githubusercontent.com/112494979/226402531-91ae8562-d370-4bb8-8386-ef670b6a5e57.PNG)
                                                                          
                                                                          #Tietokannan ER-Diagrammi

Jokaista visualisointia varten muodostetaan tietokantaan oma taulu. Lisäksi Muodostetaan taulu käyttätietojen rekisteröintiä varten. Tauluun tallennetaan käyttäjän suosikkinäkymän asetukset. 
Visualisoinnit 1-3 kertovat lämpötiloista ja co2 pitoisuuksista ilmakehässä. V1 näyttää viivagraafin mitatuista lämpötilatiedoista 1850-luvulta nykypäivään sekä pohjoisen pallonpuoliskon paleoklimatologiseen tutkimukseen perustuvan lämpötilamallin viimeiseltä 2000 vuodelta.
 V2 kuvaa viivagraafilla ilmakehän hiilidioksidipitoisuuksia Mauna Laolla tehtyjen mittausten ja jääkairauksilla saatujen näytteiden perusteella.  
 V3 on moniakselinen viivagraafi, jossa näytetään ilmakehän lämpötilan ja hiilidioksidipitoisuuksien muutokset 2 miljoonan vuoden ajalta. Graafiin tulee myös mahdollisuus näyttää ihmisen toiminnan merkkipaaluja kuten maanviljelyksen aloitus ja teollisuuden alku. 
 V4 ja V5 näyttävät co2 päästöjen lähteitä. V4 on pinottu viivagraafi joka näyttää maakohtaiset co2 päästöt.  Käyttäjä voi valita maat, joiden päästöt näytetään.
V5 näyttää co2 päästöt toimialoittain ja esittää tiedot piirakkakaavion muodossa.  Visualisointiin tulee myös mahdollisuus valita tarkempi erittely eri päästölähteistä.

![versio2](https://user-images.githubusercontent.com/112494979/226401937-72f1c8c7-6f6e-40b9-b7f1-24c72d4d8661.PNG)
=======

