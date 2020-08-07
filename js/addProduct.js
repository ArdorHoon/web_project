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
        });
    }



function readInputFile(e){
    let sel_files = [];
    
    var files = e.target.files;
    var fileArr = Array.prototype.slice.call(files);
    var index = 0;
    
    fileArr.forEach(function(f){

    	if(!f.type.match("image/.*")){
        	alert("이미지 확장자만 업로드 가능합니다.");
            return;
        }

        console.log(f);
        if(files.length < 5){
            const imgFile = f;
        	sel_files.push(imgFile);
            var reader = new FileReader();
            reader.onload = function(e){
                let html = `<img src=${e.target.result} class="rounded" style ="width : 56px; height: 56px;" id=img_id_${index} data-file=${f.name} /></a>`;
                $('#image_container').append(html);
                index++;
            };
            reader.readAsDataURL(f);
        }
    });
    if(files.length > 5){
    	alert("최대 5장까지 업로드 할 수 있습니다.");
    }

    console.log(fileArr);
    console.log(sel_files);
}


$(".backProduct").click(function(){

    
    history.go(-1);


   

});

$(".regProduct").click(function(){

        const productKind = document.querySelector(".product-kind"); //product_kind.options[target.selectedIndex].value
        const productKindContent = productKind.options[productKind.selectedIndex].value;
        const productBrand = document.querySelector(".product-brand").value;
        const productName = document.querySelector(".product-name").value;  //product_name.value
        const originPrice = document.querySelector(".origin-price").value;
        const salesPrice = document.querySelector(".sales-price").value;
        const wholesalesPrice = document.querySelector(".wholesales-price").value;
        const productState = document.querySelector('input[name="product-state"]:checked').value;
        const productDescription = document.querySelector(".product-description").value;


        const productCateNum = document.getElementsByName("category").length;
        const productColorNum = document.getElementsByName("color").length;
        let productCate = "";
        let productColor = "";
        
        for (var i=0; i<productCateNum; i++) {
            if (document.getElementsByName("category")[i].checked == true) {

                productCate = productCate+document.getElementsByName("category")[i].value+",";
            }
        }

        for (var i=0; i<productColorNum; i++) {
            if (document.getElementsByName("color")[i].checked == true) {

                productColor = productColor+document.getElementsByName("color")[i].value+",";
            }
        }

        addFile(albumBucketName);

        
        
        $.post("http://13.209.181.48:3000/product/apply", { _state : productState, _type : productKindContent ,_name : productName, _brand : productBrand , _op : originPrice , _sp : salesPrice, 
        _bp : wholesalesPrice,  _thumb : "exam" , _summary : productDescription , _category : productCate , _color : productColor }, function(data){
            console.log(data);
    
            if(data.result === "complete"){
                
               location.href ="product.html";
                
            }
        });
        
        

    

});


function getAllColorData(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/color/list' , function(response){
            resolve(response);
        });
    });


}


function getAllCategoryData(){

    return new Promise(function(resolve, reject){

        $.get('http://13.209.181.48:3000/category/list' , function(response){
            resolve(response);
        });
    });

}

function init(){

    getAllCategoryData().then(function(dataset){

        console.log(dataset);
        $.each(dataset, function(index, item){

            $(".category").append(

                `<label><input type="checkbox" name ="category" value="${item._category}"> ${item._category}</label><br>`
            );
           
            
        });
   });

   getAllColorData().then(function(dataset){

    console.log(dataset);
    $.each(dataset, function(index, item){

        $(".colors").append(

            `<label><input type="checkbox" name="color" value="${item._color}"> ${item._color}</label><br>`
        );
       
        
    });
});

}

init();



