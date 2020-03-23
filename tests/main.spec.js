const core = require("@actions/core");
const fs = require("fs");
const { run } = require("../src/main.js");

jest.mock("@actions/core");
jest.mock("fs");

let originalGithubEnv;
beforeAll(() => {
  jest.spyOn(fs, "readFileSync");
  jest.spyOn(core, "setOutput");
  jest.spyOn(core, "setFailed");
  originalGithubEnv = process.env.GITHUB_EVENT_PATH;
  process.env.GITHUB_EVENT_PATH = "mock path";
});

beforeEach(() => {
  fs.readFileSync.mockReset();
  core.setOutput.mockReset();
  core.setFailed.mockReset();
});

afterAll(() => {
  fs.readFileSync.mockRestore();
  core.setOutput.mockRestore();
  core.setFailed.mockRestore();
  process.env.GITHUB_EVENT_PATH = originalGithubEnv;
});

describe("main#run", () => {
  let singleDownloadsUrlFileContents = '{"release":{"assets":[{"browser_download_url": "mock url 1"}]}}';
  let multipleDownloadsUrlFileContents =
    '{"release":{"assets":[{"browser_download_url": "mock url 1"},{"browser_download_url": "mock url 2"}]}}';

  it("calls setOutput for url for a single file", () => {
    fs.readFileSync.mockReturnValue(singleDownloadsUrlFileContents);
    run();

    expect(fs.readFileSync.mock.calls).toEqual([["mock path", "utf8"]]);
    expect(core.setOutput.mock.calls).toEqual([["urls", "mock url 1"]]);
  });

  it("calls setOutput for url for multiple files", () => {
    fs.readFileSync.mockReturnValue(multipleDownloadsUrlFileContents);
    run();

    expect(fs.readFileSync.mock.calls).toEqual([["mock path", "utf8"]]);
    expect(core.setOutput.mock.calls).toEqual([["urls", "mock url 1,mock url 2"]]);
  });

  it("calls `setFailed` if it cannot read the file", () => {
    fs.readFileSync.mockReturnValue(undefined);
    run();

    expect(core.setOutput.mock.calls.length).toEqual(0);
    expect(core.setFailed.mock.calls).toEqual([["File Not Found"]]);
  });
});
