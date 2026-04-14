import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  // Accessing the data based on your specific Redux structure
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <div className="profile-container">Please log in.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.avatar}>
        {/* Takes the first letter of the userName */}
        {user.userName?.charAt(0).toUpperCase()}
      </div>
      <div style={styles.info}>
        <h2 style={styles.name}>{user.userName}</h2>
        <div style={styles.statusBadge}>
          <span style={styles.statusDot}></span>
          Logged In
        </div>
      </div>
    </div>
  );
};

// Simple inline styles for a quick setup
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: 'fit-content'
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    marginRight: '15px'
  },
  info: {
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    margin: 0,
    fontSize: '18px',
    color: '#333',
    textTransform: 'capitalize'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    color: '#28a745',
    marginTop: '4px',
    fontWeight: '500'
  },
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#28a745',
    borderRadius: '50%',
    marginRight: '6px'
  }
};

export default UserProfile;
