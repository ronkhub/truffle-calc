# TruffleCalc

Truffle-calc is a mobile-first web app that helps truffle traders and enthusiasts calculate prices based on truffle type, size range, and weight. Built with Angular and Angular Material, it stores truffle catalogs, size tiers, and full price history in Firebase Firestore and is hosted on Firebase.

## Features

- **Truffle Catalog**: Browse and manage different truffle types with their base prices
- **Size Tiers**: Configure size ranges with price multipliers
- **Price Calculator**: Calculate truffle prices based on type, size, and weight
- **Price History**: Track historical price changes

## Development

### Prerequisites

- Node.js 20+
- npm 10+
- Angular CLI 19+

### Installation

```bash
npm install
```

### Development server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload on source changes.

### Building

```bash
ng build
```

Build artifacts are stored in the `dist/` directory.

### Running unit tests

```bash
ng test
```

## Technology Stack

- Angular 19 with standalone components
- Angular Material
- Firebase Hosting
- Cloud Firestore
