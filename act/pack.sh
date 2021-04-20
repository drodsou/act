rm ./act.min.*
esbuild act.js --bundle --minify --format=esm --target=es2020 --outfile=act.min.js 
gzip -k act.min.js
brotli act.min.js

# http-server --gzip --brotli
