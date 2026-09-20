import {createMMKV} from 'react-native-mmkv';

/** Single app-wide MMKV instance. Prefer this over creating new stores. */
export const storage = createMMKV({id: 'ds.storage'});
