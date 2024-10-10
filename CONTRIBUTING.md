# Contributing to ZenZone 🌟

Welcome to the ZenZone project! We appreciate your interest in contributing to our mental health application. Together, we can create a supportive community focused on mental well-being.

## How to Contribute

### 1. Getting Started
- **Fork the repository** and clone it to your local machine.
- Create a new branch for your feature or bug fix:
  ```bash
  git checkout -b feature-name
  ```
  or
  ```bash
  git checkout -b bugfix-name
  ```
- Regularly keep your fork updated with the main branch:
  ```bash
  git pull upstream main
  ```
- Follow the setup instructions below to get the project running locally.

### 2. Setup Instructions

#### Backend
1. Clone the repository and navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following variables:
   ```
   MONGO_URI=your_mongo_db_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run server
   ```

#### Frontend
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm run dev
   ```

### 3. Reporting Bugs 🐛
- Before reporting, check the [existing issues](https://github.com/Bluesparx/raga/issues) to avoid duplicates.
- If you find a bug, create a new issue with:
  - **Title**: A clear and concise title.
  - **Description**: Steps to reproduce, expected behavior, and actual behavior.
  - **Environment**: Browser version, OS, or any other relevant details.

### 4. Suggesting Features 🚀
- Check the [existing issues](https://github.com/Bluesparx/raga/issues) for similar suggestions.
- Open a new issue with:
  - **Title**: Title of the feature.
  - **Description**: Explain the feature with examples.
  - **Use Case**: How this feature benefits users.

### 5. Making Code Contributions 💻
- Ensure your code follows the project's coding style.
- Create a pull request against the `main` branch with a descriptive title and a summary of changes.

### 6. UI/UX Contributions 🎨
- If you're contributing to design, create mockups or design assets.
- Follow the existing style guide for consistency.
- Submit designs through issues or a shared design file.

### 7. Additional Guidelines
- Keep commit messages concise and descriptive.
- Submit one feature or bug fix per pull request.
- Ensure compatibility with supported versions of Node.js and other dependencies.

## Code of Conduct
We expect all contributors to adhere to Code of Conduct to foster an inclusive and respectful community.

---

Thank you for your interest in contributing to ZenZone! If you have any questions or need assistance, feel free to reach out.

Happy coding! 💚
