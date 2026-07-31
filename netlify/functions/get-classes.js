exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const classes = [
    {
      id: 'class-1',
      name: 'Introduction to Web Development',
      instructor: 'Sarah Johnson',
      day: 'Monday',
      time: '10:00 AM - 11:30 AM',
      description: 'Learn the basics of HTML, CSS, and JavaScript.',
    },
    {
      id: 'class-2',
      name: 'Data Structures & Algorithms',
      instructor: 'Michael Chen',
      day: 'Tuesday',
      time: '2:00 PM - 3:30 PM',
      description: 'Master fundamental data structures and algorithms.',
    },
    {
      id: 'class-3',
      name: 'React.js Fundamentals',
      instructor: 'Emily Rodriguez',
      day: 'Wednesday',
      time: '10:00 AM - 11:30 AM',
      description: 'Build modern user interfaces with React.',
    },
    {
      id: 'class-4',
      name: 'Python for Data Science',
      instructor: 'David Kim',
      day: 'Thursday',
      time: '2:00 PM - 3:30 PM',
      description: 'Explore data analysis and machine learning with Python.',
    },
    {
      id: 'class-5',
      name: 'Cloud Computing with AWS',
      instructor: 'Lisa Thompson',
      day: 'Friday',
      time: '10:00 AM - 11:30 AM',
      description: 'Learn cloud infrastructure and deployment on AWS.',
    },
  ];

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ classes }),
  };
};