export enum MainDeGiroConsts {
  BASE_API_URL = 'https://trader.degiro.nl/',
  LOGIN_URL_PATH = 'login/secure/login',
  LOGOUT_URL_PATH = 'trading/secure/logout',
  GET_ACCOUNT_CONFIG_PATH = 'login/secure/config',
}

export enum DeGiroActions {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum DeGiroMarketOrderTypes {
  LIMITED = 0,
  MARKET = 2,
  STOP_LOSS = 3,
  STOP_LOSS_LIMIT = 1,
}

export enum DeGiroTimeTypes {
  DAY = 1,
  PERMANENT = 3,
}

export enum DeGiroProducTypes {
  // all = undefined, undefined is not allowed to set on enum
  shares = 1,
  bonds = 2,
  futures = 7,
  options = 8,
  investmendFunds = 13,
  leveragedProducts = 14,
  etfs = 131,
  cfds = 535,
  warrants = 536,
}

export enum DeGiroSort {
  ASC = 'asc',
  DESC = 'desc',
}

export enum PORTFOLIO_POSITIONS_TYPE_ENUM  {
  ALL = 'all',
  ALL_POSITIONS = 'allPositions',
  OPEN = 'open',
  CLOSED = 'closed',
}