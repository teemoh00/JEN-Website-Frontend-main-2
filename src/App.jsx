import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './website/pages/Home';
import About from './website/pages/About';
import Give from './website/pages/Give';
import Sermons from './website/pages/Sermons';
import Events from './website/pages/Events';
import Contact from './website/pages/Contact';
import Portal from './Portal/pages/Portal';
import PortalLayout from './Portal/layout/PortalLayout';
import Dashboard from './Portal/pages/Dashboard';
import CellsDashboard from './Portal/pages/CellsDashboard';
import AssignMembersDashboard from './Portal/pages/AssignMembersDashboard';
import MyCellDashboard from './Portal/pages/MyCellDashboard';
import FirstTimersDashboard from './Portal/pages/FirstTimersDashboard';
import FollowUpTasksDashboard from './Portal/pages/FollowUpTasksDashboard';
import CellAttendance from './Portal/pages/CellAttendance';
import CellAnalytics from './Portal/pages/CellAnalytics';
import MeetingsDashboard from './Portal/pages/MeetingsDashboard';
import EventsDashboard from './Portal/pages/EventsDashboard';
import EventAttendance from './Portal/pages/EventAttendance';
import EventStatistics from './Portal/pages/EventStatistics';
import EventSchedule from './Portal/pages/EventSchedule';
import EventBudget from './Portal/pages/EventBudget';
import AttendanceDashboard from './Portal/pages/AttendanceDashboard';
import MembersDashboard from './Portal/pages/MembersDashboard';
import UsersDashboard from './Portal/pages/UsersDashboard';
import MyAccountDashboard from './Portal/pages/MyAccountDashboard';
import MediaDashboard from './Portal/pages/MediaDashboard';
import Devotional from './Portal/pages/media/Devotional';
import RolesDashboard from './Portal/pages/RolesDashboard';
import ContributionDashboard from './Portal/pages/ContributionDashboard';
import Contributions from './Portal/pages/financial/Contributions';
import Pledges from './Portal/pages/financial/Pledges';
import ChartOfAccounts from './Portal/pages/accounting/ChartOfAccounts';
import GeneralLedger from './Portal/pages/accounting/GeneralLedger';
import TrialBalance from './Portal/pages/accounting/TrialBalance';
import IncomeStatement from './Portal/pages/accounting/IncomeStatement';
import BalanceSheet from './Portal/pages/accounting/BalanceSheet';
import JournalEntries from './Portal/pages/accounting/JournalEntries';
import Payroll from './Portal/pages/accounting/Payroll';
import AuditLog from './Portal/pages/accounting/AuditLog';
import CalendarPage from './Portal/pages/CalendarPage';
// import PrayersDashboard from './Portal/pages/PrayersDashboard'; // Deprecated
import FastingCommitment from './Portal/pages/prayers/FastingCommitment';
import PropheticInstructions from './Portal/pages/prayers/PropheticInstructions';
import PrayerCommunications from './Portal/pages/prayers/PrayerCommunications';
import { ThemeProvider } from './context/ThemeContext';
import { EventProvider } from './context/EventContext';
import { AuthProvider } from './context/AuthContext';
import { AttendanceProvider } from './context/AttendanceContext';
import EventRegistration from './website/pages/EventRegistration';
import MeetingRegistration from './website/pages/MeetingRegistration';
import MeetingJoinPortal from './website/pages/MeetingJoinPortal';
import QuickRegister from './website/pages/QuickRegister';

// Placeholder Pages
const Placeholder = ({ title }) => <h1 style={{ color: 'white' }}>{title}</h1>;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EventProvider>
          <AttendanceProvider>
            <Router>
              <Routes>
                {/* Website Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/give" element={<Give />} />
                <Route path="/sermons" element={<Sermons />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/events/:eventId/register" element={<EventRegistration />} />
                <Route path="/meetings/:meetingId/register" element={<MeetingRegistration />} />
                <Route path="/join/:slug" element={<MeetingJoinPortal />} />
                <Route path="/quick-register" element={<QuickRegister />} />

                {/* Portal Login Route */}
                <Route path="/portal" element={<Portal />} />

                {/* Authenticated Portal Routes */}
                <Route path="/portal" element={<PortalLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="cells" element={<CellsDashboard />} />
                  <Route path="cells/assign" element={<AssignMembersDashboard />} />
                  <Route path="my-cell" element={<MyCellDashboard />} />
                  <Route path="cells/attendance" element={<CellAttendance />} />
                  <Route path="cells/analytics" element={<CellAnalytics />} />
                  <Route path="follow-ups" element={<FollowUpTasksDashboard />} />
                  <Route path="meetings" element={<MeetingsDashboard />} />
                  <Route path="meetings/events" element={<EventsDashboard />} />
                  <Route path="meetings/event-attendance" element={<EventAttendance />} />
                  <Route path="meetings/event-statistics" element={<EventStatistics />} />
                  <Route path="meetings/event-schedule" element={<EventSchedule />} />
                  <Route path="meetings/event-budget" element={<EventBudget />} />
                  <Route path="meetings/attendance" element={<AttendanceDashboard />} />
                  <Route path="members" element={<MembersDashboard />} />

                  {/* Prayer Module Routes */}
                  <Route path="prayers/fasting" element={<FastingCommitment />} />
                  <Route path="prayers/prophetic" element={<PropheticInstructions />} />
                  <Route path="prayers/communications" element={<PrayerCommunications />} />
                  <Route path="media" element={<MediaDashboard />} />
                  <Route path="media/devotional" element={<Devotional />} />
                  <Route path="giving" element={<ContributionDashboard />} />
                  <Route path="financial/contributions" element={<Contributions />} />
                  <Route path="financial/pledges" element={<Pledges />} />
                  <Route path="financial/budgets" element={<Placeholder title="Budgets Module" />} />
                  <Route path="accounting/chart-of-accounts" element={<ChartOfAccounts />} />
                  <Route path="accounting/general-ledger" element={<GeneralLedger />} />
                  <Route path="accounting/trial-balance" element={<TrialBalance />} />
                  <Route path="accounting/income-statement" element={<IncomeStatement />} />
                  <Route path="accounting/balance-sheet" element={<BalanceSheet />} />
                  <Route path="accounting/journal-entries" element={<JournalEntries />} />
                  <Route path="accounting/payroll" element={<Payroll />} />
                  <Route path="accounting/audit-log" element={<AuditLog />} />
                  <Route path="financial/settings" element={<Placeholder title="Financial Settings" />} />
                  <Route path="users" element={<UsersDashboard />} />
                  <Route path="users/account" element={<MyAccountDashboard />} />
                  <Route path="roles" element={<RolesDashboard />} />
                  <Route path="calendar" element={<CalendarPage />} />
                </Route>
              </Routes>
            </Router>
          </AttendanceProvider>
        </EventProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
