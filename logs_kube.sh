# kubectl logs -f --all-containers=true deployment.apps/sio-deployment --since 5m

kubectl logs -f -l app=sio --all-containers --since 5m
