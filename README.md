# FRS Attendance System

A modern, automated attendance tracking mobile application built with **React Native** and **Expo**. This system integrates with a **Face Recognition System (FRS)** to eliminate manual check-ins and provide real-time attendance verification for enterprise environments.

## 🚀 The Workflow
This project is part of a larger ecosystem that automates the "Entry-to-Database" pipeline:
1. **Camera:** Captures live RTSP streams at office entry points.
2. **FRS Engine:** Processes frames using Computer Vision to identify employees.
3. **Database:** Records timestamps automatically upon successful recognition.
4. **Mobile App:** Fetches live logs via API, providing employees with instant status updates.

## ✨ Features
* **Live Detection Monitor:** Home screen updates automatically when the FRS identifies a face.
* **Dynamic History:** View attendance logs for Today, Yesterday, and past dates with automated labeling.
* **Zero-Action UI:** No buttons for check-in; attendance is 100% hands-free.
* **Secure Profile:** View employee designation, department, and location details.
* **Professional Auth Flow:** Includes Login, Forgot Password, and OTP verification.

## 🛠️ Tech Stack
* **Frontend:** React Native, Expo
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Styling:** StyleSheet (Flexbox)
* **Date Handling:** Moment.js
* **Icons:** Ionicons, MaterialCommunityIcons

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/kubershimpi/FRS_Attendance.git](https://github.com/kubershimpi/FRS_Attendance.git)
