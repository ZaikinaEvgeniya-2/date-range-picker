export const ANY = 'any';
export const CUSTOM = 'custom';
export const NONE = 'none';
export const ALL = 'All';

export const MAX_ANALYTICS_HOURS = 168;

export const TABLE_MAX_SELECTION_COUNT = 50;
export const TABLE_PAGE_SIZE_OPTIONS = [10, 20, 50];

export const FIVE_G = '5G';
export const WLAN = 'Wlan';

export const API_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  LOADING: 'loading',
  NOT_CALLED: 'notCalled',
};

export const CLIENT_TYPE_NAME = Object.freeze({
  [FIVE_G]: FIVE_G,
  [WLAN]: 'Wi-Fi',
});

export const CLIENT_TYPE_OPTIONS = [
  {
    key: FIVE_G,
    value: FIVE_G,
    displayText: FIVE_G,
  },
  {
    key: WLAN,
    value: WLAN,
    displayText: 'Wi-Fi',
  },
];

// Todo : Get this from backend
export const CLIENT_SITE_OPTIONS = [
  {
    key: 'India',
    value: 'India',
    displayText: 'India',
  },
  {
    key: 'San Jose',
    value: 'San Jose',
    displayText: 'San Jose',
  },
];

export const MESSAGE_NOTIFICATIONS = {
  DELETE_SUCCESS: 'Delete Success',
  DELETE_FAILED: 'Delete Failed',
};

// export const CLOUD_URL_PARAMS = { host: "localhost:8080" };
export const CLOUD_URL_PARAMS = null;

export const cloudHostname = [
  // "localhost",
  'www.atayalan-dev.com',
  'dashboard.ataya.io',
];
export const cloudAddress = 'ataya.io';
export const supportEmail = 'support@ataya.io';

export const MAXLENGTH = {
  NAME: 48,
  DESCRIPTION: 254,
  PASSWORD: 127,
  EMAIL: 254,
  UPLINK_DOWNLINK: { DECIMAL: 4, FLOAT: 1 },
};

export const CUSTOM_FILTER_OPTIONS = [
  {
    key: '0',
    value: '1',
    displayText: 'Last 1 hr',
    period: '5m',
  },
  {
    key: '1',
    value: '24',
    displayText: 'Last 24 hrs',
    period: '1h',
  },
  {
    key: '3',
    value: '72',
    displayText: 'Last 3 days',
    period: '1h',
  },
  {
    key: '7',
    value: '168',
    displayText: 'Last 7 days',
    period: '1h',
  },
];
