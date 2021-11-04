import http from 'k6/http'; 
import { check } from 'k6';

export let options = {
  stages: [
    { target: 2000 , duration: '30s' }

 ]}
 const f  = JSON.parse(open("/home/hamza/Desktop/Loadtestjmteronk8s/helmk6/dashboard.json"));

export default ()=>{
   const  res = http.post('http://192.168.99.122:31006/api/dashboards/db',JSON.stringify(f),
    { headers: {  'Accept': 'application/json',
    'Authorization': 'Bearer eyJrIjoiM2xMeW5QcjczbzRQZzRzNzIzTXpraTZUN3FYTU1GelYiLCJuIjoia2V5LXRva2VuIiwiaWQiOjF9',
    
    'Content-Type': 'application/json' 
  }});
	check(res, {
    'is status 200': (r) => r.status === 200   ,
    'error': (r) => r.error,
    

  });
} 