import React, { useEffect } from 'react';

const ReceiveWeather: React.FC = () => {
    interface ApiResponse {
        message: string 
    }

    const responseWeather = async () => {
        try {
            const response = await fetch("http://localhost:8055/weather", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }) 
            if (response.ok) {
                const data: ApiResponse = await response.json() 
                console.log('Data received successfully:', data.message) 
                return data 
            } else {
                console.error('Failed to fetch data. Status:', response.status) 
                throw new Error('Failed to fetch data') 
            }
        } catch (error) {
            console.error('Error during data fetching:', error) 
            throw error 
        }
    } 

    useEffect(() => {
        responseWeather() 
    }, [responseWeather]) 

    return (
        <div></div>
    ) 
} 

export default ReceiveWeather 