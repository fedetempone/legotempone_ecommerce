# Talentotech - Terminal Product Management

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![npm](https://img.shields.io/badge/npm-9.x-blue)
![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/talentotech-cli/nodejs.yml?branch=main)
![Coverage](https://img.shields.io/badge/Coverage-95%25-brightgreen)
![Downloads](https://img.shields.io/npm/dt/talentotech-cli)
![License](https://img.shields.io/badge/License-MIT-yellow)

## About the Project

**Talentotech CLI** is a Node.js command-line tool to manage products in an online store.
It allows users to list, create, and delete products by interacting with the **FakeStore API** directly from the terminal.
This project demonstrates handling CLI arguments, asynchronous API calls, and clean console outputs, simulating an inventory management system.

---

## Technologies & Tools Used

This project is built using:

- **Node.js**
- **JavaScript (ES6+)**
- **Fetch API** for HTTP requests
- **Command-line interface (CLI)** for terminal interaction

---

## Getting Started

### Installation

**1. Clone the repository:**

```bash
git clone [https://github.com/yourusername/talentotech-cli.git](https://github.com/yourusername/talentotech-cli.git)
cd talentotech-cli
"```"

**2. Install dependencies:**

```bash"
npm install
```

### Usage

Run commands using npm scripts:

```bash
npm run start <METHOD> <RESOURCE> [ARGS...]
```

### Usage Examples

**List all products:**

```bash
npm run start GET products
```

**Get a specific product by ID:**

```bash
npm run start GET products/5
```

**Create a new product:**

```bash
npm run start POST products <title> <price> <category>
```

**Delete a product by ID:**

```bash
npm run start DELETE products/<productId>
```

**Note:** The FakeStore API is a test API, so created or deleted products are not permanently stored.

### Demo

**List products:**

```bash
npm run start GET products
```
Outputs a clean table with `ID | Title | Price | Category`.

**Create product:**

```bash
npm run start POST products RemeraAzul 2500 remeras
```
Simulates creating a product and shows the details in a table.

**Delete product:**

```bash
npm run start DELETE products/21
```
Simulates deleting a product with a confirmation table.

---

## Contact and Support

Ante cualquier inquietud siéntase en la libertad de consultar.

**_¡Si se puede imaginar, se puede programar!_**

Saludos cordiales! ![saludos](https://img.icons8.com/ios/20/star-trek-gesture.png)
