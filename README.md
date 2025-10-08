# CollecType Angular Demo - Pokemon Collection Management

A comprehensive demonstration of **CollecType** collection engine using Pokemon data and Angular framework with modern Signals architecture.

## 🎯 Overview

This project showcases the power and flexibility of **CollecType** - a TypeScript library for advanced collection operations - through an interactive Pokemon database. The demo features real-time filtering, sorting, and statistical analysis of Pokemon data using Angular's latest Signals-based reactive architecture.

## ✨ Features

### 🔍 **Advanced Filtering**
- **Business Logic Filters**: `legendary()`, `experienced()`, `flying()`, `intimidating()`, `rare()`, `tall()`
- **Chainable Operations**: `flying() | rare()` for complex queries
- **Real-time Updates**: Instant visual feedback on filter changes
- **Smart Breadcrumbs**: Visual representation of active filter chains

### 📊 **Dynamic Statistics**
- **Live Counters**: Real-time stats for all filter categories
- **Type Distribution**: Pokemon count by type (Fire, Water, Electric, etc.)
- **Responsive Design**: Statistics adapt to mobile/desktop viewing

### 🎛️ **Flexible Sorting**
- **Multi-criteria**: Sort by ID, Name, Species, Generation, Base Experience, Height, Weight
- **Direction Control**: Ascending/Descending toggle
- **Persistent State**: Sort preferences maintained across interactions

### 📱 **Responsive UI**
- **Mobile-first**: Optimized for touch devices
- **Bulma CSS**: Modern, clean design system
- **Interactive Cards**: Hover effects and detailed Pokemon information

## 🛠️ Technology Stack

### **Frontend Framework**
- **Angular 20.3+** with Standalone Components
- **Signals Architecture** (Zoneless change detection ready)
- **TypeScript 5.9+** with strict type checking
- **SCSS** for advanced styling

### **Collection Engine**
- **CollecType 0.9.6** - Advanced collection operations
- **Custom Pokemon Functions** - Domain-specific business logic
- **Reactive Patterns** - Signal-based data flow

### **UI Framework**
- **Bulma CSS 1.0.4** - Modern CSS framework
- **Font Awesome 7.0+** - Icon library
- **Responsive Grid** - Mobile-adaptive layouts

## 🏗️ Architecture

### **Component Structure**
```
src/app/components/
├── pokemon-card.component.ts          # Individual Pokemon display
├── filter-navbar.component.ts         # Main filter controls
├── navbar-item.component.ts          # Reusable filter buttons
├── pokemon-stats.component.ts         # Category statistics
├── filter-breadcrumb.component.ts     # Filter chain visualization
├── pokemon-type-stats.component.ts    # Type-based counters
└── sort-navbar.component.ts          # Sorting controls
```

### **Data Models**
```typescript
// Pokemon interface with modern TypeScript features
type Pokemon = {
  id: number;
  name: string;
  types: Array<string>;
  stats: Map<string, number>;        // Using Map for performance
  abilities: Set<string>;            // Using Set for uniqueness
  is_legendary: boolean;
  // ... additional properties
}
```

### **CollecType Integration**
```typescript
// Custom Pokemon collection with business logic
export class PokemonFunctions extends FullFunctions<Pokemon> {
  experienced(minExp = 100) { /* ... */ }
  flying() { /* ... */ }
  legendary(flag = true) { /* ... */ }
  // Domain-specific methods
}

export class PokemonCollection extends Collection<Pokemon, PokemonFunctions> {
  // Inherits all standard + custom operations
}
```

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** 18+ 
- **npm** or **yarn**
- **Angular CLI** 20+

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd collectype-demo-angular

# Install dependencies
npm install

# Start development server
npm run start
```

### **Available Scripts**
```bash
npm run start      # Development server (http://localhost:4200)
npm run build      # Production build
npm run test       # Run unit tests
npm run lint       # Code linting
```

## 📚 CollecType Usage Examples

### **Basic Operations**
```typescript
const collection = new PokemonCollection(pokemons);

// Simple filtering
const legendary = collection.fn.legendary();
const experienced = collection.fn.experienced(150);

// Chaining operations
const rareFlying = collection.fn.flying().pipe('rare()');

// Sorting
const sortedByName = collection.fn.all().sort('name', 'asc');
```

### **Real-time Reactive Patterns**
```typescript
// Angular Signals integration
const filtered = computed(() => 
  collection().fn.pipe(this.filterExpression()).sort(this.sortField())
);

// Automatic UI updates when data changes
@Component({
  template: `
    @for (pokemon of filtered().items; track pokemon.id) {
      <app-pokemon-card [pokemon]="pokemon" />
    }
  `
})
```

## 🎮 Demo Features

### **Interactive Filtering**
Try these filter combinations in the live demo:
- `all()` - Show all Pokemon
- `legendary()` - Legendary Pokemon only
- `flying() | rare()` - Flying OR rare Pokemon
- `experienced(200)` - Pokemon with 200+ base experience

### **Statistical Insights**
- **Category Counters**: See how many Pokemon match each filter
- **Type Distribution**: Visual breakdown by Pokemon type
- **Real-time Updates**: Watch numbers change as you filter

### **Responsive Design**
- **Desktop**: Full feature set with statistics sidebar
- **Mobile**: Streamlined interface with touch-optimized controls
- **Tablet**: Balanced layout adapting to screen size

## 🔄 Comparison with Vue Demo

This Angular implementation demonstrates the same CollecType functionality as the Vue version, showcasing:

### **Framework Differences**
| **Aspect** | **Angular** | **Vue** |
|------------|-------------|---------|
| **Reactivity** | Signals | Composition API |
| **Templates** | Control Flow (`@if`, `@for`) | Directives (`v-if`, `v-for`) |
| **Components** | Standalone + Inputs/Outputs | `<script setup>` + Props/Emits |
| **Styling** | Host binding + SCSS | Scoped CSS |

### **Shared Concepts**
- ✅ **Same CollecType API** - Identical filtering and sorting logic
- ✅ **Same UI/UX** - Consistent user experience across frameworks
- ✅ **Same Data Model** - Shared Pokemon dataset and structure
- ✅ **Same Performance** - Optimized reactive updates in both

## 🎯 Key Learning Points

### **CollecType Benefits**
1. **Type Safety** - Full TypeScript support with intelligent autocomplete
2. **Performance** - Optimized algorithms for large datasets
3. **Flexibility** - Chainable operations for complex queries
4. **Extensibility** - Custom business logic integration
5. **Reactivity** - Seamless integration with modern frameworks

### **Modern Angular Patterns**
1. **Signals Architecture** - Prepare for zoneless Angular
2. **Standalone Components** - Simplified dependency management
3. **Control Flow Syntax** - Modern template expressions
4. **Input/Output Functions** - Type-safe component communication

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 🔗 Related Projects

- **[CollecType Library](https://github.com/collectype/collectype)** - The core collection engine
- **[Vue Demo](../collectype-demo-vue)** - Vue 3 implementation of the same demo
- **[Documentation](https://collectype.dev)** - Complete CollecType documentation

---

**Built with ❤️ using CollecType, Angular, and modern web technologies**
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
