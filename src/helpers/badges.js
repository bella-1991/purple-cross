export const getEmpStatusBadgeClass = (type) => {    
    switch (type.toLowerCase()) {
        case 'past employee':
            return 'bg-blue-600 text-white';
        case 'terminated':
            return 'bg-red-500 text-white';
        case 'currently employed':
            return 'bg-green-500 text-white';
        case 'to be terminated':
            return 'bg-yellow-500 text-white';
        case 'employeed soon':
            return 'bg-indigo-500 text-white';
        default:
            return 'bg-gray-400';
    }
}

export const getTypeBadgeClass = (type) => {
    switch (type.toLowerCase()) {
        case 'full-time':
            return 'bg-green-600 text-white';
        case 'part-time':
            return 'bg-blue-500 text-white';
        case 'contract':
            return 'bg-yellow-500 text-white';
        case 'remote':
            return 'bg-indigo-500 text-white';
        case 'internship':
            return 'bg-rose-500 text-white';
        default:
            return 'bg-gray-400';
    }
}