declare module 'react-native-touch-id' {
  interface TouchIDConfig {
    title?: string;
    imageColor?: string;
    imageErrorColor?: string;
    sensorDescription?: string;
    sensorErrorDescription?: string;
    cancelText?: string;
    fallbackLabel?: string;
    unifiedErrors?: boolean;
    passcodeFallback?: boolean;
  }

  interface TouchID {
    isSupported(config?: TouchIDConfig): Promise<boolean | string>;
    authenticate(reason?: string, config?: TouchIDConfig): Promise<boolean>;
  }

  const TouchID: TouchID;
  export default TouchID;
}
