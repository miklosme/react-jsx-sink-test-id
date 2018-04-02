module.exports = ({ types: t }) => {
  const TESTID = 'data-test';
  const SINKER_SOURCE = 'babel-plugin-transform-react-jsx-sink-test-id/sinker';
  const sinker = '_sinker';

  const readTestidValue = attr => {
    switch (attr.value.type) {
      case 'StringLiteral':
        return t.stringLiteral(attr.value.value);
      case 'JSXExpressionContainer':
        return attr.value.expression;
    }
    throw path.buildCodeFrameError(
      'This JSX attribute value type is not supported',
    );
  };

  return {
    name: 'react-jsx-sink-test-id',
    visitor: {
      JSXOpeningElement(path) {
        if (path.node.__didSink) {
          return;
        }
        path.node.__didSink = true;

        const testIdAttributeIndex = path.node.attributes.findIndex(
          attr => t.isJSXIdentifier(attr.name, { name: TESTID }),
        );

        if (testIdAttributeIndex === -1) {
          return;
        }

        const testIdAttribute = path.node.attributes[testIdAttributeIndex];
        const testidValue = readTestidValue(testIdAttribute);

        // remove testid from jsx
        path.node.attributes.splice(testIdAttributeIndex, 1);
        const node = t.jSXOpeningElement(
          path.node.name,
          path.node.attributes,
          path.node.selfClosing,
        );
        node.__didSink = true;
        path.replaceWith(node);

        // wrap the jsx expression to the sinker function
        const wrapped = t.callExpression(t.identifier(sinker), [
          path.parentPath.node,
          testidValue,
        ]);
        path.parentPath.replaceWith(wrapped);

        // import the sinker function
        const program = path.findParent(t.isProgram);
        if (!program.__hasImportSinker) {
          program.node.body.unshift(
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(sinker))],
              t.stringLiteral(SINKER_SOURCE),
            ),
          );
          program.__hasImportSinker = true;
        }
      },
    },
  };
};
