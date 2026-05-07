import moment from "moment";

export let UsersDatabase = {
  "ramesh@mindbox.com": {
    password: "password123",
    profile: {
      id: "MBX9012",
      name: "Ramesh Kumar",
      email: "ramesh.kumar@mindbox.com",
      phone: "+91 98765 43210",
      department: "IT Department",
      designation: "Software Engineer",
      location: "Bangalore, India",
    },
  },
};

/**
 * HERO LOGIC:
 * We create a function that returns the logs.
 * This ensures that every time the app calls the API,
 * it calculates the dates relative to "Right Now".
 */
const getDynamicLogs = (userId) => {
  const today = moment().format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

  // This simulates a real company database.
  // If a user hasn't walked past the FRS camera, these stay null.
  return [
    {
      date: today,
      dayName: moment().format("dddd"),
      checkIn: null, // Dynamic: Empty until FRS detects face
      checkOut: null,
      status: "Waiting...",
    },
    {
      date: yesterday,
      dayName: moment().subtract(1, "days").format("dddd"),
      checkIn: null, // Dynamic: Will show --:-- unless you add a time here
      checkOut: null,
      status: "No Record",
    },
  ];
};

export const mockApi = {
  getHomeStatus: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanId = userId.toLowerCase().trim();
        const user = UsersDatabase[cleanId];
        const logs = getDynamicLogs(cleanId);

        resolve({
          success: true,
          employee: user.profile,
          today: logs[0], // Returns the first item (Today)
        });
      }, 400);
    });
  },

  getAttendanceHistory: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanId = userId.toLowerCase().trim();
        resolve({
          success: true,
          logs: getDynamicLogs(cleanId), // Returns both Today and Yesterday
        });
      }, 400);
    });
  },
};
