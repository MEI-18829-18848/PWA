import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className='dashboard-container'>
            <div className='dashboard-header'>
                <h2>Dashboard</h2>
            </div>
            <div className='dashboard-cards'>
                <div className='dashboard-card-sales'></div>
                <div className='dashboard-card-reservations'></div>
                <div className='dashboard-card-transactions'></div>
                <div className='dashboard-card-slots'></div>
            </div>
            <div className='dashboard-graph'>
                <div className='dashboard-graph-sales'></div>
                <div className='dashboard-graph-visits'></div>
            </div>
        </div>
    );
};

export default Dashboard;
