// ========================================
// ONLINE GURU - COURSES MODULE
// Professional course management with YouTube thumbnails
// ========================================

const Courses = {
    // Course database with YouTube video IDs
    courses: [
        // Python Courses by Different YouTubers
        {
            id: 1,
            title: 'Complete Python Course by Shradha Khapra',
            instructor: 'Shradha Khapra',
            category: 'Python',
            rating: 4.9,
            students: 125000,
            duration: '12 weeks',
            lessons: 60,
            level: 'Beginner',
            videoId: 't2_Q2BRzeEE',
            description: 'Complete Python programming course from basics to advanced concepts with practical examples and projects.',
            price: 'Free',
            featured: true,
            playlistUrl: 'https://www.youtube.com/watch?v=t2_Q2BRzeEE&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0'
        },
        {
            id: 2,
            title: 'Python Programming by Telusko',
            instructor: 'Telusko',
            category: 'Python',
            rating: 4.8,
            students: 98000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Beginner',
            videoId: 'QXeEoD0pB3E',
            description: 'Learn Python programming with practical examples and real-world applications.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3'
        },
        {
            id: 3,
            title: 'Python Course by CODE WITH HURRY',
            instructor: 'CODE WITH HURRY',
            category: 'Python',
            rating: 4.7,
            students: 76000,
            duration: '8 weeks',
            lessons: 40,
            level: 'Beginner',
            videoId: '7wnove7K-ZQ',
            description: 'Complete Python programming course with hands-on coding examples.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/watch?v=7wnove7K-ZQ&list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg'
        },
        {
            id: 4,
            title: 'Python Programming by Engineering in Kannada',
            instructor: 'Engineering in Kannada',
            category: 'Python',
            rating: 4.6,
            students: 52000,
            duration: '6 weeks',
            lessons: 30,
            level: 'Beginner',
            videoId: '8c74mXV2lJ0',
            description: 'Learn Python programming with clear explanations and practical examples.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/watch?v=8c74mXV2lJ0&list=PLlGueSbLhZoBRnTsGiDJeTXuQCALOTN07'
        },
        {
            id: 5,
            title: 'Python Course by Jenny\'s Lectures CS IT',
            instructor: 'Jenny\'s Lectures CS IT',
            category: 'Python',
            rating: 4.8,
            students: 89000,
            duration: '9 weeks',
            lessons: 42,
            level: 'Beginner',
            videoId: '6i3EGqOBRiU',
            description: 'Comprehensive Python programming course with detailed explanations.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/6i3EGqOBRiU?si=b9IPfJhJwyKeDjrc'
        },
        {
            id: 6,
            title: 'Python for Data Science by Data with Baraa',
            instructor: 'Data with Baraa',
            category: 'Python',
            rating: 4.7,
            students: 67000,
            duration: '8 weeks',
            lessons: 35,
            level: 'Intermediate',
            videoId: 'Rq5gJVxz55Q',
            description: 'Python programming focused on data science applications.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/Rq5gJVxz55Q?si=98gNGYIQbS90U7Wk'
        },
        {
            id: 7,
            title: 'Advanced Python by Telusko',
            instructor: 'Telusko',
            category: 'Python',
            rating: 4.9,
            students: 112000,
            duration: '10 weeks',
            lessons: 48,
            level: 'Advanced',
            videoId: 'YZkyL-f-YXY',
            description: 'Advanced Python concepts and professional programming techniques.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/YZkyL-f-YXY?si=Y8iFIZXcqoKy9rpk'
        },
        {
            id: 8,
            title: 'Python Certification Course by Simplilearn',
            instructor: 'Simplilearn',
            category: 'Python',
            rating: 4.6,
            students: 78000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Intermediate',
            videoId: 'Onjs26YvfIQ',
            description: 'Professional Python certification course with industry projects.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/Onjs26YvfIQ?si=WmHPIGMheJeOxSWS'
        },

        // Web Development Courses by Different YouTubers
        {
            id: 9,
            title: 'Web Development by Apna College',
            instructor: 'Apna College',
            category: 'Web Development',
            rating: 4.8,
            students: 145000,
            duration: '12 weeks',
            lessons: 65,
            level: 'Beginner',
            videoId: 'l1EssrLxt7E',
            description: 'Complete web development course with HTML, CSS, JavaScript, and modern frameworks.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/watch?v=l1EssrLxt7E&list=PLfqMhTWNBTe3H6c9OGXb5_6wcc1Mca52n'
        },
        {
            id: 10,
            title: 'Web Development by CODE WITH HURRY',
            instructor: 'CODE WITH HURRY',
            category: 'Web Development',
            rating: 4.7,
            students: 98000,
            duration: '10 weeks',
            lessons: 50,
            level: 'Beginner',
            videoId: 'tVzUXW6siu0',
            description: 'Master web development with practical projects and real-world applications.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/tVzUXW6siu0?si=BcYTMj_qthGKHOfb'
        },
        {
            id: 11,
            title: 'Web Development by CodeHelp by Babbar',
            instructor: 'CodeHelp by Babbar',
            category: 'Web Development',
            rating: 4.9,
            students: 187000,
            duration: '14 weeks',
            lessons: 70,
            level: 'Beginner',
            videoId: 'Vi9bxu-M-ag',
            description: 'Complete web development bootcamp with modern technologies and best practices.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/Vi9bxu-M-ag?si=UV19ifqWVF3JjMtl'
        },
        {
            id: 12,
            title: 'Web Development by CODER ARMY',
            instructor: 'CODER ARMY',
            category: 'Web Development',
            rating: 4.6,
            students: 76000,
            duration: '8 weeks',
            lessons: 40,
            level: 'Beginner',
            videoId: '1pcikNlDB-4',
            description: 'Learn web development with hands-on coding and practical examples.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/1pcikNlDB-4?si=-8jAMdmyd24bgimT'
        },
        {
            id: 13,
            title: 'Web Development by STP Computer Education',
            instructor: 'STP Computer Education',
            category: 'Web Development',
            rating: 4.5,
            students: 65000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Beginner',
            videoId: 'EtbgxOeYR54',
            description: 'Complete web development course with frontend and backend technologies.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/EtbgxOeYR54?si=LBn04Iyte-qszNAu'
        },
        {
            id: 14,
            title: 'Web Development by EDUREKA',
            instructor: 'EDUREKA',
            category: 'Web Development',
            rating: 4.7,
            students: 112000,
            duration: '12 weeks',
            lessons: 60,
            level: 'Intermediate',
            videoId: 'Q33KBiDriJY',
            description: 'Professional web development with advanced frameworks and real projects.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/Q33KBiDriJY?si=HMSGcwQm3x12tJXD'
        },
        {
            id: 15,
            title: 'Web Development by freeCodeCamp.org',
            instructor: 'freeCodeCamp.org',
            category: 'Web Development',
            rating: 4.8,
            students: 234000,
            duration: '16 weeks',
            lessons: 80,
            level: 'Beginner',
            videoId: 'dX8396ZmSPk',
            description: 'Comprehensive web development course covering HTML, CSS, JavaScript, React, Node.js and more.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/dX8396ZmSPk?si=jFGq5DYdlnwLLPyL'
        },
        {
            id: 16,
            title: 'Advanced Web Development by Apna College',
            instructor: 'Apna College',
            category: 'Web Development',
            rating: 4.6,
            students: 89000,
            duration: '10 weeks',
            lessons: 48,
            level: 'Advanced',
            videoId: 'ESnrn1kAD4E',
            description: 'Advanced web development with modern frameworks and production techniques.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/ESnrn1kAD4E?si=emKR69zJCTWHiYA1'
        },
        {
            id: 17,
            title: 'Web Development by MicroDegree',
            instructor: 'MicroDegree ಕನ್ನಡ',
            category: 'Web Development',
            rating: 4.5,
            students: 54000,
            duration: '8 weeks',
            lessons: 35,
            level: 'Intermediate',
            videoId: 'y6fzqBsi1-Y',
            description: 'Professional web development with practical projects and industry standards.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/y6fzqBsi1-Y?si=9jXFu_XdQoAN9hym'
        },
        {
            id: 18,
            title: 'Web Development by TECHNOGURU AMIT',
            instructor: 'TECHNOGURU AMIT',
            category: 'Web Development',
            rating: 4.7,
            students: 78000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Intermediate',
            videoId: 'hpMIQ1lM3Fs',
            description: 'Complete web development with modern tools and professional practices.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/hpMIQ1lM3Fs?si=X6PceYUM2DdJX5v7'
        },

        // Data Science Courses by Different YouTubers
        {
            id: 19,
            title: 'Data Science by Edureka',
            instructor: 'Edureka',
            category: 'Data Science',
            rating: 4.7,
            students: 156000,
            duration: '12 weeks',
            lessons: 60,
            level: 'Beginner',
            videoId: 'xPh5ihBWang',
            description: 'Complete data science course with Python, statistics, and machine learning fundamentals.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/live/xPh5ihBWang?si=KLqoHed6F8gO8gOn'
        },
        {
            id: 20,
            title: 'Data Science by Programming with Mosh',
            instructor: 'Programming with Mosh',
            category: 'Data Science',
            rating: 4.8,
            students: 234000,
            duration: '10 weeks',
            lessons: 50,
            level: 'Beginner',
            videoId: '9R3X0JoCLyU',
            description: 'Learn data science with Python, pandas, NumPy, and practical examples.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/9R3X0JoCLyU?si=b_yvkln1cgFwT5m3'
        },
        {
            id: 21,
            title: 'Data Science by Simplilearn',
            instructor: 'Simplilearn',
            category: 'Data Science',
            rating: 4.6,
            students: 189000,
            duration: '14 weeks',
            lessons: 70,
            level: 'Intermediate',
            videoId: 'QISvmiwOIYI',
            description: 'Professional data science course with advanced analytics and ML techniques.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/QISvmiwOIYI?si=xHUn4DR6rcvoU-Ww'
        },
        {
            id: 22,
            title: 'Data Science by Apna College and Shradha Khapra',
            instructor: 'Apna College and Shradha Khapra',
            category: 'Data Science',
            rating: 4.9,
            students: 267000,
            duration: '16 weeks',
            lessons: 80,
            level: 'Beginner',
            videoId: 'sWhqqiJuypA',
            description: 'Complete data science bootcamp with real-world projects and industry applications.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/sWhqqiJuypA?si=U8Kf4C3CSqqwwdMU'
        },
        {
            id: 23,
            title: 'Data Science by Intellipaat',
            instructor: 'Intellipaat',
            category: 'Data Science',
            rating: 4.5,
            students: 145000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Intermediate',
            videoId: 'a5KmkeQ714k',
            description: 'Comprehensive data science training with hands-on projects and certification.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/live/a5KmkeQ714k?si=KUXF9SDy-T51tohv'
        },
        {
            id: 24,
            title: 'Data Science by WsCube Tech',
            instructor: 'WsCube Tech',
            category: 'Data Science',
            rating: 4.4,
            students: 98000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Beginner',
            videoId: 'gDZ6czwuQ18',
            description: 'Learn data science fundamentals with practical examples and case studies.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/gDZ6czwuQ18?si=-1oKmZnT2-Gvfg5w'
        },
        {
            id: 25,
            title: 'Advanced Data Science by WsCube Tech',
            instructor: 'WsCube Tech',
            category: 'Data Science',
            rating: 4.6,
            students: 76000,
            duration: '12 weeks',
            lessons: 50,
            level: 'Advanced',
            videoId: 'mGJusQ7iBwc',
            description: 'Advanced data science with deep learning and big data technologies.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/mGJusQ7iBwc?si=xaNpC5FnrhUp9ZQ8'
        },
        {
            id: 26,
            title: 'Data Science by GREATE LEARNIBG',
            instructor: 'GREATE LEARNIBG',
            category: 'Data Science',
            rating: 4.3,
            students: 65000,
            duration: '8 weeks',
            lessons: 35,
            level: 'Intermediate',
            videoId: 'N2UPlYHmvmk',
            description: 'Data science course with focus on practical applications and industry tools.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/N2UPlYHmvmk?si=FClTsb2GwCP5NxYX'
        },
        {
            id: 27,
            title: 'Data Science by Nishant Chahar',
            instructor: 'Nishant Chahar',
            category: 'Data Science',
            rating: 4.5,
            students: 89000,
            duration: '10 weeks',
            lessons: 48,
            level: 'Intermediate',
            videoId: '05IST7Q1MXY',
            description: 'Complete data science course with Python, ML, and data visualization.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/05IST7Q1MXY?si=hTDqEJrD8U7bipnW'
        },
        {
            id: 28,
            title: 'Data Science Mastery by Intellipaat',
            instructor: 'Intellipaat',
            category: 'Data Science',
            rating: 4.7,
            students: 178000,
            duration: '14 weeks',
            lessons: 65,
            level: 'Advanced',
            videoId: 'KZgd2UiapE0',
            description: 'Advanced data science with AI, ML, and big data analytics.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/live/KZgd2UiapE0?si=8Sol4wTt571DOTLa'
        },

        // SAP Courses by Different YouTubers
        {
            id: 29,
            title: 'SAP by ZaranTech DotCom',
            instructor: 'ZaranTech DotCom',
            category: 'SAP',
            rating: 4.6,
            students: 89000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Beginner',
            videoId: 'zF8S1Jp3hfE',
            description: 'Complete SAP course with modules, configuration, and practical implementation.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/live/zF8S1Jp3hfE?si=KmkDBmAJ_C_GQfCY'
        },
        {
            id: 30,
            title: 'SAP by Account Expert',
            instructor: 'Account Expert',
            category: 'SAP',
            rating: 4.7,
            students: 112000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Intermediate',
            videoId: 'iaD-pyE03lc',
            description: 'Professional SAP training with finance modules and real-world scenarios.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/iaD-pyE03lc?si=4F43_O8iKCKp65uw'
        },
        {
            id: 31,
            title: 'SAP by freeCodeCamp.org',
            instructor: 'freeCodeCamp.org',
            category: 'SAP',
            rating: 4.8,
            students: 156000,
            duration: '14 weeks',
            lessons: 65,
            level: 'Beginner',
            videoId: 'C9cK2Z2JDLg',
            description: 'Comprehensive SAP course with hands-on projects and certification preparation.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/C9cK2Z2JDLg?si=edZbqu09oV9LqG8a'
        },
        {
            id: 32,
            title: 'SAP by Code With Amrit',
            instructor: 'Code With Amrit',
            category: 'SAP',
            rating: 4.5,
            students: 76000,
            duration: '8 weeks',
            lessons: 35,
            level: 'Beginner',
            videoId: 'qmT-wjyzkTo',
            description: 'Learn SAP fundamentals with practical examples and industry applications.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/qmT-wjyzkTo?si=MTJYolRRKcmzJLyi'
        },
        {
            id: 33,
            title: 'SAP Fundamentals',
            instructor: 'SAP',
            category: 'SAP',
            rating: 4.4,
            students: 65000,
            duration: '6 weeks',
            lessons: 25,
            level: 'Beginner',
            videoId: 'nH45rXx4jD0',
            description: 'Complete SAP fundamentals course with core modules and configuration.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/nH45rXx4jD0?si=eNnLI5prP2bcC8Ql'
        },
        {
            id: 34,
            title: 'SAP by Intellipaat',
            instructor: 'Intellipaat',
            category: 'SAP',
            rating: 4.6,
            students: 98000,
            duration: '10 weeks',
            lessons: 40,
            level: 'Intermediate',
            videoId: 'Tb2zZ8AKftY',
            description: 'Professional SAP training with advanced modules and implementation.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/Tb2zZ8AKftY?si=CRtDEaybIF0zt7b1'
        },
        {
            id: 35,
            title: 'SAP by SAP4BEGINNERS',
            instructor: 'SAP4BEGINNERS',
            category: 'SAP',
            rating: 4.7,
            students: 134000,
            duration: '12 weeks',
            lessons: 50,
            level: 'Beginner',
            videoId: 'jxCoY7tHkRU',
            description: 'Complete SAP course for beginners with step-by-step learning.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/jxCoY7tHkRU?si=V2XQQT5yvuTN7UM_'
        },
        {
            id: 36,
            title: 'SAP by ERP is easy',
            instructor: 'ERP is easy',
            category: 'SAP',
            rating: 4.5,
            students: 78000,
            duration: '8 weeks',
            lessons: 35,
            level: 'Intermediate',
            videoId: '1jFQMadZLfs',
            description: 'Learn SAP with practical examples and real-world business scenarios.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/1jFQMadZLfs?si=yG79B1xHzoFpFarg'
        },
        {
            id: 37,
            title: 'SAP by Zell Education',
            instructor: 'Zell Education',
            category: 'SAP',
            rating: 4.6,
            students: 89000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Advanced',
            videoId: 'bVmOu9bzu54',
            description: 'Advanced SAP course with enterprise-level implementation and optimization.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/bVmOu9bzu54?si=B81pQmrT52d2m5Co'
        },
        {
            id: 38,
            title: 'SAP by STUDY POINT & CAREER-RAIPUR',
            instructor: 'STUDY POINT & CAREER-RAIPUR',
            category: 'SAP',
            rating: 4.4,
            students: 54000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Intermediate',
            videoId: 'eJagxXMPINw',
            description: 'Comprehensive SAP training with certification preparation and job placement.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/eJagxXMPINw?si=eOUy5j31f4Y-ZJQh'
        },

        // App Development Courses by Different YouTubers
        {
            id: 39,
            title: 'App Development by WsCube Tech',
            instructor: 'WsCube Tech',
            category: 'App Development',
            rating: 4.6,
            students: 89000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Beginner',
            videoId: 'FlBhpm9aRUg',
            description: 'Complete app development course with modern frameworks and practical projects.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/FlBhpm9aRUg?si=dbAbbws3KO6cGiiw'
        },
        {
            id: 40,
            title: 'App Development by SCALER',
            instructor: 'SCALER',
            category: 'App Development',
            rating: 4.7,
            students: 112000,
            duration: '14 weeks',
            lessons: 65,
            level: 'Intermediate',
            videoId: 'BxM2DayeOBE',
            description: 'Professional app development with advanced concepts and industry projects.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/BxM2DayeOBE?si=lNQQ-Jpia8Zz3RcK'
        },
        {
            id: 41,
            title: 'App Development by Programming with Mosh',
            instructor: 'Programming with Mosh',
            category: 'App Development',
            rating: 4.8,
            students: 156000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Beginner',
            videoId: 'yye7rSsiV6k',
            description: 'Learn app development with best practices and modern technologies.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/yye7rSsiV6k?si=MVyiisD6gzRxCcqx'
        },
        {
            id: 42,
            title: 'App Development by Apna College',
            instructor: 'Apna College',
            category: 'App Development',
            rating: 4.9,
            students: 234000,
            duration: '16 weeks',
            lessons: 75,
            level: 'Beginner',
            videoId: '7nQsQ0rvYqQ',
            description: 'Complete app development bootcamp with real-world applications and deployment.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/7nQsQ0rvYqQ?si=Ywyd7QM3bPa0SuVs'
        },
        {
            id: 43,
            title: 'App Development by Philipp Lackner',
            instructor: 'Philipp Lackner',
            category: 'App Development',
            rating: 4.7,
            students: 134000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Advanced',
            videoId: 'dzUc9vrsldM',
            description: 'Advanced app development with modern Android and iOS techniques.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/dzUc9vrsldM?si=CMxS-ZUHEwnopMgP'
        },
        {
            id: 44,
            title: 'Advanced App Development by SCALER',
            instructor: 'SCALER',
            category: 'App Development',
            rating: 4.6,
            students: 98000,
            duration: '10 weeks',
            lessons: 48,
            level: 'Advanced',
            videoId: 'mOYN9HlfTgo',
            description: 'Advanced app development with enterprise-level applications and optimization.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/mOYN9HlfTgo?si=S9OjffdjDOJ7BaXv'
        },
        {
            id: 45,
            title: 'App Development by JavaScript Mastery',
            instructor: 'JavaScript Mastery',
            category: 'App Development',
            rating: 4.8,
            students: 178000,
            duration: '12 weeks',
            lessons: 60,
            level: 'Intermediate',
            videoId: 'BTfcnxXevm0',
            description: 'Master app development with JavaScript frameworks and modern tools.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/BTfcnxXevm0?si=PMDqaBi9gzTl8Xem'
        },
        {
            id: 46,
            title: 'App Development by Rivaan Ranawat',
            instructor: 'Rivaan Ranawat',
            category: 'App Development',
            rating: 4.5,
            students: 76000,
            duration: '8 weeks',
            lessons: 35,
            level: 'Intermediate',
            videoId: 'CzRQ9mnmh44',
            description: 'Professional app development with practical projects and industry standards.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/CzRQ9mnmh44?si=1AgG1vIgAc2zHR75'
        },
        {
            id: 47,
            title: 'App Development Mastery by WsCube Tech',
            instructor: 'WsCube Tech',
            category: 'App Development',
            rating: 4.7,
            students: 89000,
            duration: '14 weeks',
            lessons: 65,
            level: 'Advanced',
            videoId: 'lFguWR9uMD0',
            description: 'Advanced app development with cutting-edge technologies and best practices.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/lFguWR9uMD0?si=BHPILXGREeITFamo'
        },
        {
            id: 48,
            title: 'App Development by Code with Dr. Zeeshan Bhatti',
            instructor: 'Code with Dr. Zeeshan Bhatti',
            category: 'App Development',
            rating: 4.6,
            students: 65000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Intermediate',
            videoId: 'jniJeamcIUU',
            description: 'Complete app development course with focus on practical implementation.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/jniJeamcIUU?si=U7Sx3NgsT3Fme8Nl'
        },
        {
            id: 49,
            title: 'App Development by CodeWithChris',
            instructor: 'CodeWithChris',
            category: 'App Development',
            rating: 4.8,
            students: 145000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Beginner',
            videoId: 'jniJeamcIUU',
            description: 'Learn app development from scratch with professional guidance and projects.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/jniJeamcIUU?si=U7Sx3NgsT3Fme8Nl'
        },

        // AI & ML Courses by Different YouTubers
        {
            id: 50,
            title: 'AI & ML by EDUREKA',
            instructor: 'EDUREKA',
            category: 'AI & ML',
            rating: 4.7,
            students: 156000,
            duration: '14 weeks',
            lessons: 65,
            level: 'Beginner',
            videoId: 'EHBNe31y65s',
            description: 'Complete AI & ML course with fundamentals, algorithms, and practical applications.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/live/EHBNe31y65s?si=543vSlYQ8euAotUF'
        },
        {
            id: 51,
            title: 'AI & ML by Intellipaat',
            instructor: 'Intellipaat',
            category: 'AI & ML',
            rating: 4.6,
            students: 134000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Intermediate',
            videoId: 'W7N6LPp0SmY',
            description: 'Professional AI & ML training with deep learning and neural networks.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/W7N6LPp0SmY?si=fX9Y4zLj9os3cGIF'
        },
        {
            id: 52,
            title: 'AI & ML by Apna College and Shradha Khapra',
            instructor: 'Apna College and Shradha Khapra',
            category: 'AI & ML',
            rating: 4.9,
            students: 267000,
            duration: '16 weeks',
            lessons: 75,
            level: 'Beginner',
            videoId: 'qvUxG2a8QHs',
            description: 'Complete AI & ML bootcamp with real-world projects and industry applications.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/qvUxG2a8QHs?si=Qwm7eMYrAGk5Ix5o'
        },
        {
            id: 53,
            title: 'AI & ML by MicroDegree ಕನ್ನಡ',
            instructor: 'MicroDegree ಕನ್ನಡ',
            category: 'AI & ML',
            rating: 4.5,
            students: 76000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Beginner',
            videoId: 'KpiSRshpIy0',
            description: 'Learn AI & ML fundamentals with practical examples and case studies.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/KpiSRshpIy0?si=yyubABPLK82Gh4av'
        },
        {
            id: 54,
            title: 'AI & ML by WsCube Tech',
            instructor: 'WsCube Tech',
            category: 'AI & ML',
            rating: 4.6,
            students: 98000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Intermediate',
            videoId: 'LvC68w9JS4Y',
            description: 'Comprehensive AI & ML course with machine learning algorithms and applications.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/LvC68w9JS4Y?si=RPyyDbpxdH90m0uT'
        },
        {
            id: 55,
            title: 'Advanced AI & ML by Intellipaat',
            instructor: 'Intellipaat',
            category: 'AI & ML',
            rating: 4.7,
            students: 112000,
            duration: '14 weeks',
            lessons: 65,
            level: 'Advanced',
            videoId: 'mULvGdqFKEY',
            description: 'Advanced AI & ML with deep learning, computer vision, and NLP.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/mULvGdqFKEY?si=x22GceRnOUDhgm-T'
        },
        {
            id: 56,
            title: 'AI & ML Mastery by Intellipaat',
            instructor: 'Intellipaat',
            category: 'AI & ML',
            rating: 4.8,
            students: 145000,
            duration: '16 weeks',
            lessons: 75,
            level: 'Advanced',
            videoId: 'tzzz8w53FV4',
            description: 'Master AI & ML with cutting-edge technologies and enterprise applications.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/live/tzzz8w53FV4?si=Q3JWHQ43_sljpTLK'
        },
        {
            id: 57,
            title: 'AI & ML by Sheryians AI School',
            instructor: 'Sheryians AI School',
            category: 'AI & ML',
            rating: 4.7,
            students: 89000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Intermediate',
            videoId: '1L420xXpDTg',
            description: 'Professional AI & ML training with focus on practical implementation.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/1L420xXpDTg?si=KN0dJzq9aunyHokC'
        },
        {
            id: 58,
            title: 'AI & ML by freeCodeCamp.org',
            instructor: 'freeCodeCamp.org',
            category: 'AI & ML',
            rating: 4.8,
            students: 189000,
            duration: '18 weeks',
            lessons: 85,
            level: 'Beginner',
            videoId: 'mEsleV16qdo',
            description: 'Complete AI & ML bootcamp with hands-on projects and certification.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/mEsleV16qdo?si=BQguwK3pWkH1XFsb'
        },
        {
            id: 59,
            title: 'AI & ML Professional by Intellipaat',
            instructor: 'Intellipaat',
            category: 'AI & ML',
            rating: 4.6,
            students: 123000,
            duration: '14 weeks',
            lessons: 65,
            level: 'Advanced',
            videoId: 'FP9kL-_k5Ys',
            description: 'Professional AI & ML course with industry projects and job placement.',
            price: 'Free',
            playlistUrl: 'https://www.youtube.com/live/FP9kL-_k5Ys?si=swdP2CEmYS6aoGox'
        },

        // Data Structure and Algorithm Courses by Different YouTubers
        {
            id: 60,
            title: 'Data Structure and Algorithm by Programming with Mosh',
            instructor: 'Programming with Mosh',
            category: 'Data Structure And Algorithm',
            rating: 4.8,
            students: 178000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Intermediate',
            videoId: 'BBpAmxU_NQo',
            description: 'Complete data structures and algorithms course with practical examples and implementations.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/BBpAmxU_NQo?si=_viYTWq_nMuQ8rVM'
        },
        {
            id: 61,
            title: 'Data Structure and Algorithm by freeCodeCamp.org',
            instructor: 'freeCodeCamp.org',
            category: 'Data Structure And Algorithm',
            rating: 4.9,
            students: 234000,
            duration: '14 weeks',
            lessons: 65,
            level: 'Beginner',
            videoId: '8hly31xKli0',
            description: 'Comprehensive data structures and algorithms bootcamp with hands-on coding exercises.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/8hly31xKli0?si=7ryCHHWKdrdYaR48'
        },
        {
            id: 62,
            title: 'Data Structure and Algorithm by Jenny\'s Lectures CS IT',
            instructor: 'Jenny\'s Lectures CS IT',
            category: 'Data Structure And Algorithm',
            rating: 4.7,
            students: 156000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Intermediate',
            videoId: 'AT14lCXuMKI',
            description: 'Professional data structures and algorithms training with detailed explanations.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/AT14lCXuMKI?si=MN3V4yGlCZuLq7_i'
        },
        {
            id: 63,
            title: 'Data Structure and Algorithm by College Wallah',
            instructor: 'College Wallah',
            category: 'Data Structure And Algorithm',
            rating: 4.6,
            students: 134000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Beginner',
            videoId: 'QwSgyhSAJnc',
            description: 'Learn data structures and algorithms with clear explanations and practical examples.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/QwSgyhSAJnc?si=mEMBet-NC27vfljw'
        },
        {
            id: 64,
            title: 'Data Structure and Algorithm by MicroDegree ಕನ್ನಡ',
            instructor: 'MicroDegree ಕನ್ನಡ',
            category: 'Data Structure And Algorithm',
            rating: 4.5,
            students: 89000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Beginner',
            videoId: 'VCePvdTel64',
            description: 'Data structures and algorithms course with practical implementations and examples.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/VCePvdTel64?si=NEMo7cfNxFAiKfVp'
        },
        {
            id: 65,
            title: 'Data Structure and Algorithm by KnowledgeGATE by Sanchit Sir',
            instructor: 'KnowledgeGATE by Sanchit Sir',
            category: 'Data Structure And Algorithm',
            rating: 4.7,
            students: 112000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Intermediate',
            videoId: 'MdG0Vw9f1A4',
            description: 'Advanced data structures and algorithms with interview preparation focus.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/MdG0Vw9f1A4?si=ZiLrIKgRA3CzXVgd'
        },
       
        {
            id: 67,
            title: 'Data Structure and Algorithm by WsCube Tech',
            instructor: 'WsCube Tech',
            category: 'Data Structure And Algorithm',
            rating: 4.6,
            students: 98000,
            duration: '10 weeks',
            lessons: 45,
            level: 'Intermediate',
            videoId: 'mGJusQ7iBwc',
            description: 'Complete data structures and algorithms course with practical coding examples.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/mGJusQ7iBwc?si=8EWmkkxRhiUKrcTF'
        },
        {
            id: 68,
            title: 'Data Structure and Algorithm by Apna College',
            instructor: 'Apna College',
            category: 'Data Structure And Algorithm',
            rating: 4.9,
            students: 267000,
            duration: '14 weeks',
            lessons: 65,
            level: 'Beginner',
            videoId: 'VTLCoHnyACE',
            description: 'Complete data structures and algorithms bootcamp with real-world applications.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/VTLCoHnyACE?si=tnwEQXixSN6PuoqT'
        },
        {
            id: 69,
            title: 'Data Structure and Algorithm by Telusko',
            instructor: 'Telusko',
            category: 'Data Structure And Algorithm',
            rating: 4.8,
            students: 189000,
            duration: '12 weeks',
            lessons: 55,
            level: 'Intermediate',
            videoId: '4_HOnhB64Dg',
            description: 'Professional data structures and algorithms with industry best practices.',
            price: 'Free',
            playlistUrl: 'https://youtu.be/4_HOnhB64Dg?si=X4zgDuiym23fog_r'
        }
    ],

    // Initialize courses module
    init() {
        // Clear any conflicting enrollment data and ensure consistency
        this.clearEnrollmentConflicts();
        
        this.renderCourses();
        this.setupFilters();
        this.setupSearch();
    },
    
    // Clear enrollment conflicts and ensure consistency
    clearEnrollmentConflicts() {
        const user = this.getCurrentUser();
        if (!user) return;
        
        // Get enrollments from both storage systems
        const newFormat = JSON.parse(localStorage.getItem('onlineguru_enrollments')) || {};
        const oldFormat = JSON.parse(localStorage.getItem(`enrollments_${user.id}`)) || [];
        
        // If both exist, merge them
        if (newFormat[user.id] && oldFormat.length > 0) {
            const merged = [...new Set([...newFormat[user.id], ...oldFormat])];
            localStorage.setItem('onlineguru_enrollments', JSON.stringify({[user.id]: merged}));
            localStorage.setItem(`enrollments_${user.id}`, JSON.stringify(merged));
        }
    },

    // Get YouTube thumbnail URL
    getYouTubeThumbnail(videoId) {
        if (!videoId) return 'https://via.placeholder.com/400x300?text=No+Video';
        // Try maxresdefault first, fallback to hqdefault
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    },

    // Render courses grid
    renderCourses(filteredCourses = null) {
        const coursesGrid = document.getElementById('courses-grid');
        if (!coursesGrid) return;

        const courses = filteredCourses || this.courses;
        const user = this.getCurrentUser();
        const enrollments = this.getUserEnrollments(user?.id);

        if (courses.length === 0) {
            coursesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No courses found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        coursesGrid.innerHTML = courses.map((course, index) => `
            <div class="glass-card" style="animation-delay: ${index * 0.1}s; position: relative;">
                <div style="position: relative; text-align: center; margin-bottom: 1.5rem;">
                    <img src="${this.getYouTubeThumbnail(course.videoId)}" 
                         alt="${course.title}" 
                         style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px;"
                         onerror="this.src='https://img.youtube.com/vi/${course.videoId}/hqdefault.jpg'; this.onerror=null;">
                    
                    ${course.playlistUrl ? `
                        <a href="${course.playlistUrl}" target="_blank" class="btn btn-outline" style="position: absolute; top: 10px; right: 10px; z-index: 10; padding: 8px 12px; font-size: 0.8rem; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(5px);">
                            <i class="fas fa-list"></i> Playlist
                        </a>
                    ` : ''}
                </div>
                
                <div style="text-align: center;">
                    <span style="display: inline-block; background: var(--primary); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; margin-bottom: 1rem;">
                        ${course.category}
                    </span>
                    
                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--text-primary);">${course.title}</h3>
                    
                    <div style="margin-bottom: 1rem;">
                        <i class="fas fa-chalkboard-teacher" style="color: var(--primary); margin-right: 0.5rem;"></i>
                        <span style="color: var(--text-secondary);">${course.instructor}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            ${this.generateStars(course.rating)}
                            <span style="color: var(--text-secondary); font-size: 0.9rem;">${course.rating} (${course.students.toLocaleString()})</span>
                        </div>
                        <span style="background: rgba(99, 102, 241, 0.1); color: var(--primary); padding: 4px 8px; border-radius: 10px; font-size: 0.8rem;">
                            ${course.level}
                        </span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);">
                            <i class="far fa-clock"></i>
                            <span>${course.duration}</span>
                        </div>
                        
                        ${user ? `
                            <button class="btn ${enrollments.includes(course.id) ? 'btn-success' : 'btn-primary'}" 
                                    onclick="Courses.handleEnroll(${course.id}, event)"
                                    ${enrollments.includes(course.id) ? 'disabled' : ''}>
                                ${enrollments.includes(course.id) ? '<i class="fas fa-check"></i> Enrolled' : '<i class="fas fa-plus"></i> Enroll Now'}
                            </button>
                        ` : ` 
                            <a href="login.html" class="btn btn-outline">
                                <i class="fas fa-sign-in-alt"></i> Login to Enroll
                            </a>
                        `}
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Generate star rating HTML
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalf) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        return stars;
    },

    // Setup filter buttons
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter courses
                const filter = btn.dataset.filter;
                let filteredCourses = this.courses;
                
                if (filter !== 'all') {
                    filteredCourses = this.courses.filter(c => 
                        c.category.toLowerCase().includes(filter) ||
                        c.level.toLowerCase().includes(filter)
                    );
                }
                
                this.renderCourses(filteredCourses);
            });
        });
    },

    // Setup search functionality
    setupSearch() {
        const searchInput = document.getElementById('search-courses');
        if (!searchInput) return;

        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = e.target.value.toLowerCase().trim();
                
                if (query.length < 2) {
                    this.renderCourses();
                    return;
                }
                
                const filtered = this.courses.filter(course =>
                    course.title.toLowerCase().includes(query) ||
                    course.instructor.toLowerCase().includes(query) ||
                    course.category.toLowerCase().includes(query) ||
                    (course.description && course.description.toLowerCase().includes(query))
                );
                
                this.renderCourses(filtered);
            }, 300);
        });
    },

    // Handle enrollment with proper localStorage management
    handleEnroll(courseId, event) {
        if (event) {
            event.stopPropagation();
        }
        
        const user = this.getCurrentUser();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        
        // Get enrollments using consistent key
        let enrollments = this.getUserEnrollments(user.id);
        const course = this.getCourseById(courseId);
        
        if (enrollments.includes(courseId)) {
            this.showNotification('Already enrolled in this course', 'info');
            return;
        }
        
        // Add enrollment
        enrollments.push(courseId);
        
        // Save to both storage keys for consistency
        localStorage.setItem(`enrollments_${user.id}`, JSON.stringify(enrollments));
        localStorage.setItem('onlineguru_enrollments', JSON.stringify({[user.id]: enrollments}));
        
        // Show success notification with exact message
        this.showNotification('Enroll successfully completed', 'success');
        
        // Update button state with enrolled styling
        this.renderCourses();
        
        // Update dashboard if it exists
        this.updateDashboardEnrollments(user.id, enrollments);
        
        // Add activity to user activity log
        this.addActivity(user.id, 'enrollment', `Enrolled in ${course.title}`);
    },
    
    // Update dashboard enrollment count and course list
    updateDashboardEnrollments(userId, enrollments) {
        // Update dashboard stats if dashboard is loaded
        if (window.Dashboard && window.Dashboard.userStats) {
            window.Dashboard.userStats.enrolled = enrollments.length;
            window.Dashboard.updateSidebarBadges();
            
            // Refresh dashboard courses if on dashboard page
            if (window.Dashboard.loadMyCourses) {
                window.Dashboard.loadMyCourses();
            }
            
            // Update dashboard stats
            if (window.Dashboard.updateUserStats) {
                window.Dashboard.updateUserStats();
            }
        }
        
        // Update any dashboard enrollment displays
        const enrollmentElements = document.querySelectorAll('.enrollment-count, .total-enrolled, #total-courses-stat, #total-courses');
        enrollmentElements.forEach(element => {
            if (element) {
                element.textContent = enrollments.length;
            }
        });
        
        // Store current enrollment count for dashboard
        localStorage.setItem(`dashboard_enrollments_${userId}`, JSON.stringify({
            count: enrollments.length,
            courses: enrollments,
            lastUpdated: new Date().toISOString()
        }));
    },

    // Handle card click for ultra-professional effects
    handleCardClick(courseId, element) {
        // Remove previous selections
        document.querySelectorAll('.course-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selected class to clicked card
        element.currentTarget.classList.add('selected');
        
        // Store selected course
        this.selectedCourseId = courseId;
        
        // Optional: Navigate to course details or player
        // this.navigateToCourse(courseId);
    },
    
    // Handle mouse down for press effect
    handleCardMouseDown(courseId, element) {
        element.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
    },
    
    // Handle mouse up for release effect
    handleCardMouseUp(courseId, element) {
        element.currentTarget.style.transform = 'translateY(-6px) scale(1.015)';
    },
    
    // Handle mouse leave to reset
    handleCardMouseLeave(courseId, element) {
        if (!element.currentTarget.classList.contains('selected')) {
            element.currentTarget.style.transform = 'translateY(0) scale(1)';
        }
    },

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification-toast');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification-toast';
            document.body.appendChild(notification);
        }

        // Set message and type
        notification.textContent = message;
        notification.className = `notification-toast ${type}`;
        notification.style.display = 'block';

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 3000);
    },

    // Get current user
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('onlineguru_user');
            return userStr ? JSON.parse(userStr) : null;
        } catch {
            return null;
        }
    },

    // Get user enrollments
    getUserEnrollments(userId) {
        if (!userId) return [];
        const enrollments = JSON.parse(localStorage.getItem('onlineguru_enrollments')) || {};
        return enrollments[userId] || [];
    },

    // Add activity for user
    addActivity(userId, type, description) {
        const activities = JSON.parse(localStorage.getItem('onlineguru_activities')) || {};
        if (!activities[userId]) activities[userId] = [];
        
        activities[userId].unshift({
            id: Date.now(),
            type,
            description,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 50 activities
        if (activities[userId].length > 50) {
            activities[userId] = activities[userId].slice(0, 50);
        }
        
        localStorage.setItem('onlineguru_activities', JSON.stringify(activities));
    },

    // Get course by ID
    getCourseById(id) {
        return this.courses.find(c => c.id === parseInt(id));
    }
};

// Initialize courses when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Courses.init();
});

// Make Courses available globally
window.Courses = Courses;
window.handleEnroll = (id) => Courses.handleEnroll(id);
window.getCourseById = (id) => Courses.getCourseById(id);