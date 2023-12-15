nFile="./tools/counter.txt"
read n <"$nFile"
printf -v m $(( 10#$n - 1 ))
echo "Rollback Tag: $m ..."

kubectl set image deployment.apps/sio-deployment sio-api=namnguyenhoai/test-sv-alpha:$m
