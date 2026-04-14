import DateAndTime from "./DateAndTime"
import logo1 from '../assets/logo/logo-3.png';
import {useSelector} from 'react-redux';
import UserProfile from './UserProfile.jsx';

export const Header = ({ img = logo1 }) => {
    return (
      <header style={styles.header}>
        {/* Logo stays on the left */}
        <img src={img} alt="home-image" width={75} height={75} />
  
        {/* Container for User and Date pushed to the right */}
        <div style={styles.rightSection}>
          <UserProfile />
          <DateAndTime />
        </div>
      </header>
    );
  };
  
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between', // Pushes items to opposite ends
      alignItems: 'center',           // Centers items vertically
      padding: '10px 20px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #ddd'
    },
    rightSection: {
      display: 'flex',
      flexDirection: 'column', // Stacks Profile and Date vertically
      alignItems: 'flex-end',  // Aligns text/components to the right
      gap: '5px'               // Adds space between profile and date
    }
  };
  