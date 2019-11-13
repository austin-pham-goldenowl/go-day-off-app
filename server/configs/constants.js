export const LEAVING_LETTER_STATUS = { PENDING: 1, APPROVED: 2, REJECTED: 3 };
export const LEAVING_LETTER_STATUS_VALUES = [1, 2, 3];

export const USER_GENDER = { FEMALE: 1, MALE: 2, OTHER: 3 };
export const USER_GENDER_VALUES = [1, 2, 3];

export const REJECT_TYPE = { BY_APPROVER: 1, BY_SELF: 2 };
export const REJECT_TYPE_VALUES = [1, 2];

export const FROM_OPTION = {
  ALLDAY: "allday",
  MORNING: "morning",
  AFTERNOON: "afternoon"
};
export const FROM_OPTION_VALUES = ["allday", "morning", "afternoon"];

export const TO_OPTION = {
  ALLDAY: "allday",
  MORNING: "morning",
  AFTERNOON: 'afternoon',
}

export const TO_OPTION_VALUES = ["allday", "morning", "afternoon"];

export const DAY_SESSION_OPTIONS = { //Jun added this object
  allday: "",
  morning: "09h00",
  afternoon: "13h30"
}

export const API_VERSIONS = ["v1.0.0"];
export const DEFAULT_API_VERSION = "v1.0.0";

export const DEFAULT_PAGE_ORDER = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const ALLOWED_PAGE_SIZE = [0, 5, 10, 15, 20]; // 0: all

export const WEEKEND_ORDERS = [0, 6];

export const ALLOWED_STATUS = [0, 1, 2, 3];
export const DEFAULT_STATUS = 0;