# sh ./tools/build_image.sh && sh ./tools/push_image.sh && sh ./tools/rollout.sh


kubectl config use-context arn:aws:eks:us-west-2:147116486000:cluster/kub-dep-demo
kubectl config get-contexts


nFile="./tools/counter_alpha.txt"
read n <"$nFile"
printf -v m $((10#$n + 1))
echo "Tag: $m ..."
echo $m >"$nFile"


docker build -t namnguyenhoai/test-sv-alpha:latest -t namnguyenhoai/test-sv-alpha:$m .
docker push namnguyenhoai/test-sv-alpha:$m
kubectl set image deployment.apps/sio-deployment sio-api=namnguyenhoai/test-sv-alpha:$m

echo "Tag: $m ..."
echo "Done!!!"
# kubectl rollout restart deployment.apps/sio-deployment
# docker build -t namnguyenhoai/test-sv-alpha:latest .
# docker push namnguyenhoai/test-sv-alpha:latest