import type { SchedulerEvent, SchedulerResource } from '@primeui/vue-scheduler';

export const demoDate = new Date();
demoDate.setHours(0, 0, 0, 0);

export const resources: SchedulerResource[] = [
    { id: 'studio-a', title: 'Studio A', eventColor: 'rgb(37 99 235)', metadata: { role: 'Product' } },
    { id: 'studio-b', title: 'Studio B', eventColor: 'rgb(5 150 105)', metadata: { role: 'Design' } },
    { id: 'lab', title: 'Build Lab', eventColor: 'rgb(147 51 234)', metadata: { role: 'Engineering' } },
    { id: 'review-room', title: 'Review Room', eventColor: 'rgb(234 88 12)', metadata: { role: 'Operations' } }
];

function at(dayOffset: number, hour: number, minute = 0) {
    const date = new Date(demoDate);

    date.setDate(date.getDate() + dayOffset);
    date.setHours(hour, minute, 0, 0);

    return date;
}

export const events: SchedulerEvent[] = [
    { id: 'roadmap', title: 'Roadmap sync', start: at(0, 8, 30), end: at(0, 10), resourceId: 'studio-a', color: 'rgb(37 99 235)' },
    { id: 'design', title: 'Design review', start: at(0, 10, 30), end: at(0, 12), resourceId: 'studio-b', color: 'rgb(5 150 105)' },
    { id: 'build', title: 'Build window', start: at(1, 9), end: at(1, 13), resourceId: 'lab', color: 'rgb(147 51 234)' },
    { id: 'qa', title: 'Release QA', start: at(2, 11), end: at(2, 14), resourceId: 'review-room', color: 'rgb(234 88 12)' },
    { id: 'launch', title: 'Launch preparation', start: at(3, 9), end: at(5, 16), resourceId: 'studio-a', color: 'rgb(37 99 235)' }
];
