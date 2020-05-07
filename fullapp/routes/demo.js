const dotenv = require("dotenv");
const result = dotenv.config();
const Layout = require("@podium/layout");
const utils = require("@podium/utils");
const merge = require('merge-arrays');

module.exports = function (app) {
  const layout = new Layout({
    name: "myLayout", // required
    pathname: "/demo", // required
  });

  layout.view(
    (incoming, body, head) => `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      ${incoming.css.map(utils.buildLinkElement).join("\n")}
      <link href="/css/demo.css" type="text/css" rel="stylesheet">
      <title>${incoming.view.title}</title>
    </head>
    <body>
      ${body}
      ${incoming.js.map(utils.buildScriptElement).join("\n")}
    </body>
  </html>`
  );

  const htmlpodlet = layout.client.register({
    name: "htmlPodlet", // required
    uri: process.env.htmlpod + "/manifest.json", // required
  });

  const htmlbuspodlet = layout.client.register({
    name: "htmlBusPodlet", // required
    uri: process.env.htmlbuspod + "/manifest.json", // required
  });

  const reactpodlet = layout.client.register({
    name: "reactPodlet", // required
    uri: process.env.reactpod + "/manifest.json", // required
  });

  const reactnavpodlet = layout.client.register({
    name: "reactNavPodlet", // required
    uri: process.env.reactnavpod + "/manifest.json", // required
  });

  const sveltepodlet = layout.client.register({
    name: "sveltePodlet", // required
    uri: process.env.sveltepod + "/manifest.json", // required
  });

  const vuepodlet = layout.client.register({
    name: "vuePodlet", // required
    uri: process.env.vuepod + "/manifest.json", // required
  });

  const angularpodlet = layout.client.register({
    name: "angularPodlet",
    uri: process.env.angularpod + "/manifest.json",
  });

  app.use(layout.middleware());

  app.get("/demo", async (req, res) => {
    const incoming = res.locals.podium;
    const content = await Promise.all([
      htmlpodlet.fetch(incoming),
      reactpodlet.fetch(incoming),
      reactnavpodlet.fetch(incoming),
      sveltepodlet.fetch(incoming),
      htmlbuspodlet.fetch(incoming),
      vuepodlet.fetch(incoming),
      angularpodlet.fetch(incoming),
    ]);

    content.forEach(element => {
      incoming.css = incoming.css.concat(element.css);
      incoming.js = incoming.js.concat(element.js);
    })
    incoming.view.title = "Demo Page";

    res.podiumSend(`<div class="demo-header">
      DEMO : HTML + React + Svelte + Vue + Angular
    </div>
    <div class="demo-navigation">
      ${content[2]}
    </div>
    <div class="demo-container">
      <div class="demo-flex">
        <div class="demo-leftpanel">
          <div class="demo-left-svelte">
            <img src="/images/svelte.png"/><br/>
            ${content[3]}
          </div>
          <div class="demo-left-vue">
            ${content[5]}
          </div>
        </div>
        <div class="demo-content">
          ${content[1]}
          <div class="demo-left-html">
            <img src="/images/html.png"/><br/>
            ${content[4]}
          </div>
          <div class="angdiv">
            ${content[6]}
          </div>
        </div>
      </div>
    </div>
    <div class="demo-footer">
      ${content[0]}
    </div>
    `);
  });

  app.get("/demo/:name", async (req, res) => {
    const incoming = res.locals.podium;
    const content = await Promise.all([
      htmlpodlet.fetch(incoming),
      reactpodlet.fetch(incoming, { pathname: '/'+req.params.name }),
      reactnavpodlet.fetch(incoming),
      sveltepodlet.fetch(incoming),
      htmlbuspodlet.fetch(incoming),
      vuepodlet.fetch(incoming),
      angularpodlet.fetch(incoming),
    ]);

    content.forEach(element => {
      incoming.css = incoming.css.concat(element.css);
      incoming.js = incoming.js.concat(element.js);
    })
    incoming.view.title = "Demo Page";

    res.podiumSend(`<div class="demo-header">
      DEMO : HTML + React + Svelte + Vue + Angular
    </div>
    <div class="demo-navigation">
      ${content[2]}
    </div>
    <div class="demo-container">
      <div class="demo-flex">
        <div class="demo-leftpanel">
          <div class="demo-left-svelte">
            <img src="/images/svelte.png"/><br/>
            ${content[3]}
          </div>
          <div class="demo-left-vue">
            ${content[5]}
          </div>
        </div>
        <div class="demo-content">
          <div style="background-color: #ccc; padding: 15px;">
          ${content[1]}
          </div>
          <div class="demo-left-html">
            <img src="/images/html.png"/><br/>
            ${content[4]}
          </div>
          <div class="angdiv">
            ${content[6]}
          </div>
        </div>
      </div>
    </div>
    <div class="demo-footer">
      ${content[0]}
    </div>
    `);
  });
};