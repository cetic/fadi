import http, { FileData } from 'k6/http'; 
import { check } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';



let binFile = open('/home/hamza/Desktop/Loadtestjmteronk8s/helmk6/tmpl.xml','b');
let binFile1 = open('/home/hamza/Desktop/Loadtestjmteronk8s/helmk6/temp.xml','b');

//console.log(binFile)
export let options = {
  stages: [
  { target: 1000, duration: '30s' }

 ]}
 
 
export default ()=>{
 
  /*const fd = new FormData();
  //fd.append('template', http.file(binFile, 'tmpl.xml', 'application/xml'));
  fd.append('template', http.file(binFile1, 'temp.xml', 'application/xml'));

 var  res = http.post('http://192.168.99.122:31883/nifi-api/process-groups/9556dc44-bfaf-4a9b-bfe2-ba84060239e7/templates/upload?template=',fd.body(),{ headers: {  
  
  'Content-Type': 'multipart/form-data; boundary=' + fd.boundary
}});
  console.log(res.body);
	check(res, {
    'is status 200': (r) => r.status === 200 ,

  });*/
  let data= JSON.stringify({"id":"0b018355-ab9d-4bda-a30a-a74ab851d4c1","state":"RUNNING"});
 let responses = http.put('http://192.168.99.122:31713/nifi-api/flow/process-groups/0b018355-ab9d-4bda-a30a-a74ab851d4c1',data,{headers: {
  'Content-Type': 'application/json'
 }});
  

    console.log(responses.error_code);
 //   ['del', 'http://192.168.99.122:31883/nifi-api/templates/',responses.body().id ]])
  check(responses, {
    'main page status was 200': (res) => res.status === 200,
  })

} 
