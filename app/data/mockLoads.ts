import { Load } from '../types/load';

export const mockLoads: Load[] = [
  {
    "id": "1",
    "price": 2379,
    "distance": 1824.2,
    "weight": 7328,
    "loadedRPM": 2.11,
    "estTotalRPM": 1.31,
    "pickup": {
      "city": "Columbus",
      "state": "OH",
      "date": "Dec 17 2025",
      "time": "6:27 AM",
      "emptyMiles": 191,
      "address": "900 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Pittsburgh",
      "state": "PA",
      "date": "Dec 21 2025",
      "time": "5:42 AM",
      "emptyMiles": 41,
      "address": "850 Warehouse Blvd",
      "instructions": [
        "Call before arrival",
        "Drop at dock"
      ]
    },
    "isReload": undefined,
    "badge": "!",
    "requirements": ["Customer Live Load", "Driver Assist Unload"],
    "equipmentType": "Van",
    status: 'assigned'
  },
  {
    "id": "2",
    "price": 817,
    "distance": 1271.0,
    "weight": 13041,
    "loadedRPM": 1.81,
    "estTotalRPM": 0.4,
    "pickup": {
      "city": "Fort Lauderdale",
      "state": "FL",
      "date": "Dec 17 2025",
      "time": "12:22 AM",
      "emptyMiles": 90,
      "address": "210 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Richmond",
      "state": "VA",
      "date": "Dec 20 2025",
      "time": "1:12 AM",
      "emptyMiles": 123,
      "address": "73 Warehouse Blvd",
      "instructions": [
        "Call before arrival",
        "Drop at dock"
      ]
    },
    "isReload": undefined,
    "badge": "!",
    "requirements": ["Hazmat", "TWIC", "High Value"],
    "equipmentType": "Reefer",
    status: 'in-transit'
  },
  {
    "id": "3",
    "price": 921,
    "distance": 527.0,
    "weight": 27032,
    "loadedRPM": 1.67,
    "estTotalRPM": 0.25,
    "pickup": {
      "city": "Waco",
      "state": "TX",
      "date": "Dec 17 2025",
      "time": "8:50 AM",
      "emptyMiles": 151,
      "address": "505 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Orlando",
      "state": "FL",
      "date": "Dec 20 2025",
      "time": "10:46 PM",
      "emptyMiles": 41,
      "address": "222 Warehouse Blvd",
      "instructions": [
        "Handle with care",
        "Appointment required"
      ]
    },
    "isReload": undefined,
    "badge": undefined,
    "requirements": ["Drop Relay", "Trailer Spot"],
    "equipmentType": "Flatbed",
    status: 'delivered'
  },
  {
    "id": "4",
    "price": 1087,
    "distance": 1037.3,
    "weight": 16345,
    "loadedRPM": 1.48,
    "estTotalRPM": 1.29,
    "pickup": {
      "city": "Joliet",
      "state": "IL",
      "date": "Dec 13 2025",
      "time": "7:00 AM",
      "emptyMiles": 3,
      "address": "836 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Fayetteville",
      "state": "NC",
      "date": "Dec 17 2025",
      "time": "9:27 PM",
      "emptyMiles": 82,
      "address": "68 Warehouse Blvd",
      "instructions": [
        "Drop at dock",
        "Call before arrival"
      ]
    },
    "isReload": undefined,
    "badge": "!"
  },
  {
    "id": "5",
    "price": 735,
    "distance": 2028.1,
    "weight": 21483,
    "loadedRPM": 1.38,
    "estTotalRPM": 0.22,
    "pickup": {
      "city": "Laredo",
      "state": "TX",
      "date": "Dec 16 2025",
      "time": "12:50 AM",
      "emptyMiles": 285,
      "address": "869 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Nashville",
      "state": "TN",
      "date": "Dec 20 2025",
      "time": "9:31 AM",
      "emptyMiles": 57,
      "address": "705 Warehouse Blvd",
      "instructions": [
        "Appointment required",
        "Handle with care"
      ]
    },
    "isReload": undefined,
    "badge": undefined
  },
  {
    "id": "6",
    "price": 1797,
    "distance": 446.2,
    "weight": 28703,
    "loadedRPM": 1.7,
    "estTotalRPM": 0.71,
    "pickup": {
      "city": "Boston",
      "state": "MA",
      "date": "Dec 16 2025",
      "time": "4:39 PM",
      "emptyMiles": 146,
      "address": "750 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Ann Arbor",
      "state": "MI",
      "date": "Dec 29 2025",
      "time": "3:13 PM",
      "emptyMiles": 142,
      "address": "29 Warehouse Blvd",
      "instructions": [
        "Delivery at dock 5",
        "Appointment required"
      ]
    },
    "isReload": undefined,
    "badge": undefined
  },
  {
    "id": "7",
    "price": 1555,
    "distance": 2439.9,
    "weight": 13206,
    "loadedRPM": 2.22,
    "estTotalRPM": 1.48,
    "pickup": {
      "city": "San Antonio",
      "state": "TX",
      "date": "Dec 11 2025",
      "time": "6:04 AM",
      "emptyMiles": 287,
      "address": "416 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Allentown",
      "state": "PA",
      "date": "Dec 24 2025",
      "time": "10:27 PM",
      "emptyMiles": 60,
      "address": "191 Warehouse Blvd",
      "instructions": [
        "Call before arrival",
        "Appointment required"
      ]
    },
    "isReload": true,
    "badge": "!"
  },
  {
    "id": "8",
    "price": 715,
    "distance": 2300.1,
    "weight": 35584,
    "loadedRPM": 2.07,
    "estTotalRPM": 1.87,
    "pickup": {
      "city": "Akron",
      "state": "OH",
      "date": "Dec 13 2025",
      "time": "10:16 PM",
      "emptyMiles": 238,
      "address": "546 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Lancaster",
      "state": "PA",
      "date": "Dec 19 2025",
      "time": "6:07 PM",
      "emptyMiles": 48,
      "address": "360 Warehouse Blvd",
      "instructions": [
        "Delivery at dock 5",
        "Drop at dock"
      ]
    },
    "isReload": undefined,
    "badge": "!"
  },
  {
    "id": "9",
    "price": 291,
    "distance": 1103.9,
    "weight": 39740,
    "loadedRPM": 2.33,
    "estTotalRPM": 0.52,
    "pickup": {
      "city": "New Orleans",
      "state": "LA",
      "date": "Dec 04 2025",
      "time": "9:24 AM",
      "emptyMiles": 173,
      "address": "76 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Milwaukee",
      "state": "WI",
      "date": "Dec 14 2025",
      "time": "8:14 AM",
      "emptyMiles": 83,
      "address": "78 Warehouse Blvd",
      "instructions": [
        "Delivery at dock 5",
        "Appointment required"
      ]
    },
    "isReload": undefined,
    "badge": undefined
  },
  {
    "id": "10",
    "price": 931,
    "distance": 219.6,
    "weight": 7931,
    "loadedRPM": 1.48,
    "estTotalRPM": 1.63,
    "pickup": {
      "city": "Kent",
      "state": "WA",
      "date": "Dec 11 2025",
      "time": "11:15 AM",
      "emptyMiles": 130,
      "address": "258 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Yonkers",
      "state": "NY",
      "date": "Dec 20 2025",
      "time": "2:44 PM",
      "emptyMiles": 35,
      "address": "133 Warehouse Blvd",
      "instructions": [
        "Call before arrival",
        "Appointment required"
      ]
    },
    "isReload": true,
    "badge": "!"
  },
  {
    "id": "11",
    "price": 2128,
    "distance": 2322.8,
    "weight": 27863,
    "loadedRPM": 1.8,
    "estTotalRPM": 1.85,
    "pickup": {
      "city": "Harrisburg",
      "state": "PA",
      "date": "Dec 17 2025",
      "time": "7:11 PM",
      "emptyMiles": 39,
      "address": "958 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Tampa",
      "state": "FL",
      "date": "Dec 24 2025",
      "time": "7:30 AM",
      "emptyMiles": 8,
      "address": "321 Warehouse Blvd",
      "instructions": [
        "Delivery at dock 5",
        "Drop at dock"
      ]
    },
    "isReload": true,
    "badge": "!"
  },
  {
    "id": "12",
    "price": 645,
    "distance": 675.5,
    "weight": 8797,
    "loadedRPM": 1.1,
    "estTotalRPM": 0.22,
    "pickup": {
      "city": "San Francisco",
      "state": "CA",
      "date": "Dec 16 2025",
      "time": "4:12 PM",
      "emptyMiles": 32,
      "address": "52 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Norfolk",
      "state": "VA",
      "date": "Dec 27 2025",
      "time": "5:25 AM",
      "emptyMiles": 63,
      "address": "959 Warehouse Blvd",
      "instructions": [
        "Delivery at dock 5",
        "Handle with care"
      ]
    },
    "isReload": undefined,
    "badge": "!"
  },
  {
    "id": "13",
    "price": 1745,
    "distance": 2024.0,
    "weight": 5286,
    "loadedRPM": 1.36,
    "estTotalRPM": 1.41,
    "pickup": {
      "city": "Aurora",
      "state": "IL",
      "date": "Dec 14 2025",
      "time": "4:24 PM",
      "emptyMiles": 115,
      "address": "597 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Memphis",
      "state": "TN",
      "date": "Dec 25 2025",
      "time": "12:38 PM",
      "emptyMiles": 28,
      "address": "83 Warehouse Blvd",
      "instructions": [
        "Handle with care",
        "Delivery at dock 5"
      ]
    },
    "isReload": undefined,
    "badge": undefined
  },
  {
    "id": "14",
    "price": 1225,
    "distance": 1235.0,
    "weight": 35071,
    "loadedRPM": 0.8,
    "estTotalRPM": 0.64,
    "pickup": {
      "city": "Flint",
      "state": "MI",
      "date": "Dec 15 2025",
      "time": "8:46 AM",
      "emptyMiles": 113,
      "address": "354 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Vancouver",
      "state": "WA",
      "date": "Dec 21 2025",
      "time": "9:54 PM",
      "emptyMiles": 91,
      "address": "452 Warehouse Blvd",
      "instructions": [
        "Call before arrival",
        "Appointment required"
      ]
    },
    "isReload": undefined,
    "badge": "!"
  },
  {
    "id": "15",
    "price": 279,
    "distance": 899.0,
    "weight": 9193,
    "loadedRPM": 0.52,
    "estTotalRPM": 0.22,
    "pickup": {
      "city": "Spokane",
      "state": "WA",
      "date": "Dec 11 2025",
      "time": "5:34 AM",
      "emptyMiles": 53,
      "address": "602 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Kenosha",
      "state": "WI",
      "date": "Dec 21 2025",
      "time": "6:14 AM",
      "emptyMiles": 95,
      "address": "423 Warehouse Blvd",
      "instructions": [
        "Handle with care",
        "Appointment required"
      ]
    },
    "isReload": undefined,
    "badge": undefined
  },
  {
    "id": "16",
    "price": 2751,
    "distance": 995.2,
    "weight": 20910,
    "loadedRPM": 2.49,
    "estTotalRPM": 1.59,
    "pickup": {
      "city": "Memphis",
      "state": "TN",
      "date": "Dec 04 2025",
      "time": "8:49 AM",
      "emptyMiles": 6,
      "address": "96 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Harrisburg",
      "state": "PA",
      "date": "Dec 14 2025",
      "time": "7:18 PM",
      "emptyMiles": 0,
      "address": "49 Warehouse Blvd",
      "instructions": [
        "Appointment required",
        "Call before arrival"
      ]
    },
    "isReload": undefined,
    "badge": "!"
  },
  {
    "id": "17",
    "price": 109,
    "distance": 703.1,
    "weight": 30382,
    "loadedRPM": 0.87,
    "estTotalRPM": 1.8,
    "pickup": {
      "city": "Tallahassee",
      "state": "FL",
      "date": "Dec 10 2025",
      "time": "1:03 AM",
      "emptyMiles": 259,
      "address": "961 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Ocala",
      "state": "FL",
      "date": "Dec 24 2025",
      "time": "1:51 PM",
      "emptyMiles": 124,
      "address": "673 Warehouse Blvd",
      "instructions": [
        "Drop at dock",
        "Delivery at dock 5"
      ]
    },
    "isReload": true,
    "badge": "!"
  },
  {
    "id": "18",
    "price": 729,
    "distance": 472.7,
    "weight": 29303,
    "loadedRPM": 0.65,
    "estTotalRPM": 1.77,
    "pickup": {
      "city": "Wichita",
      "state": "KS",
      "date": "Dec 07 2025",
      "time": "9:09 PM",
      "emptyMiles": 58,
      "address": "769 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Dallas",
      "state": "TX",
      "date": "Dec 21 2025",
      "time": "5:15 AM",
      "emptyMiles": 81,
      "address": "796 Warehouse Blvd",
      "instructions": [
        "Appointment required",
        "Drop at dock"
      ]
    },
    "isReload": true,
    "badge": "!"
  },
  {
    "id": "19",
    "price": 147,
    "distance": 1510.3,
    "weight": 23164,
    "loadedRPM": 1.34,
    "estTotalRPM": 0.78,
    "pickup": {
      "city": "Flagstaff",
      "state": "AZ",
      "date": "Dec 10 2025",
      "time": "1:37 PM",
      "emptyMiles": 66,
      "address": "136 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Atlanta",
      "state": "GA",
      "date": "Dec 16 2025",
      "time": "8:59 PM",
      "emptyMiles": 118,
      "address": "727 Warehouse Blvd",
      "instructions": [
        "Call before arrival",
        "Delivery at dock 5"
      ]
    },
    "isReload": undefined,
    "badge": "!"
  },
  {
    "id": "20",
    "price": 2457,
    "distance": 145.9,
    "weight": 33603,
    "loadedRPM": 0.55,
    "estTotalRPM": 1.6,
    "pickup": {
      "city": "Arlington",
      "state": "VA",
      "date": "Dec 09 2025",
      "time": "12:25 AM",
      "emptyMiles": 226,
      "address": "218 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Jacksonville",
      "state": "FL",
      "date": "Dec 13 2025",
      "time": "10:19 AM",
      "emptyMiles": 57,
      "address": "118 Warehouse Blvd",
      "instructions": [
        "Call before arrival",
        "Appointment required"
      ]
    },
    "isReload": true,
    "badge": "!"
  },
  {
    "id": "21",
    "price": 2756,
    "distance": 703.8,
    "weight": 31310,
    "loadedRPM": 1.42,
    "estTotalRPM": 0.24,
    "pickup": {
      "city": "Minneapolis",
      "state": "MN",
      "date": "Dec 08 2025",
      "time": "6:46 PM",
      "emptyMiles": 217,
      "address": "196 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Stockton",
      "state": "CA",
      "date": "Dec 17 2025",
      "time": "4:23 AM",
      "emptyMiles": 130,
      "address": "327 Warehouse Blvd",
      "instructions": [
        "Drop at dock",
        "Handle with care"
      ]
    },
    "isReload": true,
    "badge": "!"
  },
  {
    "id": "22",
    "price": 499,
    "distance": 1301.1,
    "weight": 10345,
    "loadedRPM": 1.66,
    "estTotalRPM": 0.93,
    "pickup": {
      "city": "San Antonio",
      "state": "TX",
      "date": "Dec 14 2025",
      "time": "11:04 AM",
      "emptyMiles": 92,
      "address": "36 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Fort Worth",
      "state": "TX",
      "date": "Dec 23 2025",
      "time": "8:56 PM",
      "emptyMiles": 109,
      "address": "69 Warehouse Blvd",
      "instructions": [
        "Call before arrival",
        "Drop at dock"
      ]
    },
    "isReload": true,
    "badge": "!"
  },
  {
    "id": "23",
    "price": 2542,
    "distance": 2440.9,
    "weight": 33966,
    "loadedRPM": 2.19,
    "estTotalRPM": 0.64,
    "pickup": {
      "city": "Durham",
      "state": "NC",
      "date": "Dec 06 2025",
      "time": "3:23 PM",
      "emptyMiles": 90,
      "address": "923 Main St",
      "liveLoad": true
    },
    "delivery": {
      "city": "Rochester",
      "state": "NY",
      "date": "Dec 10 2025",
      "time": "6:58 AM",
      "emptyMiles": 142,
      "address": "678 Warehouse Blvd",
      "instructions": [
        "Delivery at dock 5",
        "Appointment required"
      ]
    },
    "isReload": true,
    "badge": "!"
  },
  {
    "id": "24",
    "price": 824,
    "distance": 577.5,
    "weight": 32501,
    "loadedRPM": 1.3,
    "estTotalRPM": 0.52,
    "pickup": {
      "city": "Fresno",
      "state": "CA",
      "date": "Dec 16 2025",
      "time": "3:13 AM",
      "emptyMiles": 2,
      "address": "97 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Oakland",
      "state": "CA",
      "date": "Dec 28 2025",
      "time": "4:22 AM",
      "emptyMiles": 135,
      "address": "746 Warehouse Blvd",
      "instructions": [
        "Handle with care",
        "Call before arrival"
      ]
    },
    "isReload": true,
    "badge": "!"
  },
  {
    "id": "25",
    "price": 1477,
    "distance": 2350.6,
    "weight": 40960,
    "loadedRPM": 0.78,
    "estTotalRPM": 1.79,
    "pickup": {
      "city": "Peoria",
      "state": "IL",
      "date": "Dec 15 2025",
      "time": "4:12 PM",
      "emptyMiles": 72,
      "address": "247 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Salem",
      "state": "OR",
      "date": "Dec 19 2025",
      "time": "2:37 AM",
      "emptyMiles": 48,
      "address": "991 Warehouse Blvd",
      "instructions": [
        "Appointment required",
        "Call before arrival"
      ]
    },
    "isReload": true,
    "badge": undefined
  },
  {
    "id": "26",
    "price": 769,
    "distance": 2391.4,
    "weight": 30958,
    "loadedRPM": 1.79,
    "estTotalRPM": 1.94,
    "pickup": {
      "city": "Dallas",
      "state": "TX",
      "date": "Dec 06 2025",
      "time": "7:44 AM",
      "emptyMiles": 245,
      "address": "519 Main St",
      "liveLoad": false
    },
    "delivery": {
      "city": "Stockton",
      "state": "CA",
      "date": "Dec 11 2025",
      "time": "5:53 PM",
      "emptyMiles": 50,
      "address": "675 Warehouse Blvd",
      "instructions": [
        "Handle with care",
        "Appointment required"
      ]
    },
    "isReload": true,
    "badge": "!"
  }
];
