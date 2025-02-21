# MdProAngularCli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.5.

Run `npm install` to install all the dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



=======
**Essential Angular Commands**

### **1. Setup & Installation**

- **Install Angular CLI (if not installed)**:
  ```sh
  npm install -g @angular/cli
  ```
- **Install project dependencies** (run inside the project folder):
  ```sh
  npm install
  ```

---

### **2. Running & Serving the Project**

- **Start the development server** (default on `http://localhost:4200`):
  ```sh
  ng serve
  ```
    - If you need to specify a port:
      ```sh
      ng serve --port=4300
      ```
    - If your project has multiple environments:
      ```sh
      ng serve --configuration=production
      ```

---

### **3. Building the Project**

- **Build for production**:
  ```sh
  ng build --configuration=production
  ```
  The output will be in the `dist/` folder.
- **Build with optimizations for production**:
  ```sh
  ng build --prod
  ```
- **Build with a custom output path**:
  ```sh
  ng build --output-path=./my-output-folder
  ```

---

### **4. Running Tests**

- **Run unit tests**:
  ```sh
  ng test
  ```
- **Run end-to-end tests** (if using Cypress or Protractor):
  ```sh
  ng e2e
  ```

---

### **5. Generating Components, Services, etc.**

Angular CLI allows you to generate components, services, and modules:

- **Generate a new component**:
  ```sh
  ng generate component my-component
  ```
  or shorthand:
  ```sh
  ng g c my-component
  ```
- **Generate a new service**:
  ```sh
  ng generate service my-service
  ```
- **Generate a new module**:
  ```sh
  ng generate module my-module
  ```

---

### **6. Managing Dependencies**

- **Add a new package**:
  ```sh
  npm install package-name
  ```
- **Uninstall a package**:
  ```sh
  npm uninstall package-name
  ```
- **Update Angular CLI and dependencies**:
  ```sh
  ng update
  ```

---

### **7. Deploying the Project**

- After building for production (`ng build --prod`), you can:
    - Deploy to a server by copying the `dist/` folder.
    - Use Firebase Hosting:
      ```sh
      npm install -g firebase-tools
      firebase login
      firebase init
      firebase deploy
      ```
    - Deploy to GitHub Pages:
      ```sh
      ng add angular-cli-ghpages
      ng deploy
      ```

