import * as requestStatusType  from './requestStatusType';
import { formatColumns } from "../helpers/excelFormatter";

export const letterColors = {
  [requestStatusType.LEAVE_REQUEST_PENDING]: '#ffe43a',
  [requestStatusType.LEAVE_REQUEST_APPROVED]: '#0eba25',
  [requestStatusType.LEAVE_REQUEST_REJECTED]: '#2A2A2E',
};

export const letterStatusText = {
  [requestStatusType.LEAVE_REQUEST_PENDING]: 'PENDING',
  [requestStatusType.LEAVE_REQUEST_APPROVED]: 'APPROVED',
  [requestStatusType.LEAVE_REQUEST_REJECTED]: 'REJECTED',
};

export const defaultColumns = [ 'When', 'From', 'To', 'Status', 'Actions'];
export const HRColumns = [ 'Name', 'When', 'From', 'To', 'Status', 'Actions'];

export const defaultExportColumns = formatColumns([
  { columnName: 'When' },
  { columnName: 'From', },
  { columnName: 'To', },
  { columnName: 'Approver', columnWidth: 200,},
  { columnName: 'Substitute', columnWidth: 200,},
  { columnName: 'Status', columnWidth: 200, },
]);
export const HRExportColumns = formatColumns([
  { columnName: 'Name', columnWidth: 200,},
  { columnName: 'When' },
  { columnName: 'From', },
  { columnName: 'To', },
  { columnName: 'Approver', columnWidth: 200,},
  { columnName: 'Substitute', columnWidth: 200,},
  { columnName: 'Status', columnWidth: 100, },
]);

export const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];