import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import FoodCard from '../components/FoodCard';
import { motion } from 'framer-motion';

const Home = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api(null).get('/featured-foods') 
            .then(data => {
                setFeaturedFoods(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
    };


    return (
        <div className="min-h-screen">
            
            {/* Banner Section */}
            <motion.header 
                className="bg-green-700 text-white py-20 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-extrabold mb-4">PlateShare: Reduce Waste, Share Abundance</h1>
                    <p className="text-xl mb-8">Connect surplus food with those who need it in your community.</p>
                    <Link 
                        to="/available-foods" 
                        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
                    >
                        View All Foods
                    </Link>
                </div>
            </motion.header>

            {/* Featured Foods Section */}
            <motion.section 
                className="py-16"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Top Food Donations This Week</h2>
                    
                    {loading ? (
                        <div className="text-center"><p>Loading featured items...</p></div>
                    ) : (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial="hidden"
                            animate="visible"
                            transition={{ staggerChildren: 0.1 }}
                        >
                            {featuredFoods.map(food => (
                                <motion.div key={food._id} variants={cardVariants}>
                                    <FoodCard food={food} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Show All Button */}
                    <div className="text-center mt-12">
                        <Link to="/available-foods" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200">
                            Show All Available Foods
                        </Link>
                    </div>
                </div>
            </motion.section>

            <hr className="my-10" />

            {/* 3. Static Section */}
            <motion.section 
                className="py-16 bg-gray-50"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-10">How PlateShare Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white shadow-lg rounded-lg">
                            <h3 className="text-2xl font-semibold mb-3">1. Post Surplus Food</h3>
                            <p className="text-gray-600">Donors easily list excess food items with quantity, location, and expiry date.</p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-lg">
                            <h3 className="text-2xl font-semibold mb-3">2. Find Needed Food</h3>
                            <p className="text-gray-600">Community members browse available listings and submit a request via the platform.</p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-lg">
                            <h3 className="text-2xl font-semibold mb-3">3. Collect and Share</h3>
                            <p className="text-gray-600">The donor accepts a request, coordinating pickup to ensure the food finds a new home.</p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Our Mission */}
            <motion.section 
                className="py-16"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                 <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                    <p className="text-gray-700 max-w-3xl mx-auto text-lg">
                        Our goal is simple: eliminate food waste while building stronger, more sustainable communities. By connecting neighbors, PlateShare turns potential waste into shared abundance, promoting responsible consumption and local support.
                    </p>
                </div>
            </motion.section>
            
        </div>
    );
};

export default Home;