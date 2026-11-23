export const androidApps = {
  syncspend: {
    name: "SyncSpend",
    shortDescription: "Daily expense log",
    heading: "An Android expense tracker for everyday spending",
    description:
      "SyncSpend helps you record daily expenses, review spending patterns, and optionally sync expenses with Notion.",
    audience:
      "For people who want a straightforward way to record expenses and review where their money goes, including people who organize their finances in Notion.",
    banner: "/assets/syncspend-feature-graphic.png",
    icon: "/assets/syncspend-store-icon.png",
    shareImage: "/assets/syncspend-feature-graphic.png",
    shareImageWidth: 1024,
    shareImageHeight: 500,
    shareImageAlt: "SyncSpend feature graphic for daily expense tracking",
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
    banner: "/assets/synctasks-feature-graphic.png",
    icon: "/assets/synctasks-icon.png",
    shareImage: "/assets/synctasks-feature-graphic.png",
    shareImageWidth: 1794,
    shareImageHeight: 876,
    shareImageAlt: "SyncTasks feature graphic for planning tasks and to-dos",
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
  syncfocus: {
    name: "Sync Focus",
    shortDescription: "Focus timer & task planner",
    heading: "Make time for focus with Sync Focus",
    description:
      "Set a session with the circular timer, start from a task, and review completed sessions in Progress. Add ambient sound and a home-screen widget, with Focus Guard and Do Not Disturb automation available in Pro.",
    audience:
      "For people who want a simple way to start a focus session, plan the task around it, and see the time they gave to what matters.",
    banner: "/assets/sync-focus-feature-graphic.png",
    icon: "/assets/sync-focus-icon.png",
    shareImage: "/assets/sync-focus-feature-graphic.png",
    shareImageWidth: 1024,
    shareImageHeight: 500,
    shareImageAlt: "Sync Focus feature graphic: Make time for focus",
    playUrl: "https://play.google.com/store/apps/details?id=com.focusfirst&pcampaignid=web_share",
    features: [
      {
        title: "Set time with one ring",
        description:
          "Drag the circular timer to choose a session length, then start the countdown when you are ready.",
      },
      {
        title: "Focus from a task",
        description:
          "Plan tasks with their own durations and start a focus session from the task list.",
      },
      {
        title: "Review your progress",
        description:
          "See completed sessions and weekly focus time in the Progress view.",
      },
      {
        title: "Shape your focus space",
        description:
          "Use ambient sounds and a home-screen timer widget. Sync Focus Pro adds Focus Guard and Do Not Disturb automation.",
      },
    ],
    shareTitle: "Sync Focus Pomodoro Timer",
    shareDescription: "Make time for focus with a circular timer, task planner, and session history.",
  },
} as const;

export type AndroidAppSlug = keyof typeof androidApps;
export type AndroidApp = (typeof androidApps)[AndroidAppSlug];
