const os = require('os');
const path = require('path');
const sh = require('shelljs');
const chalk = require('chalk');

sh.config.verbose = true;

const TMPDIR = os.tmpdir();
const DEPLOY_BRANCH = 'deploy-prod';

const buildTar = path.resolve(TMPDIR, 'string-tension-calculator.tar');

console.log(chalk.cyan(buildTar));

sh.exec('yarn build');
sh.exec(`tar cvf ${buildTar} ./packages/website/build`);
sh.exec('rm -rf ./packages/website/build');

sh.exec('git checkout deploy-prod');

sh.exec('rm -rf ./packages/website/build');
sh.mv(buildTar, './build.tar');
sh.exec('tar xvf ./build.tar');
sh.rm('./build.tar');

sh.exec('git config --global user.email "you@example.com"');
sh.exec('git config --global user.name "deploy_bot"');

sh.exec('git status');
sh.exec('git add ./build/');
sh.exec(`git commit -m "build ${new Date().toISOString()} [ci skip]"`);
sh.exec(`git push -f origin ${DEPLOY_BRANCH}`);
