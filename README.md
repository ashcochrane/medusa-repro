REPRODUCE ISSUE:

yarn

yarn build

cd .medusa/server

yarn install --production

cp ../../.env .

yarn start


NOTE: Just running yarn run dev works fine, something seems to be happening on compilation..

