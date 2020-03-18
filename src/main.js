const core = require("@actions/core");
const fs = require("fs");

function run() {
  const releaseInfo = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));

  let urls = releaseInfo.release.assets.map(asset => asset.browser_download_url);
  urls = urls.join(",");

  core.setOutput("urls", urls);
}

exports.run = run;

run();
