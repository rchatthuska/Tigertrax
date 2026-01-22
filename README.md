# 🐅 TigerTraX

**TigerTraX** is a comprehensive schedule management app built for RIT students to track classes, assignments, and deadlines with intelligent priority-based notifications.

[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-49.0-black.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📱 Features

### 📚 Class Management
- Add and manage multiple classes with detailed information
- Track class schedules with days of week, times, and locations
- View instructor information and course notes
- Visual weekly calendar view with color-coded classes

### 📝 Assignment Tracking
- Create assignments linked to specific courses
- Set due dates and times with built-in date/time pickers
- Priority-based organization (High, Medium, Low)
- Mark assignments as complete
- Track assignment descriptions and details

### 🔔 Smart Notifications
- **Priority-based notification intervals:**
  - 🚨 **High Priority**: Notifications every 1 minute
  - ⚠️ **Medium Priority**: Notifications every 2 minutes
  - 📌 **Low Priority**: Notifications every 3 minutes
- Daily summary notifications at 9:00 AM
- Smart reminders based on due dates (1 day before, 1 hour before)
- Individual notifications for each assignment
- Automatic refresh when assignments are updated

### 📊 Calendar Views
- **Weekly Calendar**: Visual grid showing all classes
- **List View**: Detailed list of all classes and assignments
- Interactive scheduling with time slots (8 AM - 10 PM)
- Color-coded classes for easy identification

### 📤 Export Capabilities
- Export schedules to iCal format (.ics)
- Import into Google Calendar, Outlook, or Apple Calendar
- Includes both classes and assignments
- Recurring events for weekly classes

### 🔐 Authentication
- Secure login and signup system
- User-specific data storage
- Password hashing for security

## 🖼️ Screenshots

<!-- Add screenshots here -->
```
[Add your app screenshots]
- Home Screen
- Calendar View
- Add Assignment
- Notification Examples
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

```bash
npm install -g expo-cli
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/tigertrax.git
cd tigertrax
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npx expo start
```

4. **Run on your device**
- Scan the QR code with Expo Go app (iOS/Android)
- Press `i` for iOS Simulator
- Press `a` for Android Emulator

## 📦 Dependencies

### Core
- **React Native**: Mobile app framework
- **TypeScript**: Type-safe JavaScript
- **Expo**: Development platform

### UI & Components
- **@react-native-community/datetimepicker**: Date and time selection
- **React Navigation**: Screen navigation (if implemented)

### Notifications
- **expo-notifications**: Push notification system
- Custom priority-based scheduling system

### Data Management
- In-memory data store (upgradeable to AsyncStorage/SQLite)

## 🏗️ Project Structure

```
tigertrax/
├── App.tsx                          # Main application entry point
├── data/
│   └── AppData.ts                   # Centralized data management
├── utils/
│   ├── notificationService.ts       # Notification scheduling & management
│   └── icalGenerator.ts            # iCal export functionality
├── pages/
│   ├── Auth.tsx                     # Login/Signup screen
│   ├── AddClass.tsx                 # Add new class form
│   ├── AddAssignment.tsx            # Add new assignment form
│   └── ViewClasses.tsx              # View all classes & assignments
├── components/
│   └── CalendarWeekView.tsx         # Weekly calendar component
├── types/
│   └── types.ts                     # TypeScript type definitions
└── styles/
    └── styles.ts                    # Global styles & theme
```

## 🎨 Design Philosophy

TigerTraX uses a clean, modern design with:
- **Primary Color**: Orange (`#ea580c`) - RIT's signature color
- **Typography**: System fonts for optimal readability
- **Layout**: Mobile-first responsive design
- **Accessibility**: High contrast ratios and readable text sizes

## 🔧 Configuration

### Notification Settings

Edit `utils/notificationService.ts` to customize notification behavior:

```typescript
// Change notification intervals
case "High":
  intervalSeconds = 60;  // Current: 1 minute

case "Medium":
  intervalSeconds = 120; // Current: 2 minutes

case "Low":
  intervalSeconds = 180; // Current: 3 minutes
```

### Calendar Time Range

Edit `components/CalendarWeekView.tsx` to adjust visible hours:

```typescript
// Generate time slots from 8 AM to 10 PM
for (let hour = 8; hour <= 22; hour++) {
  // Modify start/end hours as needed
}
```

## 📱 Usage Guide

### Adding a Class

1. Tap **"📚 Add Class"** from the home screen
2. Fill in required fields:
   - Course Code (e.g., SWEN-250)
   - Class Name (e.g., Software Engineering)
   - Building & Room
   - Start & End Times
   - Days of Week
   - Start & End Dates
3. Optional: Add instructor name and notes
4. Tap **"Add Class"**

### Adding an Assignment

1. Tap **"📝 Add Assignment"** from the home screen
2. Fill in required fields:
   - Assignment Title
   - Select Course (from added classes)
   - Due Date & Time
   - Priority Level (High/Medium/Low)
3. Optional: Add description
4. Tap **"Add Assignment"**

### Managing Notifications

1. Navigate to home screen after logging in
2. Notifications automatically enable on first login
3. Use **"⚙️ Change Notification Mode"** to switch between:
   - Priority-Based (Testing)
   - Daily at 9:00 AM
   - Based on Due Dates
   - Turn Off Notifications

### Viewing Schedule

1. Tap **"👁 View All"** from home screen
2. Toggle between **List View** and **Calendar View**
3. Filter by **All**, **Classes**, or **Assignments**
4. Delete items by tapping the **✕** button

## 🔮 Future Enhancements

- [ ] Cloud database integration (Firebase/Supabase)
- [ ] Share schedules with classmates
- [ ] GPA calculator
- [ ] Study session timer
- [ ] Dark mode support
- [ ] Widget support for home screen
- [ ] Integration with RIT SIS system
- [ ] Collaboration features for group projects
- [ ] Assignment attachments and files
- [ ] Voice input for adding tasks

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for type safety
- Follow React Native best practices
- Write descriptive commit messages
- Add comments for complex logic
- Test on both iOS and Android

## 🐛 Known Issues

- Notifications require foreground permissions on iOS
- Calendar export tested on standard calendar apps
- In-memory data store (data clears on app restart)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Rumesh** - *Initial work* - RIT Student

## 🙏 Acknowledgments

- RIT for inspiration and use case
- React Native community for excellent documentation
- Expo team for simplifying mobile development
- All contributors and testers

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ for RIT Students**
