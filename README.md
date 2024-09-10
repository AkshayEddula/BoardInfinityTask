# BoardInfinity Task Management App

## Description

The BoardInfinity Task Management App is a web-based application designed to help users organize, track, and manage their tasks efficiently. It provides a user-friendly interface for creating, updating, and monitoring tasks, helping individuals or teams to stay productive and meet their goals.

## Features

- User authentication and authorization
- Create, read, update, and delete tasks
- Set due dates and priorities for tasks
- Responsive design for desktop and mobile use(development)

## Technologies Used

- Frontend: Next.js with TypeScript
- Backend: Firebase
- Styling: Tailwind CSS
- Components Libraries: Material UI

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- setup Firebase account and create a new project with authentication and firestore database

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/AkshayEddula/BoardInfinityTask
   ```

2. Navigate to the project directory:
   ```
   cd boardinfinitytask
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
    NEXT_PUBLIC_FIREBASE_API_KEY
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    NEXT_PUBLIC_FIREBASE_PROJECT_ID
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    NEXT_PUBLIC_FIREBASE_APP_ID
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

   ```

5. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`
2. Register a new account or log in with existing credentials
3. Start creating and managing your tasks!

## Contributing

Contributions to the BoardInfinity Task Management App are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## Contact

AkshayEddula - akshayeddula454@gmail.com

Project Link: [https://github.com/AkshayEddula/BoardInfinityTask](https://board-infinity-task-48zi.vercel.app/)
