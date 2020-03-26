# Simple In Out - Desktop Releases Action
[![Build Status](https://travis-ci.org/simplymadeapps/simpleinout-desktop-releases.svg?branch=master)](https://travis-ci.org/simplymadeapps/simpleinout-desktop-releases)
[![Maintainability](https://api.codeclimate.com/v1/badges/359c00496ee730f240d0/maintainability)](https://codeclimate.com/github/simplymadeapps/simpleinout-desktop-releases/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/359c00496ee730f240d0/test_coverage)](https://codeclimate.com/github/simplymadeapps/simpleinout-desktop-releases/test_coverage)

[Simple In/Out](https://www.simpleinout.com)

GitHub Action Setup
-------------------


The workflow actions script relies on a few API keys that we should store in GitHub secrets. These allow access to AWS.

These are the secrets that need to be setup for this action to work:

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_REGION
* AWS_S3_BUCKET

Github secrets will store these, and hide them in log files.
