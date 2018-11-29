for file in $(ls ../swagger)
do
   if [ -f ../swagger/$file ]
   name="$(echo ${file%.*} | awk '{print tolower(substr($0,0,1))substr($0,2,length($0))}' )"
   then
    java -jar ./swagger-codegen-cli.jar generate -i ../swagger/$file -l  typescript-fetch -t ./templates/typescript-fetch  -o ../src/api/
#    java -jar ./swagger-codegen-cli.jar generate -i ./doc/$file -l objc -o ./temp/objcTemp/$name
#    java -jar ./swagger-codegen-cli.jar generate -i ./doc/$file -l java -o ./temp/android/$name
#    java -jar ./swagger-codegen-cli.jar generate -i ./doc/$file -l JavaSpring-Lszd -o ./temp/JavaSpring/$name
#    node jsonSchema.js $file ./doc/$file ./temp/schema
   fi
done
