import DateAndTime from "./DateAndTime"
import logo1 from '../assets/logo/logo-3.png';
export const Header=({img=logo1})=>{
    
return <header>
    <img src={img} alt="home-image"  width={75} height={75} />
   <DateAndTime></DateAndTime>
</header>
}