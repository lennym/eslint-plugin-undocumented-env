const path = require('path');
const fs = require('fs');

const findup = require('findup');

module.exports = {
  meta: {
    schema: [
      {
        type: 'object',
        properties: {
          readme: {
            type: 'string'
          }
        },
        additionalProperties: false
      }
    ]
  },
  create: (context) => {
    const options = context.options[0] || {};
    const docFile = options.readme || 'README.md';
    const dir = path.dirname(context.getFilename());
    const readme = fs.readFileSync(path.join(findup.sync(dir, docFile), docFile));

    return {
      MemberExpression: node => {
        if (node.object.property && node.object.property.name === 'env') {
          if (node.object.object && node.object.object.name === 'process') {
            const name = node.property.name;
            if (!readme.includes(name)) {
              context.report({
                node,
                message: `Environment variable "${name}" is not described in ${docFile}`
              });
            }
          }
        }
      }
    };
  }
};
