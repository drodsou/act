# needs node >14
printf "node version (needs v14+): "
node --version

RENDERER=preact
rm ./dist/act-$RENDERER.min.*
esbuild act.js --bundle --minify --format=esm --target=es2020 --outfile=dist/act-$RENDERER.min.js 
cd dist
gzip -k act-$RENDERER.min.js
brotli act-$RENDERER.min.js
cd ..

# -- you could test downloading compressed files with eg:
# http-server --gzip --brotli
