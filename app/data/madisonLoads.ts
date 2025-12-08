
import { Load } from '../types/load';

export const madisonLoads: Load[] = [
    {
        "id": "mad-1",
        "price": 1250,
        "distance": 450,
        "weight": 32000,
        "loadedRPM": 2.78,
        "estTotalRPM": 2.10,
        "pickup": {
            "city": "Madison",
            "state": "WI",
            "date": "Dec 18 2025",
            "time": "08:00 AM",
            "emptyMiles": 5,
            "address": "123 Industrial Dr",
            "liveLoad": true
        },
        "delivery": {
            "city": "Minneapolis",
            "state": "MN",
            "date": "Dec 18 2025",
            "time": "04:00 PM",
            "emptyMiles": 20,
            "address": "456 Warehouse Way",
            "instructions": ["Check in at guard shack"]
        },
        "equipmentType": "Reefer",
        "requirements": ["Temp Control"],
        "status": "assigned"
    },
    {
        "id": "mad-2",
        "price": 850,
        "distance": 145,
        "weight": 42000,
        "loadedRPM": 5.86,
        "estTotalRPM": 4.50,
        "pickup": {
            "city": "Madison",
            "state": "WI",
            "date": "Dec 19 2025",
            "time": "10:00 AM",
            "emptyMiles": 12,
            "address": "789 Logistics Ln",
            "liveLoad": false
        },
        "delivery": {
            "city": "Chicago",
            "state": "IL",
            "date": "Dec 19 2025",
            "time": "02:00 PM",
            "emptyMiles": 15,
            "address": "321 Cargo Ct",
            "instructions": ["Drop and hook"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    },
    {
        "id": "mad-3",
        "price": 2100,
        "distance": 850,
        "weight": 38000,
        "loadedRPM": 2.47,
        "estTotalRPM": 2.00,
        "pickup": {
            "city": "Middleton",
            "state": "WI",
            "date": "Dec 20 2025",
            "time": "07:30 AM",
            "emptyMiles": 8,
            "address": "555 Commerce Pkwy",
            "liveLoad": true
        },
        "delivery": {
            "city": "Nashville",
            "state": "TN",
            "date": "Dec 21 2025",
            "time": "03:00 PM",
            "emptyMiles": 30,
            "address": "999 Music Row",
            "instructions": ["Call 1 hour before arrival"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    },
    {
        "id": "mad-4",
        "price": 950,
        "distance": 280,
        "weight": 25000,
        "loadedRPM": 3.39,
        "estTotalRPM": 2.90,
        "pickup": {
            "city": "Sun Prairie",
            "state": "WI",
            "date": "Dec 18 2025",
            "time": "01:00 PM",
            "emptyMiles": 15,
            "address": "222 Harvest Ln",
            "liveLoad": true
        },
        "delivery": {
            "city": "Green Bay",
            "state": "WI",
            "date": "Dec 18 2025",
            "time": "06:00 PM",
            "emptyMiles": 10,
            "address": "777 Packer Dr",
            "instructions": ["Driver assist required"]
        },
        "equipmentType": "Flatbed",
        "requirements": ["Straps"],
        "status": "assigned"
    },
    {
        "id": "mad-5",
        "price": 3200,
        "distance": 1200,
        "weight": 40000,
        "loadedRPM": 2.67,
        "estTotalRPM": 2.30,
        "pickup": {
            "city": "Janesville",
            "state": "WI",
            "date": "Dec 22 2025",
            "time": "09:00 AM",
            "emptyMiles": 35,
            "address": "888 River Rd",
            "liveLoad": false
        },
        "delivery": {
            "city": "Dallas",
            "state": "TX",
            "date": "Dec 24 2025",
            "time": "08:00 AM",
            "emptyMiles": 40,
            "address": "444 Lone Star Blvd",
            "instructions": ["Appointment required"]
        },
        "equipmentType": "Reefer",
        "status": "assigned"
    },
    {
        "id": "mad-6",
        "price": 1100,
        "distance": 320,
        "weight": 36000,
        "loadedRPM": 3.44,
        "estTotalRPM": 3.00,
        "pickup": {
            "city": "Madison",
            "state": "WI",
            "date": "Dec 19 2025",
            "time": "11:00 AM",
            "emptyMiles": 6,
            "address": "100 Badger Ln",
            "liveLoad": true
        },
        "delivery": {
            "city": "Des Moines",
            "state": "IA",
            "date": "Dec 19 2025",
            "time": "05:00 PM",
            "emptyMiles": 18,
            "address": "200 Cornfield Ave",
            "instructions": ["Overnight parking available"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    },
    {
        "id": "mad-7",
        "price": 1800,
        "distance": 600,
        "weight": 44000,
        "loadedRPM": 3.00,
        "estTotalRPM": 2.50,
        "pickup": {
            "city": "Verona",
            "state": "WI",
            "date": "Dec 21 2025",
            "time": "06:00 AM",
            "emptyMiles": 10,
            "address": "333 Epic Way",
            "liveLoad": false
        },
        "delivery": {
            "city": "Columbus",
            "state": "OH",
            "date": "Dec 22 2025",
            "time": "10:00 AM",
            "emptyMiles": 25,
            "address": "666 Buckeye St",
            "instructions": ["Strict appointment time"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    },
    {
        "id": "mad-8",
        "price": 2500,
        "distance": 950,
        "weight": 30000,
        "loadedRPM": 2.63,
        "estTotalRPM": 2.20,
        "pickup": {
            "city": "Milwaukee",
            "state": "WI",
            "date": "Dec 18 2025",
            "time": "02:00 PM",
            "emptyMiles": 75,
            "address": "900 Brewery Ln",
            "liveLoad": true
        },
        "delivery": {
            "city": "New York",
            "state": "NY",
            "date": "Dec 20 2025",
            "time": "08:00 AM",
            "emptyMiles": 50,
            "address": "101 Empire Blvd",
            "instructions": ["Urban delivery"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    },
    {
        "id": "mad-9",
        "price": 750,
        "distance": 180,
        "weight": 22000,
        "loadedRPM": 4.17,
        "estTotalRPM": 3.50,
        "pickup": {
            "city": "Madison",
            "state": "WI",
            "date": "Dec 20 2025",
            "time": "09:30 AM",
            "emptyMiles": 4,
            "address": "404 Lake St",
            "liveLoad": true
        },
        "delivery": {
            "city": "Wausau",
            "state": "WI",
            "date": "Dec 20 2025",
            "time": "01:00 PM",
            "emptyMiles": 10,
            "address": "505 Mountain Rd",
            "instructions": ["Flatbed required"]
        },
        "equipmentType": "Flatbed",
        "requirements": ["Tarps"],
        "status": "assigned"
    },
    {
        "id": "mad-10",
        "price": 4500,
        "distance": 1800,
        "weight": 43000,
        "loadedRPM": 2.50,
        "estTotalRPM": 2.20,
        "pickup": {
            "city": "Fitchburg",
            "state": "WI",
            "date": "Dec 17 2025",
            "time": "08:00 AM",
            "emptyMiles": 8,
            "address": "707 Research Park",
            "liveLoad": false
        },
        "delivery": {
            "city": "Los Angeles",
            "state": "CA",
            "date": "Dec 21 2025",
            "time": "04:00 PM",
            "emptyMiles": 60,
            "address": "808 Hollywood Blvd",
            "instructions": ["Team drivers preferred"]
        },
        "equipmentType": "Van",
        "requirements": ["Team"],
        "status": "assigned"
    },
    {
        "id": "mad-11",
        "price": 1300,
        "distance": 400,
        "weight": 35000,
        "loadedRPM": 3.25,
        "estTotalRPM": 2.80,
        "pickup": {
            "city": "Madison",
            "state": "WI",
            "date": "Dec 23 2025",
            "time": "12:00 PM",
            "emptyMiles": 5,
            "address": "111 Capital Sq",
            "liveLoad": true
        },
        "delivery": {
            "city": "St. Louis",
            "state": "MO",
            "date": "Dec 24 2025",
            "time": "08:00 AM",
            "emptyMiles": 25,
            "address": "222 Gateway Arch",
            "instructions": ["Early morning delivery"]
        },
        "equipmentType": "Reefer",
        "status": "assigned"
    },
    {
        "id": "mad-12",
        "price": 1600,
        "distance": 550,
        "weight": 39000,
        "loadedRPM": 2.91,
        "estTotalRPM": 2.50,
        "pickup": {
            "city": "Beloit",
            "state": "WI",
            "date": "Dec 19 2025",
            "time": "03:00 PM",
            "emptyMiles": 45,
            "address": "333 State Line",
            "liveLoad": false
        },
        "delivery": {
            "city": "Detroit",
            "state": "MI",
            "date": "Dec 20 2025",
            "time": "02:00 PM",
            "emptyMiles": 40,
            "address": "444 Motor City",
            "instructions": ["Check in at gate 3"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    },
    {
        "id": "mad-13",
        "price": 900,
        "distance": 350,
        "weight": 28000,
        "loadedRPM": 2.57,
        "estTotalRPM": 2.20,
        "pickup": {
            "city": "Madison",
            "state": "WI",
            "date": "Dec 21 2025",
            "time": "10:00 AM",
            "emptyMiles": 7,
            "address": "555 University Ave",
            "liveLoad": true
        },
        "delivery": {
            "city": "Indianapolis",
            "state": "IN",
            "date": "Dec 21 2025",
            "time": "06:00 PM",
            "emptyMiles": 20,
            "address": "666 Speedway Ln",
            "instructions": ["Live unload"]
        },
        "equipmentType": "Flatbed",
        "status": "assigned"
    },
    {
        "id": "mad-14",
        "price": 2800,
        "distance": 1100,
        "weight": 41000,
        "loadedRPM": 2.55,
        "estTotalRPM": 2.30,
        "pickup": {
            "city": "Waunakee",
            "state": "WI",
            "date": "Dec 18 2025",
            "time": "07:00 AM",
            "emptyMiles": 12,
            "address": "777 Village Dr",
            "liveLoad": false
        },
        "delivery": {
            "city": "Denver",
            "state": "CO",
            "date": "Dec 20 2025",
            "time": "02:00 PM",
            "emptyMiles": 50,
            "address": "888 Mile High",
            "instructions": ["Sort and segregate"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    },
    {
        "id": "mad-15",
        "price": 600,
        "distance": 150,
        "weight": 18000,
        "loadedRPM": 4.00,
        "estTotalRPM": 3.20,
        "pickup": {
            "city": "Madison",
            "state": "WI",
            "date": "Dec 22 2025",
            "time": "11:00 AM",
            "emptyMiles": 5,
            "address": "999 Isthmus St",
            "liveLoad": true
        },
        "delivery": {
            "city": "Dubuque",
            "state": "IA",
            "date": "Dec 22 2025",
            "time": "03:00 PM",
            "emptyMiles": 10,
            "address": "101 Riverboat Dr",
            "instructions": ["Driver assist"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    },
    {
        "id": "mad-16",
        "price": 3600,
        "distance": 1400,
        "weight": 37000,
        "loadedRPM": 2.57,
        "estTotalRPM": 2.30,
        "pickup": {
            "city": "Stoughton",
            "state": "WI",
            "date": "Dec 19 2025",
            "time": "08:30 AM",
            "emptyMiles": 20,
            "address": "202 Norse St",
            "liveLoad": true
        },
        "delivery": {
            "city": "Miami",
            "state": "FL",
            "date": "Dec 22 2025",
            "time": "09:00 AM",
            "emptyMiles": 60,
            "address": "303 Beach Blvd",
            "instructions": ["Temp check required every 4 hours"]
        },
        "equipmentType": "Reefer",
        "status": "assigned"
    },
    {
        "id": "mad-17",
        "price": 1950,
        "distance": 700,
        "weight": 43000,
        "loadedRPM": 2.79,
        "estTotalRPM": 2.40,
        "pickup": {
            "city": "Madison",
            "state": "WI",
            "date": "Dec 20 2025",
            "time": "01:00 PM",
            "emptyMiles": 8,
            "address": "404 Camp Randall",
            "liveLoad": false
        },
        "delivery": {
            "city": "Kansas City",
            "state": "MO",
            "date": "Dec 21 2025",
            "time": "11:00 AM",
            "emptyMiles": 30,
            "address": "505 BBQ Ln",
            "instructions": ["Drop trailer"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    },
    {
        "id": "mad-18",
        "price": 1400,
        "distance": 450,
        "weight": 34000,
        "loadedRPM": 3.11,
        "estTotalRPM": 2.70,
        "pickup": {
            "city": "DeForest",
            "state": "WI",
            "date": "Dec 23 2025",
            "time": "09:00 AM",
            "emptyMiles": 15,
            "address": "606 North Star",
            "liveLoad": true
        },
        "delivery": {
            "city": "Omaha",
            "state": "NE",
            "date": "Dec 24 2025",
            "time": "08:00 AM",
            "emptyMiles": 25,
            "address": "707 Cornhusker",
            "instructions": ["Appointment"]
        },
        "equipmentType": "Reefer",
        "status": "assigned"
    },
    {
        "id": "mad-19",
        "price": 2200,
        "distance": 900,
        "weight": 31000,
        "loadedRPM": 2.44,
        "estTotalRPM": 2.10,
        "pickup": {
            "city": "Cottage Grove",
            "state": "WI",
            "date": "Dec 18 2025",
            "time": "02:00 PM",
            "emptyMiles": 10,
            "address": "808 Glacial Drumlin",
            "liveLoad": false
        },
        "delivery": {
            "city": "Memphis",
            "state": "TN",
            "date": "Dec 20 2025",
            "time": "10:00 AM",
            "emptyMiles": 40,
            "address": "909 Blues Hwy",
            "instructions": ["Drop and hook"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    },
    {
        "id": "mad-20",
        "price": 1000,
        "distance": 380,
        "weight": 26000,
        "loadedRPM": 2.63,
        "estTotalRPM": 2.30,
        "pickup": {
            "city": "Madison",
            "state": "WI",
            "date": "Dec 21 2025",
            "time": "07:00 AM",
            "emptyMiles": 5,
            "address": "1000 Mendota Way",
            "liveLoad": true
        },
        "delivery": {
            "city": "Grand Rapids",
            "state": "MI",
            "date": "Dec 21 2025",
            "time": "03:00 PM",
            "emptyMiles": 15,
            "address": "1111 Furniture City",
            "instructions": ["Fingerprinting required"]
        },
        "equipmentType": "Van",
        "status": "assigned"
    }
];
