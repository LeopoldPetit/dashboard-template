# 📊 Dashboard de Pilotage — StreamFlow

> **TP — Mission de Pilotage Projet**  
> Tableau de bord opérationnel pour la plateforme SaaS de streaming vidéo **StreamFlow**

---

## 🏢 Contexte

**StreamFlow** est une plateforme SaaS de streaming vidéo (films, séries, documentaires).

| Info | Valeur |
|------|--------|
| Utilisateurs inscrits | 250 000 |
| Utilisateurs actifs mensuels | 120 000 |
| Abonnement | 9,99 €/mois |
| Équipe | 15 devs · 2 DevOps · 1 PO · 1 CTO |
| Stack | React · Node.js · PostgreSQL · AWS · Grafana |

Depuis 2 mois, des problèmes critiques ont été remontés : lenteur des vidéos, erreurs de paiement, augmentation des désabonnements, bugs fréquents en production et retards de livraison.

---

## 🎯 Objectif

Ce dashboard permet de :
- **Comprendre les problèmes** via les KPI calculés
- **Suivre la performance** technique, projet, DevOps et business
- **Prendre des décisions** éclairées en tant que CTO

---

## 📐 KPI Calculés

### ⚙️ KPI Techniques

| KPI | Valeur | Formule |
|-----|--------|---------|
| Error Rate | **4%** | 48 000 / 1 200 000 × 100 |
| Temps moyen API | **562 ms** | Moyenne de l'échantillon |
| P95 Temps réponse | **2 500 ms** | Percentile 95 de l'échantillon |
| Uptime | **99,1%** | (720h - 6,5h) / 720h × 100 |
| MTTR | **1,6 h** | (2 + 1 + 3 + 0,5) / 4 |

### 📋 KPI Projet

| KPI | Valeur | Formule |
|-----|--------|---------|
| Vélocité S1 | **35 / 40 SP** (87,5%) | Réalisé / Prévu |
| Vélocité S2 | **30 / 45 SP** (66,7%) | Réalisé / Prévu |
| Vélocité S3 | **25 / 50 SP** (50%) | Réalisé / Prévu |
| Évolution vélocité | **-42% sur 3 sprints** | Tendance baissière |
| Bug Rate | **5,3 bugs/feature** | 320 bugs / 60 features |
| Fix Rate | **56,3%** | 180 / 320 × 100 |

### 🚀 KPI DevOps (DORA Metrics)

| KPI | Valeur | Formule |
|-----|--------|---------|
| Deployment Frequency | **1,3 / jour** | 40 déploiements / 30 jours |
| Change Failure Rate | **30%** | 12 échecs / 40 déploiements × 100 |
| Lead Time | **5 jours** | Donnée brute |

### 💼 KPI Business

| KPI | Valeur | Formule |
|-----|--------|---------|
| Churn Rate | **33,3%** | 40 000 perdus / 120 000 début × 100 |
| Retention Rate | **66,7%** | 100% - Churn Rate |
| ARPU | **10 €** | 1 000 000 € / 100 000 utilisateurs |
| Conversion Rate | **4%** | 8 000 abonnements / 200 000 visiteurs × 100 |

---

## 🔍 Analyse

### 1. Problèmes majeurs

- **Churn massif** : 40 000 utilisateurs perdus en un mois (−33%) dû aux bugs de paiement et de chargement
- **Instabilité de la prod** : CFR à 30% (seuil DORA Elite : < 5%) — les déploiements introduisent des régressions
- **Effondrement de la vélocité** : de 87,5% à 50% en 3 sprints — l'équipe corrige plus qu'elle ne développe
- **Performance dégradée** : P95 à 2 500 ms, bien au-delà du seuil acceptable de 500 ms

### 2. KPI critiques

| KPI | Valeur actuelle | Seuil d'alerte |
|-----|----------------|----------------|
| Churn Rate | 33,3% | > 5% |
| Change Failure Rate | 30% | > 5% |
| P95 Temps réponse | 2 500 ms | > 500 ms |
| Fix Rate | 56,3% | < 80% |
| Vélocité (tendance) | −42% | Toute baisse sur 2 sprints |

### 3. Liens technique ↔ business

```
Bugs prod (CFR 30%) → Erreurs paiement → Churn +33%
P95 2500ms → "Vidéos ne se lancent pas" → Résiliations
Vélocité -42% → Moins de features → Moins de rétention
```

---

## 🎯 Plan d'action CTO — 5 Priorités

| Priorité | Action | KPI ciblés |
|----------|--------|------------|
| 🔴 P1 | **Stabiliser la prod** — Feature flags, tests auto, rollback automatique | CFR, Error Rate |
| 🔴 P2 | **Réduire le churn** — Corriger bugs paiement + chargement vidéo en urgence | Churn Rate, Fix Rate |
| 🟡 P3 | **Améliorer les performances** — CDN vidéo, cache API, profiling Node.js | P95, Avg Response Time |
| 🟡 P4 | **Restaurer la vélocité** — Limiter bugs ouverts à 50 max, tests unitaires | Vélocité, Bug Rate |
| 🟢 P5 | **Réduire le Lead Time** — CI/CD complète, tests de non-régression, cible < 1 jour | Lead Time, Deploy Freq |

---

## 🚀 Installation & Lancement

```bash
# Cloner le projet
git clone https://github.com/LeopoldPetit/dashboard-template.git
cd dashboard-template

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Builder pour la production
npm run build
```

L'application sera disponible sur **http://localhost:5173**

---

## 🛠️ Stack Technique

| Technologie | Usage |
|-------------|-------|
| **React 19** | Framework UI |
| **TypeScript** | Typage statique |
| **Vite** | Build tool & Dev server |
| **Tailwind CSS v4** | Styles utilitaires |
| **Recharts** | Graphiques (Bar, Line, Pie) |
| **Lucide React** | Icônes |

---



## 📋 Livrables du TP

- [x] **Tableau de KPI calculés** — voir section ci-dessus et `src/data/kpi.ts`
- [x] **Analyse écrite** — voir section Analyse
- [x] **Dashboard** — application React interactive
- [x] **Plan d'action** — 5 priorités CTO justifiées par les KPI

### Bonus
- [x] Seuils d'alerte définis sur chaque KpiCard
- [x] Statuts visuels automatiques (ok / warning / critical)
- [x] Métriques DORA intégrées (CFR, Lead Time, Deploy Frequency)

---

*Propriété de Julien Grade — TP Mission de Pilotage Projet*
