// src/services/admin.service.js
async initializeDefaultPermissions() {
    const defaultPermissions = [
        // User Management Permissions
        {
            name: 'View Users', // Human readable name
            code: 'USER_VIEW', // Unique identifier for the permission
            module: 'users', // The system module this permission belongs to
            actions: ['read'] // What actions are allowed
        },
        {
            name: 'Manage Users',
            code: 'USER_MANAGE',
            module: 'users',
            actions: ['create', 'read', 'update', 'delete']
        },

        // Job Management Permissions
        {
            name: 'Post Jobs',
            code: 'JOB_CREATE',
            module: 'jobs',
            actions: ['create']
        },
        {
            name: 'View Jobs',
            code: 'JOB_VIEW',
            module: 'jobs',
            actions: ['read']
        },
        {
            name: 'Edit Jobs',
            code: 'JOB_EDIT',
            module: 'jobs',
            actions: ['update']
        },
        {
            name: 'Delete Jobs',
            code: 'JOB_DELETE',
            module: 'jobs',
            actions: ['delete']
        },

        // Application Management Permissions
        {
            name: 'Submit Applications',
            code: 'APPLICATION_SUBMIT',
            module: 'applications',
            actions: ['create']
        },
        {
            name: 'View Applications',
            code: 'APPLICATION_VIEW',
            module: 'applications',
            actions: ['read']
        },
        {
            name: 'Process Applications',
            code: 'APPLICATION_PROCESS',
            module: 'applications',
            actions: ['update']
        },

        // Interview Management Permissions
        {
            name: 'Schedule Interviews',
            code: 'INTERVIEW_SCHEDULE',
            module: 'interviews',
            actions: ['create']
        },
        {
            name: 'View Interview Schedule',
            code: 'INTERVIEW_VIEW',
            module: 'interviews',
            actions: ['read']
        },
        {
            name: 'Submit Interview Feedback',
            code: 'INTERVIEW_FEEDBACK',
            module: 'interviews',
            actions: ['create', 'update']
        },

        // Student Management Permissions
        {
            name: 'Manage Student Profiles',
            code: 'STUDENT_MANAGE',
            module: 'students',
            actions: ['create', 'read', 'update']
        },
        {
            name: 'View Student Profiles',
            code: 'STUDENT_VIEW',
            module: 'students',
            actions: ['read']
        },

        // Company Management Permissions
        {
            name: 'Manage Company Profiles',
            code: 'COMPANY_MANAGE',
            module: 'companies',
            actions: ['create', 'read', 'update']
        },
        {
            name: 'View Company Profiles',
            code: 'COMPANY_VIEW',
            module: 'companies',
            actions: ['read']
        },

        // Analytics Permissions
        {
            name: 'View Analytics',
            code: 'ANALYTICS_VIEW',
            module: 'analytics',
            actions: ['read']
        },
        {
            name: 'Generate Reports',
            code: 'REPORT_GENERATE',
            module: 'reports',
            actions: ['create', 'read']
        }
    ];

    // Role-specific permission assignments
    const rolePermissions = {
        admin: defaultPermissions.map(p => p.code), // Admin gets all permissions

        tpo: [
            'USER_VIEW',
            'JOB_VIEW',
            'JOB_EDIT',
            'APPLICATION_VIEW',
            'APPLICATION_PROCESS',
            'INTERVIEW_SCHEDULE',
            'INTERVIEW_VIEW',
            'STUDENT_MANAGE',
            'COMPANY_VIEW',
            'ANALYTICS_VIEW',
            'REPORT_GENERATE'
        ],

        company: [
            'JOB_CREATE',
            'JOB_VIEW',
            'JOB_EDIT',
            'APPLICATION_VIEW',
            'INTERVIEW_SCHEDULE',
            'INTERVIEW_FEEDBACK',
            'STUDENT_VIEW',
            'COMPANY_MANAGE'
        ],

        student: [
            'JOB_VIEW',
            'APPLICATION_SUBMIT',
            'APPLICATION_VIEW',
            'INTERVIEW_VIEW',
            'STUDENT_VIEW'
        ]
    };

    