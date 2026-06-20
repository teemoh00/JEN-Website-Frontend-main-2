import React, { useState } from 'react';
import PropheticHeader from '../../components/prayers/prophetic/PropheticHeader';
import PropheticActions from '../../components/prayers/prophetic/PropheticActions';
import PropheticTable from '../../components/prayers/prophetic/PropheticTable';
import CreateProphecyModal from '../../components/prayers/prophetic/CreateProphecyModal';
import CreatePrayerScheduleModal from '../../components/prayers/prophetic/CreatePrayerScheduleModal';

const PropheticInstructions = () => {
    const [showProphecyModal, setShowProphecyModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '4rem' }}>
            <PropheticHeader />
            <PropheticActions 
                onNewProphecy={() => setShowProphecyModal(true)} 
                onNewSchedule={() => setShowScheduleModal(true)} 
            />
            <PropheticTable />
            
            {showProphecyModal && <CreateProphecyModal onClose={() => setShowProphecyModal(false)} />}
            {showScheduleModal && <CreatePrayerScheduleModal onClose={() => setShowScheduleModal(false)} />}
        </div>
    );
};

export default PropheticInstructions;
