require('dotenv').config()
/******************************************************************************************************************* */
/******************************************* Authentication VIA TOKEN ***************************************************************** */

 async function token_POST() {

const url = `${process.env.openstack_url}/identity/v3/auth/tokens?nocatalog`;
const data1 = { "auth": { "identity": { "methods": ["password"],"password": {"user": {"domain": {"name": "Default"},"name": "admin", "password": "devstack"} } }, "scope": { "project": { "domain": { "name": "Default" }, "name":  "admin" } } }};

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
     
    },
    body: JSON.stringify(data1)  
  })
  const json = await resp.json();
  const token =resp.headers.get('x-subject-token')

  return token;
}


module.exports = {token_POST};
//token_POST().then((res) => console.log(res));




