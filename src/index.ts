import {
  parse,
  compileScript,
  compileTemplate,
  compileStyle,
} from "@vue/compiler-sfc";
import { randomUUID } from "crypto";

function vueJsPlugin() {
  return {
    name: "vue-js-plugin",
    async transform(code: string, id: string) {
      if (id.endsWith(".js") || id.endsWith(".vjs")) {
        // Look for the <vue>...</vue> tags
        const vueComponents = code.match(/<vue>([\s\S]*?)<\/vue>/gm);

        // Add custom import at the top
        let importCode = `import { defineComponent } from "vue";\n`;

        if (vueComponents) {
          for (const vueComponent of vueComponents) {
            const innerCode = vueComponent
              .replace(/<vue>/, "")
              .replace(/<\/vue>/, "");

            // Parse the Vue component code inside the <vue> tag
            const { content, imports } = parseComponent(innerCode);

            // Add the imports to the top of the file
            if (imports) {
              // check that the import is not already there
              for (const importStatement of imports) {
                if (!importCode.includes(importStatement)) {
                  importCode += importStatement + "\n";
                }
              }
            }

            const vueCode = `function() { ${content} }()`;

            // Replace the original <vue> tag with the generated Vue component definition
            code = code.replace(vueComponent, vueCode);
          }
        }
        code = importCode + code;
      }
      return {
        code,
        map: null,
      };
    },
  };
}

function parseComponent(code: string) {
  const id = randomUUID();
  const { descriptor } = parse(code);

  const { template } = descriptor;
  let content = "";

  try {
    const script = compileScript(descriptor, {
      id,
      inlineTemplate: true,
      templateOptions: {
        slotted: true,
      },
    });

    // remove the export default { ... } wrapper
    script.content = script.content
      .replace(/export default {/, "return defineComponent({")
      .replace(/}$/, "})");

    content = script.content;
  } catch (e) {
    const compiledTemplate = compileTemplate({
      source: template?.content ?? "",
      // TODO: use function name
      filename: `${id}.vue`,
      id,
    });

    // remove the render function wrapper
    compiledTemplate.code = compiledTemplate.code
      .replace(
        /export function render/,
        "return defineComponent({ setup(__props) { return function"
      )
      .replace(/}$/, "}}})");

    content = compiledTemplate.code;
  }

  // get all imports
  const importsRegex =
    /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
  const imports = content.match(importsRegex);
  if (imports) {
    content = content.replace(importsRegex, "");
  }

  return { content, imports };
}

export default vueJsPlugin;
