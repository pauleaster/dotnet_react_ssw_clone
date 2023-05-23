# C:\Python27\python.exe -m virtualenv -p C:\Python27\python.exe node_python
# node_python\Scripts\activate
Remove-Item -Path "node_modules" -Recurse -Force

npm install sass
npm install cross-env --save-dev
npm install sass-loader --save-dev --legacy-peer-deps
$env:NODE_OPTIONS = "--openssl-legacy-provider"



npm  run build:debug
