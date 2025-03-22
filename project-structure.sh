space-travel-platform/
├── client/                   # React frontend
│   ├── public/
│   │   ├── images/           # Space-themed images and icons
│   │   └── index.html        # HTML entry point
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── common/       # Shared components (buttons, inputs, etc.)
│   │   │   ├── booking/      # Booking flow components
│   │   │   ├── dashboard/    # User dashboard components
│   │   │   └── layout/       # Layout components (header, footer, etc.)
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── context/          # Context providers
│   │   ├── utils/            # Utility functions
│   │   ├── services/         # API service functions
│   │   ├── styles/           # Global styles
│   │   ├── App.js            # Main app component
│   │   └── index.js          # React entry point
│   └── package.json          # Frontend dependencies
├── server/                   # Node.js/Express backend
│   ├── controllers/          # Route handlers
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API route definitions
│   ├── services/             # Business logic
│   ├── utils/                # Helper functions
│   ├── middleware/           # Custom middleware
│   ├── config/               # Configuration files
│   ├── index.js              # Server entry point
│   └── package.json          # Backend dependencies
├── .gitignore
├── README.md
└── package.json              # Root dependencies
