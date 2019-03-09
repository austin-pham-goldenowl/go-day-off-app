const leaveTypesDescription = {1: 'Việc cá nhân', 2: 'Nghỉ ốm', 3: 'Nghỉ phép năm', 4: 'Nghỉ chế độ'};

export const getLeaveType = (typeCode) => {
  switch (typeCode) {
    case 1: case 2: case 3: case 4: {
      return leaveTypesDescription[typeCode];
    }
    default:
      return '';
  }
}