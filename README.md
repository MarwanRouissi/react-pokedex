# Pokémon Visualization Project

A web application designed to help me get started with React by visualizing Pokémon details and statistics using radar charts. This project uses React for rendering components and Chart.js for creating interactive charts.

![image](https://github.com/user-attachments/assets/229de035-67bc-4ebe-a2c9-1c24a34f6e85)


## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Learning Outcomes](#learning-outcomes)
- [Contributing](#contributing)

## Project Overview

This project serves as my introduction to React, focusing on:

- Building a React application from scratch.
- Integrating third-party libraries like Chart.js.
- Implementing dynamic styling and responsive design.
- Using infinite scrolling to load more Pokémon as the user scrolls down the page.

## Features

- Display a grid of Pokémon with their images, names, and IDs.
- Visualize a Pokémon's base statistics using a radar chart when a Pokémon is selected.
- Apply dynamic colors based on the Pokémon type.
- Load more Pokémon automatically as the user scrolls down the page.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/react-pokedex.git
```

2. Navigate to the project directory:

```bash
cd react-pokedex
```

3. Install the necessary dependencies:

```bash
npm install
```

4. Install Chart.js:

```bash
npm install chart.js
```

## Usage

To start the application in development mode, run the following command:

```bash
npm start
```

This will launch the application on http://localhost:3000 where you can interact with the application in your browser.

## Project Structure
- src/: Contains the source code of the application.
    - components/: Contains React components.
      - Pokedex.js: Main component that fetches and displays a list of Pokémon. It implements infinite scrolling to load more Pokémon as the user scrolls.
      - PokemonModal.js: Component for displaying detailed Pokémon information and statistics in a modal.
    - styles/: Contains CSS files for styling.
      - Pokedex.css: CSS file for styling the Pokémon grid and cards.
      - PokemonModal.css: CSS file for styling the Pokémon modal.
    - App.js: Main application component.
    - index.js: Entry point of the React application.

 ## Learning Outcomes

 Through this project, I have learned:
 - How to set up a React project and manage its dependencies.
 - The basics of creating and using React components.
 - Utilizing React Hooks such as useState, useEffect, and useCallback to manage state and side effects in functional components.
 - How to use Chart.js to create dynamic and interactive data visualizations.
 - Techniques for styling React applications and handling dynamic data.
 - Implementing infinite scroll functionality to enhance user experience.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please follow these steps:
1. Fork the project.
2. Create a branch for your feature.
   ```bash
    git checkout -b feature/AmazingFeature
   ```
4. Commit your changes.
   ```bash
    git commit -m 'Add some AmazingFeature'
   ```
6. Push to the branch.
   ```bash
   git push origin feature/AmazingFeature```
8. Open a Pull Request.
