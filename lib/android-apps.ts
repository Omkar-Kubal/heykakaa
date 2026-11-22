export const androidApps = {
  syncspend: {
    name: "SyncSpend",
    shortDescription: "Daily expense log",
    heading: "An Android expense tracker for everyday spending",
    description:
      "SyncSpend helps you record daily expenses, review spending patterns, and optionally sync expenses with Notion.",
    audience:
      "For people who want a straightforward way to record expenses and review where their money goes, including people who organize their finances in Notion.",
    banner: "/assets/syncspend-banner.jpg",
    icon: "/assets/syncspend-icon.png",
    shareImage: "/assets/syncspend-social.webp",
    playUrl: "https://play.google.com/store/apps/details?id=com.appylab.syncspend",
    features: [
      {
        title: "Record everyday expenses",
        description:
          "Add an amount, category, payment method, date, and notes to keep an expense log.",
      },
      {
        title: "Review spending patterns",
        description:
          "Explore monthly totals, category breakdowns, daily trends, and month-over-month summaries.",
      },
      {
        title: "Connect with Notion",
        description:
          "Optionally connect a Notion database and sync expense entries with your workspace.",
      },
      {
        title: "Use Android shortcuts",
        description:
          "Check spending with home screen widgets or add an expense from the Quick Settings tile.",
      },
      {
        title: "Export your expense history",
        description:
          "Export expense records as a CSV file and share it with an app on your device.",
      },
    ],
    shareTitle: "SyncSpend Expense Tracker",
    shareDescription: "Daily expense logging, spending insights, and optional Notion sync.",
  },
  synctasks: {
    name: "SyncTasks",
    shortDescription: "Tasks & to-do planner",
    heading: "An Android task planner for clearer days",
    description:
      "SyncTasks helps you capture tasks, focus on today, plan what is coming next, and organize work with lists, reminders, and recurring tasks.",
    audience:
      "For people who want to keep daily tasks and upcoming work organized without building a complicated system.",
    banner: "/assets/synctasks-banner.jpg",
    icon: "/assets/synctasks-icon.png",
    shareImage: "/assets/synctasks-social.webp",
    playUrl: "https://play.google.com/store/apps/details?id=com.appylab.synctasks",
    features: [
      {
        title: "Focus on today",
        description:
          "See tasks scheduled for today, add new ones, and review their dates, folders, and reminders.",
      },
      {
        title: "Plan what is coming up",
        description:
          "Browse upcoming work by agenda or week, and find overdue or unscheduled tasks.",
      },
      {
        title: "Organize tasks your way",
        description:
          "Use the inbox, folders, and lists to keep personal tasks, errands, and projects together.",
      },
      {
        title: "Schedule reminders and routines",
        description:
          "Set dates and reminders, then create recurring tasks for routines you want to repeat.",
      },
      {
        title: "Search and review progress",
        description:
          "Find tasks by date or folder, and use insights to review completion patterns over time.",
      },
      {
        title: "Keep today within reach",
        description:
          "Use the Android home screen widget to view today's tasks and open SyncTasks.",
      },
    ],
    shareTitle: "SyncTasks To-Do Planner",
    shareDescription: "Plan today, organize tasks, and schedule reminders on Android.",
  },
} as const;

export type AndroidAppSlug = keyof typeof androidApps;
export type AndroidApp = (typeof androidApps)[AndroidAppSlug];
