type Priority = 'high' | 'medium' | 'low';
type Status = 'pending' | 'in progress' | 'completed';

interface Todo {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    date: string; // ISO date string
}

const todos: Todo[] = [
    {
        id: 1,
        title: "Complete project proposal",
        description: "Draft and submit the project proposal for the new client",
        priority: "high",
        status: "in progress",
        date: "2023-06-15T10:00:00Z"
    },
    {
        id: 2,
        title: "Review team performance",
        description: "Conduct quarterly performance reviews for team members",
        priority: "medium",
        status: "pending",
        date: "2023-06-20T14:00:00Z"
    },
    {
        id: 3,
        title: "Update website content",
        description: "Refresh the company website with new product information",
        priority: "low",
        status: "completed",
        date: "2023-06-10T09:30:00Z"
    },
    {
        id: 4,
        title: "Prepare for conference presentation",
        description: "Create slides and practice for upcoming industry conference",
        priority: "high",
        status: "in progress",
        date: "2023-06-25T11:00:00Z"
    },
    {
        id: 5,
        title: "Implement new feature",
        description: "Code and test the new user authentication feature",
        priority: "medium",
        status: "pending",
        date: "2023-06-18T13:45:00Z"
    },
    {
        id: 6,
        title: "Organize team building event",
        description: "Plan and schedule a team outing for next month",
        priority: "low",
        status: "in progress",
        date: "2023-07-05T15:30:00Z"
    },
    {
        id: 7,
        title: "Conduct user research",
        description: "Interview key users to gather feedback on the latest release",
        priority: "high",
        status: "pending",
        date: "2023-06-22T10:15:00Z"
    },
    {
        id: 8,
        title: "Optimize database queries",
        description: "Improve performance of slow-running database queries",
        priority: "medium",
        status: "completed",
        date: "2023-06-12T16:00:00Z"
    }
];

export default todos;
