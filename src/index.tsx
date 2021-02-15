import { NativeModules } from 'react-native';

type VbtCirrusmdBridgeLibraryType = {
  multiply(a: number, b: number): Promise<number>;
};

const { VbtCirrusmdBridgeLibrary } = NativeModules;

export default VbtCirrusmdBridgeLibrary as VbtCirrusmdBridgeLibraryType;
