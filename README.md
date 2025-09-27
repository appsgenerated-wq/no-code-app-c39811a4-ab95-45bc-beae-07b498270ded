# Orange Grove

Welcome to Orange Grove, an application for cataloging and exploring different varieties of oranges. This project is built entirely with a Manifest backend and a React frontend.

## Features

- **User Authentication**: Sign up and log in to manage your own entries.
- **Variety Catalog**: Create, view, update, and delete orange varieties.
- **Image Uploads**: Add a photo for each orange variety using Manifest's built-in file handling.
- **Ownership Policies**: Users can only edit or delete the varieties they have added.
- **Public Viewing**: The catalog of oranges is visible to everyone.
- **Auto-generated Admin Panel**: A full-featured admin dashboard is available for administrative tasks.

## Tech Stack

- **Backend**: Manifest (YAML-based backend definition)
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **SDK**: `@mnfst/sdk` for all backend communication

## Getting Started

### Prerequisites

- Node.js and npm
- A Manifest account and the Manifest CLI

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd orange-grove
    ```

2.  **Install frontend dependencies**:
    ```bash
    npm install
    ```

3.  **Set up the backend**:
    - Make sure you have `manifest.yml` in your project root.
    - Deploy the backend using the Manifest CLI:
      ```bash
      mnfst deploy
      ```

4.  **Configure Environment Variables**:
    - Create a `.env` file in the root of your project.
    - Add your Manifest backend URL provided after deployment:
      ```
      VITE_BACKEND_URL=https://your-manifest-backend-url.mnfst.app
      ```

5.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Default Credentials

- **Admin**: `admin@manifest.build` / `admin`
- **Demo User**: `user@manifest.build` / `password` (You may need to create this user via signup or the admin panel first).

Access the admin panel at `https://your-manifest-backend-url.mnfst.app/admin`.
