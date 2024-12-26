// // Example usage in middleware
// const checkPermission = (requiredPermission) => {
//     return async (req, res, next) => {
//         const userRole = req.user.role;
//         const userPermissions = rolePermissions[userRole];

//         if (!userPermissions.includes(requiredPermission)) {
//             res.status(403);
//             throw new Error('Permission denied');
//         }

//         next();
//     };
// };

// // Example route protection
// router.post('/jobs', 
//     authenticate,
//     checkPermission('JOB_CREATE'),
//     jobController.createJob
// );
// }