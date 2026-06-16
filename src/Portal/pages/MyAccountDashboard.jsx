import React, { useState } from 'react';
import ProfileHeader from '../components/users/account/ProfileHeader';
import ProfileTabs from '../components/users/account/ProfileTabs';
import PersonalInfoPanel from '../components/users/account/PersonalInfoPanel';
import AttendanceRecordPanel from '../components/users/account/AttendanceRecordPanel';
import EditProfilePictureModal from '../components/users/account/EditProfilePictureModal';
import EditProfileModal from '../components/users/account/EditProfileModal';
import { useAuth } from '../../context/AuthContext';

const MyAccountDashboard = () => {
    const { user, refreshUser, loading, error } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditProfilePicModalOpen, setIsEditProfilePicModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

    if (loading) return <div style={{ padding: '2rem', color: 'var(--text-color)' }}>Loading profile...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
    if (!user) return <div style={{ padding: '2rem', color: 'var(--text-color)' }}>Please login to view this page.</div>;

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            < ProfileHeader
                user={user}
                onEditProfilePic={() => setIsEditProfilePicModalOpen(true)}
                onEditProfile={() => setIsEditProfileModalOpen(true)}
            />
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'profile' && <PersonalInfoPanel user={user} onUpdate={refreshUser} />}
            {activeTab === 'attendance' && <AttendanceRecordPanel />}

            {isEditProfilePicModalOpen && <EditProfilePictureModal onClose={() => setIsEditProfilePicModalOpen(false)} onUpdate={refreshUser} />}
            {isEditProfileModalOpen && <EditProfileModal user={user} onClose={() => setIsEditProfileModalOpen(false)} onUpdate={refreshUser} />}
        </div>
    );
};

export default MyAccountDashboard;
