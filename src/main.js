const core = require("@actions/core");
const fs = require("fs");

/**
 * Runs the GitHub action to output the release urls
 */
function run() {
  const file = fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8");

  if (!file) {
    core.setFailed("File Not Found");
    return;
  }

  const releaseInfo = JSON.parse(file);

  let urls = releaseInfo.release.assets.map(asset => asset.browser_download_url);
  urls = urls.join(",");

  core.setOutput("urls", urls);
}

exports.run = run;

run();
