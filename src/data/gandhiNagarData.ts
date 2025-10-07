import { LandRecord } from "@/hooks/useLandRecords";

// Generate ULPIN-like ID (14 alphanumeric)
const generateULPIN = (index: number) => {
  const prefix = "GJ23";
  const middle = String(index).padStart(6, '0');
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${middle}${suffix}`;
};

export const gandhiNagarLandRecords: LandRecord[] = [
  {
    id: "LAND-1700000001-ABC123",
    landId: "GJ23000001AB2C",
    surveyNumber: "GN-45/12",
    village: "Sector 5, Gandhinagar",
    district: "Gandhinagar",
    state: "Gujarat",
    area: "2.5",
    address: "Plot 45/12, Sector 5, Gandhinagar",
    pincode: "382005",
    ownerName: "Meera Patel",
    fatherName: "Rajesh Patel",
    contact: "9876543210",
    aadhar: "123456789012",
    latitude: "23.2156",
    longitude: "72.6369",
    verified: true,
    createdAt: "2005-03-15T00:00:00.000Z",
    ownershipHistory: [
      { owner: "Rajesh Patel", from: 1985, to: 2005, documentRef: "REG-1985-001" },
      { owner: "Meera Patel", from: 2005, to: "Present", documentRef: "WILL-2005-045" }
    ],
    disputes: [
      { 
        year: 2018, 
        type: "Boundary", 
        status: "Resolved",
        description: "Boundary dispute with adjacent plot GN-45/13",
        filedDate: "2018-05-10",
        resolutionDate: "2018-11-22"
      }
    ],
    documents: [
      { name: "Will 1995", link: "/docs/gn45_will1995.pdf", uploadDate: "1995-08-20" },
      { name: "Sale Deed 2005", link: "/docs/gn45_deed2005.pdf", uploadDate: "2005-03-15" }
    ]
  },
  {
    id: "LAND-1700000002-DEF456",
    landId: "GJ23000002CD4E",
    surveyNumber: "GN-23/8",
    village: "Sector 3, Gandhinagar",
    district: "Gandhinagar",
    state: "Gujarat",
    area: "1.8",
    address: "Plot 23/8, Sector 3, Gandhinagar",
    pincode: "382003",
    ownerName: "Amit Shah",
    fatherName: "Kiran Shah",
    contact: "9123456789",
    aadhar: "234567890123",
    latitude: "23.2236",
    longitude: "72.6511",
    verified: true,
    createdAt: "1990-07-20T00:00:00.000Z",
    ownershipHistory: [
      { owner: "Kiran Shah", from: 1980, to: 1990, documentRef: "REG-1980-089" },
      { owner: "Amit Shah", from: 1990, to: "Present", documentRef: "INHERITANCE-1990-023" }
    ],
    disputes: [],
    documents: [
      { name: "Inheritance Document 1990", link: "/docs/gn23_inheritance1990.pdf" }
    ]
  },
  {
    id: "LAND-1700000003-GHI789",
    landId: "GJ23000003EF6G",
    surveyNumber: "GN-67/15",
    village: "Sector 7, Gandhinagar",
    district: "Gandhinagar",
    state: "Gujarat",
    area: "3.2",
    address: "Plot 67/15, Sector 7, Gandhinagar",
    pincode: "382007",
    ownerName: "Priya Desai",
    fatherName: "Mahesh Desai",
    contact: "9988776655",
    aadhar: "345678901234",
    latitude: "23.2089",
    longitude: "72.6278",
    verified: true,
    createdAt: "2010-01-12T00:00:00.000Z",
    ownershipHistory: [
      { owner: "Mahesh Desai", from: 1995, to: 2010, documentRef: "REG-1995-156" },
      { owner: "Priya Desai", from: 2010, to: "Present", documentRef: "GIFT-2010-078" }
    ],
    disputes: [
      {
        year: 2020,
        type: "Ownership",
        status: "Pending",
        description: "Disputed ownership claim by distant relative",
        filedDate: "2020-09-15"
      }
    ],
    documents: [
      { name: "Gift Deed 2010", link: "/docs/gn67_gift2010.pdf" },
      { name: "7/12 Extract", link: "/docs/gn67_712extract.pdf" }
    ]
  },
  {
    id: "LAND-1700000004-JKL012",
    landId: "GJ23000004GH8I",
    surveyNumber: "GN-89/22",
    village: "Sector 9, Gandhinagar",
    district: "Gandhinagar",
    state: "Gujarat",
    area: "4.0",
    address: "Plot 89/22, Sector 9, Gandhinagar",
    pincode: "382009",
    ownerName: "Vikram Modi",
    fatherName: "Narendra Modi",
    contact: "9765432109",
    aadhar: "456789012345",
    latitude: "23.1945",
    longitude: "72.6156",
    verified: true,
    createdAt: "1988-11-08T00:00:00.000Z",
    ownershipHistory: [
      { owner: "Narendra Modi", from: 1975, to: 1988, documentRef: "REG-1975-234" },
      { owner: "Vikram Modi", from: 1988, to: "Present", documentRef: "SALE-1988-145" }
    ],
    disputes: [],
    documents: [
      { name: "Sale Deed 1988", link: "/docs/gn89_sale1988.pdf" },
      { name: "Survey Report", link: "/docs/gn89_survey.pdf" }
    ]
  },
  {
    id: "LAND-1700000005-MNO345",
    landId: "GJ23000005IJ0K",
    surveyNumber: "GN-34/6",
    village: "Sector 4, Gandhinagar",
    district: "Gandhinagar",
    state: "Gujarat",
    area: "2.0",
    address: "Plot 34/6, Sector 4, Gandhinagar",
    pincode: "382004",
    ownerName: "Neha Joshi",
    fatherName: "Suresh Joshi",
    contact: "9854321098",
    aadhar: "567890123456",
    latitude: "23.2198",
    longitude: "72.6445",
    verified: false,
    createdAt: "2015-06-25T00:00:00.000Z",
    ownershipHistory: [
      { owner: "Suresh Joshi", from: 2000, to: 2015, documentRef: "REG-2000-089" },
      { owner: "Neha Joshi", from: 2015, to: "Present", documentRef: "PARTITION-2015-034" }
    ],
    disputes: [
      {
        year: 2019,
        type: "Inheritance",
        status: "Resolved",
        description: "Family partition dispute among siblings",
        filedDate: "2019-02-10",
        resolutionDate: "2019-10-05"
      }
    ],
    documents: [
      { name: "Partition Deed 2015", link: "/docs/gn34_partition2015.pdf" }
    ]
  },
  {
    id: "LAND-1700000006-PQR678",
    landId: "GJ23000006KL2M",
    surveyNumber: "GN-56/18",
    village: "Sector 6, Gandhinagar",
    district: "Gandhinagar",
    state: "Gujarat",
    area: "1.5",
    address: "Plot 56/18, Sector 6, Gandhinagar",
    pincode: "382006",
    ownerName: "Rohit Kumar",
    fatherName: "Anil Kumar",
    contact: "9123987654",
    aadhar: "678901234567",
    latitude: "23.2123",
    longitude: "72.6334",
    verified: true,
    createdAt: "1992-04-18T00:00:00.000Z",
    ownershipHistory: [
      { owner: "Anil Kumar", from: 1985, to: 1992, documentRef: "REG-1985-178" },
      { owner: "Rohit Kumar", from: 1992, to: "Present", documentRef: "WILL-1992-056" }
    ],
    disputes: [],
    documents: [
      { name: "Will 1992", link: "/docs/gn56_will1992.pdf" }
    ]
  },
  {
    id: "LAND-1700000007-STU901",
    landId: "GJ23000007MN4O",
    surveyNumber: "GN-78/25",
    village: "Sector 8, Gandhinagar",
    district: "Gandhinagar",
    state: "Gujarat",
    area: "5.5",
    address: "Plot 78/25, Sector 8, Gandhinagar",
    pincode: "382008",
    ownerName: "Sanjay Mehta",
    fatherName: "Ramesh Mehta",
    contact: "9876012345",
    aadhar: "789012345678",
    latitude: "23.2012",
    longitude: "72.6212",
    verified: true,
    createdAt: "1998-09-30T00:00:00.000Z",
    ownershipHistory: [
      { owner: "Ramesh Mehta", from: 1982, to: 1998, documentRef: "REG-1982-267" },
      { owner: "Sanjay Mehta", from: 1998, to: "Present", documentRef: "GIFT-1998-123" }
    ],
    disputes: [
      {
        year: 2017,
        type: "Boundary",
        status: "Resolved",
        description: "Encroachment issue with government land",
        filedDate: "2017-03-22",
        resolutionDate: "2017-08-15"
      }
    ],
    documents: [
      { name: "Gift Deed 1998", link: "/docs/gn78_gift1998.pdf" },
      { name: "Boundary Survey 2017", link: "/docs/gn78_boundary2017.pdf" }
    ]
  },
  {
    id: "LAND-1700000008-VWX234",
    landId: "GJ23000008OP6Q",
    surveyNumber: "GN-12/3",
    village: "Sector 1, Gandhinagar",
    district: "Gandhinagar",
    state: "Gujarat",
    area: "3.8",
    address: "Plot 12/3, Sector 1, Gandhinagar",
    pincode: "382001",
    ownerName: "Pooja Sharma",
    fatherName: "Deepak Sharma",
    contact: "9654123987",
    aadhar: "890123456789",
    latitude: "23.2267",
    longitude: "72.6589",
    verified: true,
    createdAt: "2008-12-05T00:00:00.000Z",
    ownershipHistory: [
      { owner: "Deepak Sharma", from: 1995, to: 2008, documentRef: "REG-1995-345" },
      { owner: "Pooja Sharma", from: 2008, to: "Present", documentRef: "SALE-2008-189" }
    ],
    disputes: [],
    documents: [
      { name: "Sale Deed 2008", link: "/docs/gn12_sale2008.pdf" }
    ]
  },
  {
    id: "LAND-1700000009-YZA567",
    landId: "GJ23000009QR8S",
    surveyNumber: "GN-91/30",
    village: "Sector 10, Gandhinagar",
    district: "Gandhinagar",
    state: "Gujarat",
    area: "2.3",
    address: "Plot 91/30, Sector 10, Gandhinagar",
    pincode: "382010",
    ownerName: "Karan Trivedi",
    fatherName: "Bharat Trivedi",
    contact: "9321654987",
    aadhar: "901234567890",
    latitude: "23.1878",
    longitude: "72.6089",
    verified: false,
    createdAt: "2012-07-14T00:00:00.000Z",
    ownershipHistory: [
      { owner: "Bharat Trivedi", from: 1990, to: 2012, documentRef: "REG-1990-456" },
      { owner: "Karan Trivedi", from: 2012, to: "Present", documentRef: "INHERITANCE-2012-078" }
    ],
    disputes: [
      {
        year: 2021,
        type: "Ownership",
        status: "Pending",
        description: "Challenge to inheritance by step-sibling",
        filedDate: "2021-01-20"
      }
    ],
    documents: [
      { name: "Inheritance Document 2012", link: "/docs/gn91_inheritance2012.pdf" }
    ]
  },
  {
    id: "LAND-1700000010-BCD890",
    landId: "GJ23000010ST0U",
    surveyNumber: "GN-101/40",
    village: "Sector 11, Gandhinagar",
    district: "Gandhinagar",
    state: "Gujarat",
    area: "6.0",
    address: "Plot 101/40, Sector 11, Gandhinagar",
    pincode: "382011",
    ownerName: "Anjali Raval",
    fatherName: "Jayesh Raval",
    contact: "9012345678",
    aadhar: "012345678901",
    latitude: "23.1812",
    longitude: "72.6023",
    verified: true,
    createdAt: "1986-02-28T00:00:00.000Z",
    ownershipHistory: [
      { owner: "Jayesh Raval", from: 1978, to: 1986, documentRef: "REG-1978-567" },
      { owner: "Anjali Raval", from: 1986, to: "Present", documentRef: "WILL-1986-234" }
    ],
    disputes: [],
    documents: [
      { name: "Will 1986", link: "/docs/gn101_will1986.pdf" },
      { name: "Land Survey 1978", link: "/docs/gn101_survey1978.pdf" }
    ]
  }
];

// Helper to seed localStorage with dummy data
export const seedGandhiNagarData = () => {
  const existing = localStorage.getItem("bhumibandhu_land_records");
  if (!existing || JSON.parse(existing).length === 0) {
    localStorage.setItem("bhumibandhu_land_records", JSON.stringify(gandhiNagarLandRecords));
    return gandhiNagarLandRecords;
  }
  return JSON.parse(existing);
};
