/******************************************************************************************************************* */
/******************************************* EVENT in OPENSTACK ***************************************************************** */
require('dotenv').config()
async function GET_openstack_EVNETS(token) {
//  const subject_token= 'gAAAAABjyom3AC-_sC097cBF0DHS9xNhYLCqo_T7ovr8myBmz-CpRe87BAiPZMq_nQBERspR2LEI2E8oYoqZfhHxCqbKBPkK655qC6YRBU9RTutuuGzBLiwgAJKECHlD6odPj1yH9kE-hPFZpc2mYJJqLiU4HDsohBtcz4FPnpZbtNZ3l4lY-nY'

    const uri= `${process.env.openstack_url}/v1.0/events `;
    const resp = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token' : token
      }
  })
  
  return resp.json(); 

  }
  
  console.log(GET_openstack_EVNETS())
//GET_openstack_EVNETS(subject_token).then((res) =>console.log(res));

module.exports = {GET_openstack_EVNETS};