const albumBucketName = 'andbox-thumbnail';
const bucketRegion = 'ap-northeast-2'; //true
const IdentityPoolId = 'ap-northeast-2:c1e6a0d3-64ba-4aa9-aff1-6d74d0444fdb';

//<!-- AWS 연결 -->
    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
        })
    });
//<!-- S3 연결 -->
    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {Bucket: albumBucketName}
    });
    
//<!-- 파일 추가 -->
    function addFile(albumName) {
        var files = document.getElementById('host_file').files;
        if (!files.length) {
            return alert('업로드할 파일을 선택해주세요.');
        }
        var file = files[0];
        var fileName = file.name;
        document.getElementById('file_name').value = fileName;
        // fileName = document.getElementById('host_id').value;
        var photoKey = fileName;
        s3.upload({
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
        }, function(err, data) {
            if (err) {
                return alert('파일 업로드 실패: ', err, data);
                console.log(err, data);
            }
            alert('파일 업로드 성공');
            viewAlbum(albumName);
        });
    }