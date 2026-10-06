
/******************************************************************************************************************* */
require('dotenv').config()
const { modes } = require("tar")

/******************************************* VNFD lifecycle ***************************************************************** */
//const subject_token= 'gAAAAABjzpghoksAPrVGjadf-T2Qm9QWFHxA3hS_gqO6d7gwFXFE_9TmabxfNE1vq2ZPdY8t0cthFfU8ao2OG_4z69ht92npD-GgY3Vr-2nLQ7W5AKMuJhoa9XbdnamhN4mkLaV-KBtTDC3DQkONE_fXknJ2FzVgIvfkp19fg26pshYZeronz3E'
//const Memory= "512 MB"
//const disk= "1 GB"
//const vnfdParametres ={ "vnfd": { "tenant_id": "462042c618404c15b39ae2ed1cc1eec7", "name": "vnfd-test", "description": "Sample", "service_types": [ { "service_type": "vnfd" } ], "attributes": { "vnfd": { "tosca_definitions_version": "tosca_simple_profile_for_nfv_1_0_0", "description": "Demo example", "metadata": { "template_name": "sample-tosca-vnfd" }, "topology_template": { "node_templates": { "VDU1": { "type": "tosca.nodes.nfv.VDU.Tacker", "capabilities": { "nfv_compute": { "properties": { "num_cpus": 1, "mem_size": "512 MB", "disk_size": "1 GB" } } }, "properties": { "image": "cirros-0.5.2-x86_64-disk" } }, "CP1": { "type": "tosca.nodes.nfv.CP.Tacker", "properties": { "order": 0, "management": true, "anti_spoofing_protection": false }, "requirements": [ { "virtualLink": { "node": "VL1" } }, { "virtualBinding": { "node": "VDU1" } } ] }, "VL1": { "type": "tosca.nodes.nfv.VL", "properties": { "vendor": "Tacker", "network_name": "mynetwork" } } } } } } }}

//const x_subject_token= 'gAAAAABjzpghoksAPrVGjadf-T2Qm9QWFHxA3hS_gqO6d7gwFXFE_9TmabxfNE1vq2ZPdY8t0cthFfU8ao2OG_4z69ht92npD-GgY3Vr-2nLQ7W5AKMuJhoa9XbdnamhN4mkLaV-KBtTDC3DQkONE_fXknJ2FzVgIvfkp19fg26pshYZeronz3E'
async function VNFD_Create(VNFD_Parametres,token) {
  const resp = await fetch(`${process.env.openstack_url}/v1.0/vnfds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token' : token
    },
    body: JSON.stringify(VNFD_Parametres)
})
return resp.json(); 
}


//VNFD_Create(vnfdParametres,'gAAAAABj5oR6cNDObuojE8YgM5GJwUH6Ty5QgHQ1DrIcfZPA2YfXOKHAhozsOSG0bnyF-drL_fxd1P9Gsj-b5GQnPphrf-4S-eXNZwgauaf1mEjbq4ICFlTIJ1BarsGGkb6xetLe5rJ2gxGgt_fLnPJ-sfQli54tWa7y3-H8mt9fyZyDCG2Vt4A').then((res) =>console.log(res));

async function VNFD_Update(VNFD_id,token) {

  


  //const vnfdParametres ={ "vnfd": { "name": "vnfd-sample-0.3", "description": "Sample",   } }  
  const vnfdParametres ={ "vnfd": {  "name": "vnfd-sample-0.4", "description": "Sample", "attributes": { "vnfd": {  "topology_template": { "node_templates": { "VDU1": { "type": "tosca.nodes.nfv.VDU.Tacker", "capabilities": { "nfv_compute": { "properties": { "num_cpus": 2, "mem_size": 5, "disk_size": 5 } } }, "properties": { "image": "cirros-0.5.2-x86_64-disk" } }, "CP1": { "type": "tosca.nodes.nfv.CP.Tacker", "properties": { "order": 0, "management": true, "anti_spoofing_protection": false }, "requirements": [ { "virtualLink": { "node": "VL1" } }, { "virtualBinding": { "node": "VDU1" } } ] }, "VL1": { "type": "tosca.nodes.nfv.VL", "properties": { "vendor": "Tacker", "network_name": "net_mgmt" } } } } } } }}

  const uri= 'http://172.16.252.23:9890/v1.0/vnfds/'+VNFD_id
  const resp = await fetch(uri, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token' : token
    },
    body: JSON.stringify(vnfdParametres)
})
return resp.json(); 
}

async function VNFD_DELETE(token,VNFD_id) {
  const uri= 'http://172.16.252.23:9890/v1.0/vnfds/'+VNFD_id
  const resp = await fetch(uri, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token' : token
    }
})

return resp;
}

async function GET_VNFDS(token) {
  const resp = await fetch('http://172.16.252.23:9890/v1.0/vnfds', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token' : token
    }
})
return resp.json();
}


//GET_VNFDS(subject_token).then((res) =>console.log(res));
//var id= '415a42a7-83ae-44c9-9e40-60b483aeb0b8'
//VNFD_Update(id,subject_token).then((res) =>console.log(res))


module.exports = {VNFD_Create, VNFD_DELETE, GET_VNFDS};