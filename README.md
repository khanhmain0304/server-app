# sio-server
SIO Server


# jwt decode

user_jwt
{
    user_id: '61baab96b15e159e64841400',
    email: 'zgezt91@gmail.com',
    iat: 1639640243,
    exp: 1639726643
}

# build image

sh build_image.sh
sh push_image.sh

kubectl rollout restart deployment/deployment-name
kubectl scale deployment.apps/sio-deployment --replicas=3

# npm

npm config set registry "https://my-custom-registry.registry.nodesource.io/"
npm config set registry "https://registry.npmjs.com/"


# ab segment

// ABTEST
let ab_test_segment = user.game_segment ? user.game_segment : "default";
let game_version = user.game_version ? user.game_version : "default";
let ab_config = await getABSegmentFunc(ab_test_segment, game_version);


// ABTEST override
if (ab_config && ab_config.chapter_9_min) {
    
}


# exec
$ kubectl exec -it pod/mongo-78b49c96cd-n585s -- sh

df -h

ls -sh

du -sh