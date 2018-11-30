for file in $(ls ../swagger)
do
   if [ -f ../swagger/$file ]
   name="$(echo ${file%.*} | awk '{print tolower(substr($0,0,1))substr($0,2,length($0))}' )"
   then
    java -jar ./openapi-generator-cli.jar generate -i ../swagger/$file -l typescript-fetch -t ./templates/typescript-fetch  -o ../src/client/api/$name
   fi
done
