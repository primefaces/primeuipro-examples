import type { TaskBoardItem, TaskBoardSwimlane } from '@primeui/vue-taskboard';

export type DemoPriority = 'low' | 'medium' | 'high';

export interface DemoColumn {
    id: string | number;
    label: string;
    statusType?: 'todo' | 'in-progress' | 'done' | 'blocked';
    order?: number;
}

export interface DemoTask extends TaskBoardItem {
    id: string;
    title: string;
    description?: string;
    columnId: string;
    teamId: string;
    category: string;
    priority: DemoPriority;
    assignee: string;
    dueDate: string;
    order: number;
}

export interface DemoTaskFormValue {
    title: string;
    description: string;
    columnId: string | number;
    teamId: string | number;
    category: string;
    priority: DemoPriority;
    assignee: string;
    dueDate: string;
}

export const demoColumns: DemoColumn[] = [
    { id: 'backlog', label: 'Backlog', statusType: 'todo', order: 0 },
    { id: 'planned', label: 'Planned', statusType: 'todo', order: 1 },
    { id: 'in-progress', label: 'In progress', statusType: 'in-progress', order: 2 },
    { id: 'done', label: 'Done', statusType: 'done', order: 3 }
];

export const demoSwimlanes: TaskBoardSwimlane[] = [
    { id: 'design', label: 'Design', order: 0 },
    { id: 'platform', label: 'Platform', order: 1 },
    { id: 'growth', label: 'Growth', order: 2 }
];

const demoTasks: DemoTask[] = [
    {
        id: 'PUI-184',
        title: 'Map keyboard focus states',
        columnId: 'backlog',
        teamId: 'design',
        category: 'Accessibility',
        priority: 'high',
        assignee: 'Mina Cole',
        dueDate: '2026-07-16',
        order: 0
    },
    {
        id: 'PUI-191',
        title: 'Review empty board language',
        columnId: 'backlog',
        teamId: 'growth',
        category: 'Content',
        priority: 'low',
        assignee: 'Owen Ray',
        dueDate: '2026-07-18',
        order: 1
    },
    {
        id: 'PUI-198',
        title: 'Define server persistence adapter',
        columnId: 'backlog',
        teamId: 'platform',
        category: 'Architecture',
        priority: 'medium',
        assignee: 'Theo Grant',
        dueDate: '2026-07-22',
        order: 2
    },
    {
        id: 'PUI-176',
        title: 'Finalize card density tokens',
        columnId: 'planned',
        teamId: 'design',
        category: 'Design system',
        priority: 'medium',
        assignee: 'Mina Cole',
        dueDate: '2026-07-13',
        order: 0
    },
    {
        id: 'PUI-180',
        title: 'Add optimistic move handling',
        columnId: 'planned',
        teamId: 'platform',
        category: 'Data flow',
        priority: 'high',
        assignee: 'Nora Hall',
        dueDate: '2026-07-14',
        order: 1
    },
    {
        id: 'PUI-187',
        title: 'Prepare release announcement',
        columnId: 'planned',
        teamId: 'growth',
        category: 'Launch',
        priority: 'medium',
        assignee: 'Owen Ray',
        dueDate: '2026-07-15',
        order: 2
    },
    {
        id: 'PUI-169',
        title: 'Build swimlane collapse behavior',
        columnId: 'in-progress',
        teamId: 'platform',
        category: 'Interaction',
        priority: 'high',
        assignee: 'Nora Hall',
        dueDate: '2026-07-11',
        order: 0
    },
    {
        id: 'PUI-172',
        title: 'Polish drag preview treatment',
        columnId: 'in-progress',
        teamId: 'design',
        category: 'Interaction',
        priority: 'medium',
        assignee: 'Mina Cole',
        dueDate: '2026-07-12',
        order: 1
    },
    {
        id: 'PUI-179',
        title: 'Record onboarding walkthrough',
        columnId: 'in-progress',
        teamId: 'growth',
        category: 'Education',
        priority: 'low',
        assignee: 'Owen Ray',
        dueDate: '2026-07-17',
        order: 2
    },
    {
        id: 'PUI-151',
        title: 'Ship column reorder events',
        columnId: 'done',
        teamId: 'platform',
        category: 'API',
        priority: 'high',
        assignee: 'Theo Grant',
        dueDate: '2026-07-07',
        order: 0
    },
    {
        id: 'PUI-158',
        title: 'Approve compact card layout',
        columnId: 'done',
        teamId: 'design',
        category: 'Design system',
        priority: 'medium',
        assignee: 'Mina Cole',
        dueDate: '2026-07-08',
        order: 1
    },
    {
        id: 'PUI-163',
        title: 'Publish migration checklist',
        columnId: 'done',
        teamId: 'growth',
        category: 'Documentation',
        priority: 'low',
        assignee: 'Owen Ray',
        dueDate: '2026-07-09',
        order: 2
    }
];

export function createDemoTasks(): DemoTask[] {
    return demoTasks.map((task) => ({ ...task, tags: [task.category] }));
}
