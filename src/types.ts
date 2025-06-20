import * as CSS from 'csstype';

export type HyphenProperty = keyof CSS.PropertiesHyphen;
export type CamelProperty = keyof CSS.Properties;

export type Property = HyphenProperty | CamelProperty;
