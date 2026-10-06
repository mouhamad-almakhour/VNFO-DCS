/******************************************************************************************************************* */
/******************************************* VNF lifecycle ***************************************************************** */
require('dotenv').config()

const subject_token= 'gAAAAABjv-mSL9I2kEsEJjl-xbrEOIkdKEPaEk1IgS60kHPUMOUa19QIlAVvSlE8L9qrmMKSAytZmy762qfQbRr_8zUOufZ5c7oShgOY0BJ-v2QVDFJU3qTxEAOG8659gCGU-_SHYf5NEZweltfR75DbDX-5I0JVJKjII9LwdOxzo0MQufg0QWQ'


const vnfParametres =
      { 
        "vnf": {
            "tenant_id": "947990f3c04245a7afd59c6140dc155d",
            "vnfd_id": VNFDID,
            "vim_id": "398df74c-1aac-4c62-b58e-c192dad4f3b1",
            "name": vnfname,
            "description": "vnf is created with "+ vnfname   
        }
      }
async function VNF_CREATE(token,VNFDID,vnfname) {
    
  const resp = await fetch(`${process.env.openstack_url}/v1.0/vnfs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token' : token
        },
        body: JSON.stringify(vnfParametres)
    })
    
    return resp.json(); 
    }

    //VNF_CREATE('gAAAAABj5oR6cNDObuojE8YgM5GJwUH6Ty5QgHQ1DrIcfZPA2YfXOKHAhozsOSG0bnyF-drL_fxd1P9Gsj-b5GQnPphrf-4S-eXNZwgauaf1mEjbq4ICFlTIJ1BarsGGkb6xetLe5rJ2gxGgt_fLnPJ-sfQli54tWa7y3-H8mt9fyZyDCG2Vt4A',"bc81d46b-b6e6-4bf3-85ff-2208e2b33b77","vnf-testdeploy").then((res) =>console.log(res));
    
    async function VNF_UPDATE(token,vnfid) {
      const resp = await fetch(`${process.env.openstack_url}/v1.0/vnfs/${vnfid}`,
       {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token' : token
        }
    })
    return resp.json(); 
    }
    
    async function VNF_DELETE(token,vnfid) {
      const resp = await fetch(`${process.env.openstack_url}/v1.0/vnfs/${vnfid}`,
       {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token' : token
        }
    })
    return resp;
    
    }

    async function GET_VNFD_by_id(token, vnfid) {
      const resp = await fetch(`${process.env.openstack_url}/v1.0/vnfs/${vnfid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token' : token
        }
       
    })
    // return resp.json();
     return resp.json();  
    }
    
module.exports = {VNF_CREATE, VNF_DELETE, GET_VNFD_by_id};

