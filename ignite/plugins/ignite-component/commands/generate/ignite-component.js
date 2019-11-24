module.exports = {
  description: "Generates a component, supporting files",
  run: async function(toolbox) {
    // grab some features
    const { parameters, strings, print, ignite, patching } = toolbox;
    const { pascalCase, isBlank } = strings;

    // validation
    if (isBlank(parameters.first)) {
      print.info("A name is required.");
      print.info(`ignite generate component <name>\n`);
      return;
    }

    const name = parameters.first;
    const pascalName = pascalCase(name);

    const props = { name, pascalName };
    const jobs = [
      {
        template: "component.tsx.ejs",
        target: `app/components/${name}/${name}.tsx`
      },
      {
        template: "rollup-index.ts.ejs",
        target: `app/components/${name}/index.ts`
      }
    ];

    await ignite.copyBatch(toolbox, jobs, props);
  }
};
