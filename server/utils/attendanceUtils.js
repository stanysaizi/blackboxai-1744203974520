// Department-specific late thresholds (in minutes)
const DEPARTMENT_THRESHOLDS = {
  'HR': 15,
  'Engineering': 30,
  'Marketing': 20,
  'Sales': 25,
  'Operations': 15,
  'Finance': 10
};

// Calculate late minutes based on department and current time
exports.calculateLateMinutes = (department) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Standard work hours (9AM)
  const standardHour = 9;
  const standardMinute = 0;
  
  // Calculate minutes late
  const lateMinutes = 
    (currentHour - standardHour) * 60 + 
    (currentMinute - standardMinute);
    
  // Only count as late if after threshold
  const threshold = DEPARTMENT_THRESHOLDS[department] || 15;
  return lateMinutes > threshold ? lateMinutes : 0;
};

// Determine attendance status
exports.determineStatus = (checkInTime, department) => {
  const lateMinutes = this.calculateLateMinutes(
    new Date(checkInTime), 
    department
  );
  
  if (lateMinutes > 0) {
    return 'late';
  }
  return 'present';
};

// Calculate working hours
exports.calculateWorkingHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  
  const diffMs = checkOut - checkIn;
  const diffHours = diffMs / (1000 * 60 * 60);
  
  // Subtract lunch break if applicable
  return diffHours > 5 ? diffHours - 1 : diffHours;
};
