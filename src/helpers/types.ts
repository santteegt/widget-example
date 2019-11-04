export interface IWalletOptions {
  portisEnabled?: boolean;
  portisAppId?: string;
  torusEnabled?: boolean;
}

export interface IOPSettings {
  nodeUri: string;
  aquariusUri: string;
  brizoUri: string;
  brizoAddress: string;
  secretStoreUri: string;
  verbose: boolean;
}

export interface OceanOptions {
  enabled: boolean;
  settings: IOPSettings;
}

export interface IProviderInfo {
  name: string;
  type: string;
  logo: string;
  check: string;
  styled: {
    [prop: string]: any;
  };
}

export interface IProviderOptions {
  [providerName: string]: {
    package: any;
    options: any;
  };
}

export interface IToolInfo {
  name: string;
  description: string;
  logo: string;
}

export type SimpleFunction = (input?: any) => void;

export interface IEventCallback {
  event: string;
  callback: (result: any) => void;
}

export interface IInjectedProvidersMap {
  injectedAvailable: boolean;
  [isProviderName: string]: boolean;
}

export interface IProviderCallback {
  name: string | null;
  onClick: () => Promise<void>;
}
