import React from 'react';
import { 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon, 
  UsersIcon,
  EnvelopeOpenIcon,
  BuildingOfficeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      name: 'Formulaires',
      value: '125',
      description: 'Je ne sais pas quoi mettre',
      icon: EnvelopeIcon,
      color: 'purple'
    },
    {
      id: 2,
      name: 'Messages',
      value: '40',
      description: 'Je ne sais pas quoi mettre',
      icon: ChatBubbleLeftRightIcon,
      color: 'green'
    },
    {
      id: 3,
      name: 'Utilisateurs',
      value: '600',
      description: 'Je ne sais pas quoi mettre',
      icon: UsersIcon,
      color: 'yellow'
    },
    {
      id: 4,
      name: 'E-mails',
      value: '25',
      description: 'Je ne sais pas quoi mettre',
      icon: EnvelopeOpenIcon,
      color: 'red'
    },
    {
      id: 5,
      name: 'Hôtels',
      value: '40',
      description: 'Je ne sais pas quoi mettre',
      icon: BuildingOfficeIcon,
      color: 'purple'
    },
    {
      id: 6,
      name: 'Entités',
      value: '02',
      description: 'Je ne sais pas quoi mettre',
      icon: UserGroupIcon,
      color: 'blue'
    }
  ];

  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1 className="welcome-title">Bienvenue sur RED Product</h1>
        <p className="welcome-subtitle">Lorem ipsum dolor sit amet consectetur</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className={`stat-icon ${stat.color}`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div className="stat-content">
              <h3>{stat.value} {stat.name}</h3>
              <p>{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
