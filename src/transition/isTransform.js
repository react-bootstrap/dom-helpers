let supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

export default function isTransform(property) {
  return !!(property && supportedTransforms.test(property));
}
