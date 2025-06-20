const supportedTransforms =
  /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

export type TransformValue =
  | 'translate'
  | 'translateY'
  | 'translateX'
  | 'translateZ'
  | 'translate3d'
  | 'rotate'
  | 'rotateY'
  | 'rotateX'
  | 'rotateZ'
  | 'rotate3d'
  | 'scale'
  | 'scaleY'
  | 'scaleX'
  | 'scaleZ'
  | 'scale3d'
  | 'matrix'
  | 'matrix3d'
  | 'perspective'
  | 'skew'
  | 'skewY'
  | 'skewX';

export default function isTransform(value: string): value is TransformValue {
  return !!(value && supportedTransforms.test(value));
}
