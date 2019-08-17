import includes from 'array-includes';
import find from 'array.prototype.find';
import fill from 'array.prototype.fill';
import entries from 'object.entries';

includes.shim();
find.shim();
entries.shim();
// eslint-disable-next-line
fill;
