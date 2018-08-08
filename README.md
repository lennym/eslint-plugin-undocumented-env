# eslint-plugin-undocumented-env

eslint plugin to detect use of undocumented environment variables

This looks for usage of `process.env.VARIABLE_NAME` in your code, and checks that the environment variable is mentioned in your README file.

## Usage

Add `undocumented-env` to the plugins section of your [ESLint configuration file](http://eslint.org/docs/user-guide/configuring#configuration-file-formats). You can omit the `eslint-plugin-` prefix:

```yaml
plugins:
  - undocumented-env
```

Then configure the plugin under the rules section.

```yaml
rules:
  - undocumented-env/no-undocumented: error
```

## Options

By default `undocumented-env` will look for references to environment variables in the first `README.md` file it finds while traversing up the file tree.

To use a filename for documentation other than `README.md` then specify it as a `readme` option in your eslint config:

```yaml
rules:
  - undocumented-env/no-undocumented:
    - error
    - readme: configuration.md
```

## Caveats

This plugin will only detect variables accessed directly via `process.env.VARIABLE`. It will not detect any dynamic or programmatic references to `process.env`.

This plugin won't detect _bad_ documentation, only completely absent documentation. You should still document your code.
