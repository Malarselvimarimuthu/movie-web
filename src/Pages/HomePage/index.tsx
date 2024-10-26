// import backgroundImage from '../assets/HomeBackground.jpg';
import "./styles.css";

const HomePage = () => {
  return (
    <div>
      {/* <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${backgroundImage})` }}  // Ensure this path is correct
      > */}

      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat" 
        style={{ backgroundColor: '#1D4ED8' }} 
      >

        {/* Black overlay with transparency */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content on top of the overlay */}
        <div className="relative flex items-center justify-center h-full text-white">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold shadow-lg">
            <span className="text-white"> Tamil Movie Recommendations</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
