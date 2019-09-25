for file in $(ls ./doc)
do
   if [ -f ./doc/$file ]
   name="$(echo ${file%.*} | awk '{print tolower(substr($0,0,1))substr($0,2,length($0))}' )"
   then
#    export TS_POST_PROCESS_FILE="../node_modules/.bin/prettier --write"
    java -jar ./swagger-codegen/openapi-generator-cli.jar generate -i ./doc/$file -g typescript-fetch -t ./swagger-codegen/templates/typescript-fetch  -o ./src/client/api/$name --enable-post-process-file
   fi
done
