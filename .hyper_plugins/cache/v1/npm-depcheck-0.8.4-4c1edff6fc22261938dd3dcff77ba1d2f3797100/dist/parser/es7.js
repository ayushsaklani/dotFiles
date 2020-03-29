"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseES7;

var _parser = require("@babel/parser");

function parseES7(content) {
  return (0, _parser.parse)(content, {
    sourceType: 'module',
    // Enable all known compatible @babel/parser plugins at the time of writing.
    // Because we only parse them, not evaluate any code, it is safe to do so.
    // note that babel/parser 7+ does not support *, due to plugin incompatibilities
    plugins: ['asyncGenerators', 'bigInt', 'classProperties', 'classPrivateProperties', 'classPrivateMethods', ['decorators', {
      decoratorsBeforeExport: true
    }], // not decorators-legacy
    'doExpressions', 'dynamicImport', 'exportDefaultFrom', 'exportNamespaceFrom', 'flow', 'flowComments', 'functionBind', 'functionSent', 'importMeta', 'logicalAssignment', 'nullishCoalescingOperator', 'numericSeparator', 'objectRestSpread', 'optionalCatchBinding', 'optionalChaining', ['pipelineOperator', {
      proposal: 'minimal'
    }], 'throwExpressions']
  });
}

module.exports = exports.default;