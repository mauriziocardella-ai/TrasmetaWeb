
# TrasmetaWEB 🏛️
**Sistema di Interfaccia Web per l'Istituto Zooprofilattico Sperimentale della Sicilia**

TrasmetaWEB è una moderna Web Application progettata per fungere da ponte (Proxy) tra un frontend reattivo e un backend **Firebird REST API**. Il sistema implementa una rigorosa sicurezza tramite firma **HMAC-SHA256** per garantire l'integrità dei dati scambiati.

## 🚀 Caratteristiche Principali

* **Architettura Proxy**: Server Node.js integrato per gestire le chiamate API verso la rete interna (10.254.254.65).
* **Sicurezza Avanzata**: Firma HMAC automatica su ogni richiesta REST per prevenire manomissioni.
* **UI Standard AgID**: Interfaccia pulita basata su Bootstrap 5, seguendo le linee guida per la Pubblica Amministrazione.
* **Feedback Real-time**: Gestione centralizzata di Spinner di caricamento e notifiche Toast per un'esperienza utente fluida.

---

## 🛠️ Architettura del Sistema

Il progetto è diviso in tre strati principali:

1.  **Frontend (Vanilla JS)**: Gestione della navigazione (SPA) e della visualizzazione dati.
2.  **Node.js Proxy**: Riceve le chiamate dal browser, aggiunge gli header di sicurezza (`X-Signature`, `X-Timestamp`) e le inoltra al database.
3.  **Firebird REST**: Il server remoto che processa le query e restituisce i dati in formato JSON.



---

## 📦 Installazione e Avvio

1.  **Requisiti**: Assicurati di avere [Node.js](https://nodejs.org/) installato (versione 18+ consigliata).
2.  **Configurazione**: Modifica il file `config.js` con i parametri corretti:
    ```javascript
    export const REST_API_URL = "http://10.254.254.65:16384";
    export const DB_SECRET_KEY = "la_tua_chiave_segreta";
    ```
3.  **Avvio del Server**:
    ```bash
    node server.mjs
    ```
4.  **Accesso**: Apri il browser su `http://localhost:5000`.

---

## 🔐 Protocollo di Firma HMAC

Ogni chiamata verso il backend deve essere firmata. La stringa di base per la firma è composta da:
`Timestamp | Metodo HTTP | Path Completo |`

**Esempio di generazione:**
* **Path**: `/api/element?codice=MS.000.001`
* **Stringa**: `2026-03-23T14:30:00Z|GET|/api/element?codice=MS.000.001|`
* **Algoritmo**: HMAC-SHA256 con `DB_SECRET_KEY`.

---

## 📂 Struttura delle Cartelle

```text
/
├── server.mjs           # Server Node.js (Entry point)
├── config.js            # Configurazioni IP, Porte e Chiavi
├── /public              # File statici serviti al browser
│   ├── index.html       # Layout principale
│   ├── /js
│   │   ├── app.js       # Router e logica di avvio
│   │   ├── /services    # messageManager.js, Utils.js
│   │   └── /views       # Mod1.js (Logica dei moduli)
│   └── /css             # Stili personalizzati e Bootstrap
└── /api
    └── ApiRest.js       # Logica Proxy e Firma HMAC
```

---

## 📝 Note per lo Sviluppo
* **Stato 404**: Verificare che l'endpoint remoto includa il prefisso `/api/` se richiesto dal server Firebird.
* **Stato 400**: Spesso indica una discrepanza nella stringa di firma (es. slash iniziale mancante o case-sensitivity del codice).
* **Asset Grafici**: Il logo dell'Istituto deve essere salvato in formato `.png` con sfondo trasparente (gestito tramite GIMP).

---

## ✒️ Autore
* **Sviluppatore**: [Il tuo nome/team]
* **Ente**: IZS Sicilia

